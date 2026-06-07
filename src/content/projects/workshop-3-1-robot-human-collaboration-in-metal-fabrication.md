---
title: "Workshop 3-1: Robot-Human Collaboration in Metal Fabrication — IAAC MRAC"
description: "A week-long workshop at IAAC exploring human-robot collaboration in metal fabrication — a UR10e robot positioned 6mm steel rods while students welded the joints by hand, creating a dynamic feedback loop between digital design, robotic precision, and human craftsmanship."
date: 2026-04-23
cover: ./workshop-3-1-robot-human-collaboration-in-metal-fabrication/grouppic-1.png
tags: [fabrication, robotics]
featured: false
year: 2026
location: "Barcelona — IAAC"
collaborators: ["Heleri Koltsin", "Sam Holcombe", "Priyam Gulati Ravinder", "Arthur Rotstein", "Nacho Monereo", "Prottay Roy Chowdhury", "Maria Mallo"]
status: published
---

<video src="workshop-3-1-robot-human-collaboration-in-metal-fabrication/workshop-video.mp4" autoplay muted loop playsinline style="width:100%;border-radius:4px;margin-bottom:1.5rem;"></video>

## Overview

A workshop within MRAC at IAAC investigating how robotic precision and human craft can combine in a single fabrication process. Rather than pursuing full automation, the project built a workflow where a UR10e robotic arm and skilled human welders worked collaboratively — the robot positions each 6mm steel rod to a digitally computed geometry, and students weld the joints by hand.

The result is a welded steel rod structure whose geometry was designed in Grasshopper, calibrated to the physical space via HTC Vive spatial markers, and assembled through a continuous back-and-forth between machine and person.

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
- HTC Vive — spatial marker calibration between physical and digital space
- MIG welding — manual joint connection at robot-positioned nodes
- 6mm steel rod — primary structural material

**Faculty:** Nacho Monereo, Prottay Roy Chowdhury — **Guest Artist:** Maria Mallo
