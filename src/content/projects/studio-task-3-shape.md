---
title: "Studio Task 3: Shape — Impact Printing — IAAC MRAC"
description: "Two-and-a-half week research exploration of impact printing — clay pellets fired at high velocity through a piston attached to an ABB robot, building up material layer by layer."
date: 2025-12-24
cover: ../../assets/projects/impact_printing.jpeg
tags: [fabrication, robotics, design]
featured: false
year: 2025
location: "Barcelona — IAAC"
collaborators: ["Sam Holcombe", "Elias El Asmar", "Alexandre Dubor", "Valeria Carrion"]
status: published
---

## Overview

A two-and-a-half week research project within MRAC Advanced Technology at IAAC, investigating impact printing as a construction methodology. The technique fires clay pellets at high velocity through a pneumatic piston, projecting material onto a substrate to build up form — a process drawing on research by Gramazio Kohler at ETH Zurich (2021 onward).

The project was exploratory: systematically testing parameters that govern adhesion, spacing, orientation, and stacking to understand the behavior of the technique before combining findings into complex robotic trajectories.

## System Setup

- **Robot:** ABB 120/140 with IO-activated piston end effector
- **Nozzle:** 20mm diameter acrylic tube
- **Projectile:** Clay pellets (25mm diameter)
- **PSA:** 4.0 (pressure/system acceleration)
- **Substrate:** Placement board coated with a slip layer (wet clay) for adhesion
- **Bed elevation:** Clay feed raised on 30mm styrofoam to prevent tool collision on approach

## Parameter Research

The project systematically varied four parameters:

**Height (Z-distance)**
Optimal TCP distance from slip: 6–10mm. Below this range the tool leaves residue on the substrate; above it adhesion fails.

**Stepping distance**
Spacing between adjacent 25mm pellets tested across a range around 25mm to understand binding quality and continuity between elements.

**Euler angle**
Rotation of the end effector up to ±30° explored to produce angled deposits — beyond 30° structural integrity and tool-collision clearance became limiting factors.

**Stacking**
Layered structures built by combining height, stepping, and angle parameters across successive passes, testing how previously deposited pellets influence subsequent layer behavior.

## Final Iterations

Three compositions combined the learned parameters into complex robotic pathways:

1. Angled + Height + Stacking
2. Angled + Height + Stepping
3. Angled + Height + Stepping + Stacking

## Role & Tools

- ABB 120/140 robotic arm (IAAC) — trajectory execution
- Grasshopper — robotic path design and parameter control
- IO-activated pneumatic piston — custom end effector
- Clay + slip — primary material
