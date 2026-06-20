---
title: "AWW System — Augmented WoodWorking System"
description: "Real-time AR pipeline overlaying piece-specific fabrication geometry at 1:1 scale on physical timber — ArUco markers detect wood dimensions, Python processes, Grasshopper generates cut lines and annotations, transmitted to Meta Quest 3."
date: 2026-06-13
cover: ../../assets/projects/ar-fabrication.jpg
tags: [fabrication, robotics, design]
featured: true
year: 2026
location: "Barcelona — IAAC"
collaborators: ["Gaelle Habib", "Natalia Alvarez", "Chun-Chun Chang", "Arthur Rotstein"]
status: published
---

<iframe width="100%" style="aspect-ratio:16/9;border-radius:4px;margin-bottom:1.5rem;" src="https://www.youtube.com/embed/Axh9jDjCg8Y" title="AWW System — Augmented WoodWorking System demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Overview

An augmented reality fabrication platform that guides a human assembler through complex joinery step by step — projecting fabrication geometry directly onto physical timber components at 1:1 scale. Cut lines, drill points, and dimensional annotations appear overlaid on the actual piece, anchored to it in real time through the Meta Quest 3 headset.

The system removes the need to translate between digital drawings and physical material. The worker sees exactly what needs to be cut and where to drill, positioned on the actual piece in front of them, updating as the assembly sequence progresses.

Developed at IAAC as part of the Hardware III course "Human-in-the-Loop Interactive Systems" — Master in AI for Architecture and the Built Environment (MAAI 01, 2025–2026).

## Pipeline

The system runs as a finite state machine across five assembly stages:

**Scanning → Cutting → Drilling → Verification → Completion**

Each stage is handled by a dedicated workflow connecting the workstation and the headset:

**1. Detection**
ArUco markers placed on each timber component. A camera reads the markers, extracting real-world dimensions and spatial orientation.

**2. Processing**
Python receives marker data, computes piece geometry, and passes it to Grasshopper via JSON and WebSocket over a live data bridge.

**3. Geometry Generation**
Grasshopper generates piece-specific fabrication geometry — cut lines, drill points, and annotations — computed relative to the actual physical dimensions of each specific piece, not nominal design values.

**4. Transmission**
Geometry serialised and transmitted via UDP over WiFi to the Meta Quest 3.

**5. Overlay**
The headset renders fabrication geometry at 1:1 scale, anchored to the physical piece via ArUco markers. The system automatically advances the assembly sequence upon correct placement verification.

## Three.js Web Viewer

Grasshopper simultaneously generates a Three.js web viewer — a live 3D representation of the current piece and its fabrication geometry. This viewer is accessible as a floating window inside the headset during fabrication, providing a secondary reference view of the full model while working at physical scale.

## Research Direction

A standalone reverse channel was prototyped: headset camera feed → Python → Grasshopper, enabling the system to close the loop and verify fabrication accuracy without external sensors. This direction was constrained by UDP bandwidth limitations in standalone mode and is identified as an open research direction — continuous visual feedback from the fabrication environment back into the computational model.

## Stack

- **Unity 6** + **Meta XR SDK** — headset application, AR rendering, spatial anchoring
- **MRUK QR Tracking** — marker detection and spatial registration on-device
- **ArUco / Python / OpenCV** — physical dimension extraction, geometry computation
- **Grasshopper / Rhino** — parametric fabrication geometry generation
- **Three.js** — simultaneous web viewer generated from Grasshopper output
- **JSON + WebSocket / UDP over WiFi** — real-time data transmission between systems

## Faculty

**Hamid Peiro · Aleksandra Kraeva** — Hardware III, IAAC MAAI 01
