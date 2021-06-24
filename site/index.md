---
layout: index-layout.njk
title: Lutz Reiter - hej
date: Last Modified
---

# Hej, my name is Lutz Reiter

I am a Berlin based creative technologist, coder and creator of curious things. I like to create both, the useful and the seemingly useless things. In my works I deal with the intersection of the digital and the physical. I enjoy building and designing interactive art, visualisations, non-conventional interfaces, tools and sounds. Check out my [recent projects](/projects) to see more of my work. 

<div class="centered-iframe" onClick="onFrameClicked()">
  <iframe id="sketch" src="https://lutzer.github.io/codevember19/day07-shape-fullscreen.html"></iframe>
</div>

If you want to learn more [about me](/about), listen to my music project [Ape Finger of the Stars](https://soundcloud.com/apefinger) or follow me on [Instagram](https://www.instagram.com/lutzeputze/). Many of my code related projects and open source contributions can be found on [GitHub](https://github.com/lutzer).



<!-- <span class="date">{% formatDate page.date %}</span> -->

<script>
  const onFrameClicked = function() {
    document.location.reload()
  }
  const onResize = function() {
    const sketch = document.getElementById('sketch')
    sketch.style.height = sketch.clientWidth + "px"
  }
  window.addEventListener("resize", onResize)
  onResize()
</script>

