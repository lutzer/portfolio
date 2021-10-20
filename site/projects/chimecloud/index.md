---
title: Chimecloud
tags: project
thumbnail: thumb.jpg
color: 4
date: 2013-01-01
---
*The Chimecloud is an evocative and responsive sound and visual installation aiming to motivate users to actively take part in the creation of soundscapes using their body and movements in interaction with the space surrounding them. Transforming nature’s principles, where the wind is a key element creating natural soundscapes, the Chimecloud make people’s presence and movement audible.*

<span class="more"></span>

{% image, "chimecloud.jpg", "Installation", null, "image" %}

Initiated during a project-course at Chalmers University and conducted in collaboration with the municipality of Lundby this project aimed to explore new interactive ideas and solutions to equip and constitute a ”Kulturhus” being developed for the area of Backaplan, Gothenburg. The aim was to incorporate the actual space, the people affected and the idea of a common place - be it virtual or physical - into the considerations.

Focusing on the Kulturhus as a common place, where everybody is welcome and everybodies' contribution is appreciated, our initial thoughts aimed to make the presence of people matter. How can the physical space be enriched to become a people-shaped place? Not the actual manifestation of the ''Kulturhus'' in form of a building is it what constitutes a place where culture comes alive, it is the impact and the lingering influence of people.

<div class="iframe-with-asp" style="padding-bottom: 56%;">
  <iframe src="http://player.vimeo.com/video/53239679?byline=0&amp;color=ff9933" width="600" height="338" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
</div>

The Chimecloud is an interactive multimodal installation, which borrows the idea of a classical windchime. In a windchime, the wind triggers the movement of the tubes, creating different sounds, depending on the length, thickness and material of the tubes. The Chimecloud instead is triggered by the presence and movement of people.

The installation consists of clusters of differently tuned tubes hanging from the ceiling above the vistitors' heads. The different lengths and diameters of the tubes create a cloud-like shape. Each of these clusters is tuned to a certain note, and a person passing under it, will only trigger the tubes above its head.

As a person walks slowly beneath the installation, the soundscape gets created by single notes, if he or she walks faster, the sound will resemble to chords. Every movement will create an instant visual and acoustic feedback by the moving tubes. Visitors can collaborate creating soundscapes together, as the installation is able to track the movement of many people simultaneously.

<div class="gallery">
  {% image, "1.jpg", "Tracking Software", null, "image" %}
  {% image, "2.jpg", "Chimes", null, "image" %}
  {% image, "4.jpg", "Interacting with the chimecloud", null, "image" %}
  {% image, "servos.jpg", "Servos controling the striker", null, "image" %}
</div>

To sense the presence of people, a Microsoft Kinect is attached to the ceiling next to the Installation. It allows us to get the depth information for every image coordinate in the camera image. This 3D imagemap of the area beneath the Chimecloud gets projected on a 2D grayscale image, on which we are using a blob-detection algorithm. The tracked blobs then get projected on a 6x6 grid.

Thirtysix servo motors move the wooden ”strikers”, which in return hit the tubes. By adjusting the speed of the servo movement, it is possible to create sounds in differing intensities and tonal characteristics. We used 36 servos to trigger the same amount of clusters (Figure 3), each one consisting of 6 tubes (216 tubes in total). An Arduino connects these 36 servos to a computer on which the tracking software is run. They communicate with each other over serial commands. The tubes are tuned in the pentatonic G-major scale, using 4 different octaves (G4 till G8).

{% image, "firemans.jpg", "Minor problems during construction", null, "image" %}
		