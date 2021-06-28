// const rxjs = require('rxjs')

const scrollToTop = function(e) {
  window.scrollTo({ behavior: 'smooth', top: 0 })
  e.preventDefault()
}

const debounce = function(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

const throttle = function(func, wait = 100) {
  let timeout = null;
  return function(...args) {
    if (timeout === null) {
      timeout = setTimeout(() => {
        func.apply(this, args);
        timeout = null;
      }, wait); 
    }
  };
}

class SnapEvent extends Event {
  constructor(name, item) {
    super(name)
    this.item = item
  }
}

class SnapScrollContainer extends EventTarget {

  constructor({ containerId, itemClass }) {
    super()

    this.container = document.getElementById(containerId)
    this.containerItems = Array.from(document.getElementsByClassName(itemClass))
    this.itemBounds = []

    this.currentItem = null

    this.pointerdown = false
    this.needSnapping = false

    // recalculate bounds
    window.addEventListener('load', () => {
      this._computeScrollBounds()
      this.needSnapping = true
      this.snap(true)
    })
    window.addEventListener('resize', debounce(() => {
      this._computeScrollBounds()
      this.needSnapping = true
      this.snap(false)
    }))

    // listen to pointer events
    window.addEventListener("pointerdown", () => {
      this.pointerdown = true
    })
    window.addEventListener("pointerup", () => {
      this.pointerdown = false
      this.snap()
    })
    window.addEventListener("touchend", () => {
      this.pointerdown = false
    })

    // react to scroll event
    this.container.addEventListener('scroll', debounce(() => {
      this.needSnapping = true
      if (!this.pointerdown)
        this.snap()
    },100))
  } 

  _computeScrollBounds() {
    // compute scroll positions of elements
    this.itemBounds = this.containerItems.reduce((acc, item) => {
      const newBound = { 
        scrollLower: acc.maxBound,
        scrollUpper: item.offsetTop + item.offsetHeight/2,
        position: item.offsetTop,
        item: item
      }
      acc.bounds.push(newBound)
      acc.maxBound = newBound.scrollUpper
      return acc
    },{ maxBound: 0, bounds: [] }).bounds
  }

  calculateClosestItem() {
    for (const bound of this.itemBounds) {
      if (this.container.scrollTop >= bound.scrollLower 
        && this.container.scrollTop <= bound.scrollUpper) {
        return bound.item
      }
    }
    return this.container.scrollTop < 0 ? this.containerItems[0] : this.containerItems[this.containerItems.length-1]
  }

  snap(update = true) {
    if (!this.needSnapping)
      return

    if (update || !this.currentItem) {
      this.currentItem = this.calculateClosestItem()
    }

    this.dispatchEvent(new SnapEvent('snapped', this.currentItem))
    this.container.scrollTo({
      top: this.currentItem.offsetTop,
      behavior: 'smooth'
    });

    this.needSnapping = false
  }
}

module.exports = { debounce, throttle, SnapScrollContainer, scrollToTop }
