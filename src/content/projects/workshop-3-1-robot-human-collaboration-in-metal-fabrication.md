---
title: "Workshop 3-1: Robot-Human Collaboration in Metal Fabrication — IAAC MRAC"
description: "Workshop at IAAC: UR10e robot positioned 6mm steel rods while students welded joints by hand — WebSocket communication and SteamVR tracking mapped spatial positions in real-time, building a digital twin of the welding process."
date: 2026-04-23
cover: ./workshop-3-1-robot-human-collaboration-in-metal-fabrication/grouppic-1.png
tags: [fabrication, robotics, design]
featured: false
year: 2026
location: "Barcelona — IAAC"
collaborators: ["Heleri Koltsin", "Sam Holcombe", "Priyam Gulati Ravinder", "Arthur Rotstein", "Nacho Monereo", "Prottay Roy Chowdhury", "Maria Mallo"]
status: published
---

<video src="workshop-3-1-robot-human-collaboration-in-metal-fabrication/workshop-video.mp4" autoplay muted loop playsinline style="width:100%;border-radius:4px;margin-bottom:1.5rem;"></video>

<iframe width="100%" style="aspect-ratio:16/9;border-radius:4px;margin-bottom:1.5rem;" src="https://www.youtube.com/embed/dC6U_4RJGqM" title="Workshop 3-1: Robot-Human Collaboration in Metal Fabrication" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Overview

A workshop within MRAC at IAAC investigating how robotic precision and human craft can combine in a single fabrication process. Rather than pursuing full automation, the project built a workflow where a UR10e robotic arm and skilled human welders worked collaboratively — the robot positions each 6mm steel rod to a digitally computed geometry, and students weld the joints by hand.

The result is a welded steel rod structure whose geometry was designed in Grasshopper, calibrated to the physical space via SteamVR controller tracking, and assembled through a continuous back-and-forth between machine and person. WebSocket communication connected the spatial tracking system to Grasshopper in real-time, feeding controller positions directly into the digital twin of the fabrication process — each spatial point the controllers mapped updated the live model instantly.

![Group photo](workshop-3-1-robot-human-collaboration-in-metal-fabrication/grouppic-1.png)

## Process

The workflow created a recursive feedback loop between the physical and digital states of the structure:

1. Digital geometry generation in Grasshopper
2. Calibration using HTC Vive spatial markers
3. Robotic rod positioning with the UR10e
4. Manual welding and adjustment at each joint
5. Physical measurement and scanning of the result
6. Digital model recalibration based on the as-built state

![Workflow diagram](workshop-3-1-robot-human-collaboration-in-metal-fabrication/lebbeus_woods_drawing_v2-1024x724.png)

## Fabrication

Two students weld simultaneously at the robot-positioned joints — one steadying the rod, the other running the electrode. Humans excel at intuitive material assessment and real-time adaptation; the robot provides precision and consistent positioning across the full sequence.

![Welding action](workshop-3-1-robot-human-collaboration-in-metal-fabrication/WhatsApp-Image-2026-04-23-at-16.34.48.png)

![Welding close-up](workshop-3-1-robot-human-collaboration-in-metal-fabrication/IMG_20260423_112755294_HDR-scaled.jpg)

## Structure

The diagram shows the three-layer logic of the assembly: the base structure anchored to a concrete block, the robotic intervention (highlighted in red), and the hand-placed connecting rods that triangulate the form.

![Structural diagram](workshop-3-1-robot-human-collaboration-in-metal-fabrication/image-48.png)

![Final structure](workshop-3-1-robot-human-collaboration-in-metal-fabrication/WhatsApp-Image-2026-04-24-at-11.50.26-1.png)

## Role & Tools

- UR10e robotic arm — precision rod placement from Grasshopper-computed paths
- Grasshopper — digital twin, calibration, and robotic path generation
- SteamVR + HTC Vive controllers — spatial tracking, position mapping, live calibration
- WebSocket — real-time communication between tracking system and Grasshopper
- MIG welding — manual joint connection at robot-positioned nodes
- 6mm steel rod — primary structural material

**Faculty:** Nacho Monereo, Prottay Roy Chowdhury — **Guest Artist:** Maria Mallo

## Port to Meta Quest 3

The SteamVR-based spatial tracking workflow developed here was later ported to Meta Quest 3, eliminating the need for SteamVR base stations entirely. The same WebSocket communication architecture connects Quest 3's onboard tracking to Grasshopper, running the identical digital twin workflow on standalone hardware without external infrared tracking infrastructure.
