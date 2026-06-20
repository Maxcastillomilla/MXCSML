---
title: "Impact Printing — Pneumatic Clay Extrusion"
description: "Workshop at IAAC: ABB robotic arm drives a pneumatic clay extrusion system, depositing material through controlled impact rather than continuous flow — exploring material behaviour at the boundary of robotic control."
date: 2025-03-01
cover: ../../assets/projects/impact_printing.jpeg
tags: [fabrication, robotics]
featured: false
year: 2025
location: "Barcelona — IAAC"
status: published
---

## Overview

A fabrication workshop at IAAC exploring pneumatic clay extrusion as a robotic end-effector — using an ABB robotic arm to control the position, angle, and timing of clay deposition through pressurised impact rather than conventional continuous extrusion.

The material deposits through discrete impact events: each hit leaves a mark determined by tool speed, angle, pressure, and clay consistency. The result is a surface texture and density controlled indirectly through robotic parameters rather than directly through nozzle geometry.

## Process

The robotic path defines the sequence of impacts across the target surface. Varying the approach angle and velocity changes the shape of each deposit — a steep, fast strike produces a distinct mark from a shallow, slow approach. This relationship between robotic motion parameters and material output is the core design variable.

Clay's behaviour under impact — its viscosity, hydration level, and surface adhesion — introduces material agency into the process. The robot operates within a range of expected outcomes rather than producing deterministic geometry.

## Tools

- **ABB robotic arm** (IAAC) — motion control, tool positioning, impact sequencing
- **Pneumatic clay extruder** — custom end-effector for pressurised deposition
- **Grasshopper** — path generation, impact parameter control
