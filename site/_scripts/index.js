const { fromEvent } = require('rxjs/observable/fromEvent')
const { merge } = require('rxjs/observable/merge')
const { of : rxOf } = require('rxjs/observable/of')
const { throttleTime } = require('rxjs/operators/throttleTime')
const { debounceTime } = require('rxjs/operators/debounceTime')
const { takeUntil } = require('rxjs/operators/takeUntil')
const { switchMap } = require('rxjs/operators/switchMap')
const { mapTo } = require('rxjs/operators/mapTo')

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

// function logTime(...args) {
//   this.lastCalled = this.lastCalled || Date.now()
//   console.log(Date.now() - this.lastCalled, ...args)
//   this.lastCalled = Date.now()
// }

class SnapScrollContainer extends EventTarget {

  constructor({ containerId, itemClass, scrollTimeout = 250 }) {
    super()

    this.container = document.getElementById(containerId)
    this.containerItems = Array.from(document.getElementsByClassName(itemClass))
    this.itemBounds = []

    this.currentItem = null

    // recalculate bounds
    window.addEventListener('load', () => {
      this._computeScrollBounds()
      this.snap()

      // setup pointer events
      const $pointerdown = merge(fromEvent(window, 'touchstart'), fromEvent(window, 'pointerdown')).pipe(throttleTime(10), mapTo("down"))
      const $pointerup = merge(fromEvent(window, 'touchend'), fromEvent(window, 'pointerup')).pipe(throttleTime(10), mapTo("up"))
      const $scrollChange = fromEvent(this.container, 'scroll').pipe(mapTo("scroll"))

      // listen to scroll events, unsubscribe on pointerdown
      merge(rxOf("start"), $pointerup)
        .pipe(
          switchMap( (e) => merge(rxOf(e), $scrollChange).pipe(takeUntil($pointerdown))),
          debounceTime(scrollTimeout),
          throttleTime(400)
        )
        .subscribe(() => {
          this.snap()
        })

    })
    window.addEventListener('resize', debounce(() => {
      this._computeScrollBounds()
      this.snap()
    }))
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
        && this.container.scrollTop < bound.scrollUpper) {
        return bound.item
      }
    }
    return this.container.scrollTop < 0 ? this.containerItems[0] : this.containerItems[this.containerItems.length-1]
  }

  snap() {
    this.currentItem = this.calculateClosestItem()

    this.dispatchEvent(new SnapEvent('snapped', this.currentItem))
    this.container.scrollTo({
      top: this.currentItem.offsetTop,
      behavior: 'smooth'
    });
  }
}

module.exports = { debounce, throttle, SnapScrollContainer, scrollToTop }
