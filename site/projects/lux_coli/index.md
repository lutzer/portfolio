---
title: Lux Coli
tags: project
thumbnail: render.jpg
footer: Created in collaboration with Nuno de la Serna
date: 2019-06-22
---

Lux Coli is an interactive kinetic light installation, which reacts on the presence of people around it. It is composed of 16 individual limbs, each represented by a 1 meter long light bar that sits on one side on a rotatable joint. Together they form a moving, breathing organism that senses its environment through proximity sensors. Depending on its surrounding and the people within it, the installation shows different emotional responses.

<span class="more"></span>

This project is currently work in progress.

Lux Coli mimics the behaviour of a living organism, that is influenced by the space itself and the presence of people within it. It creates an illusion of a living organism, a body without organs, “permeated by unformed, unstable matters, by flows in all directions, by free intensities or nomadic singularities, by mad or transitory particles” (G. Deleuze). Its behaviour and appearance resembles the reflex-like motions found in insects and bacterias, which often seem very alien and disturbing to us, but at the same time create an harmonious image with their symmetry and synchronisation of movements. Left alone it will be mesmerizing and calm. When people get close to it, it will show its disturbing nature. The disruption can also be seen as a resultant of the curvature (as a measure of contradiction between ideas) produced due to the disharmony in its surroundings which causes the installation’s fluid movement to collapse.

Interactive simulation: http://projects.lu-re.de/lux-coli/

Each arm contains a custom made pcb, which controls the leds and a stepper motor that rotates the arms in an angle of ~300 degrees. People around the installation are sensed by ultrasonic proximity sensors, built into the base of every arm (weight: ~1kg per arm). The Led Strips are housed within sealed acrylic tubes to protect them from humidity. Since the communication between the pieces is based on wireless transceivers, there are only power cables required to connect the single elements. Each of the arms runs on 24V requiring a maximum current of 5A, which sums up to a peak current consumption of 2500W for the whole installation. The joints will be custom made and 3d printed with waterproof and temperature resistant PETG filament. The Choreography of the arms is calculated on a raspberry pi that collects the sensor data and creates movement and light patterns that are send wirelessly to the single arms.