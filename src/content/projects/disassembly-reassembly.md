---
title: "Disassembly & Reassembly — Spatial AI Brick Sorting — IAAC MRAC"
description: "Reclaimed bricks classified by color and damage score, sorted into a gradient-based layout, and reassembled into a tower by a Universal Robots arm guided by AI-generated placement instructions."
date: 2026-03-24
tags: [fabrication, robotics, design]
featured: false
year: 2026
location: "Barcelona — IAAC"
collaborators: ["Subha Tahsin Saba", "Arthur Rotstein", "Brendon Dlima"]
status: published
---

## Overview

A workshop at IAAC's Master in Robotics & Advanced Construction exploring robotic disassembly and reassembly as a strategy for material reuse. The core question: how can machines actively participate in evaluating and reorganizing reclaimed materials into new structures in real time?

The raw material was a set of used bricks — each with different characteristics: color, surface wear, and physical damage. Rather than treating variation as a problem, the project used it as generative data: classifying each brick, scoring it, and using those scores to determine its position in a new assembly.

## Classification System

Each brick was inventoried and evaluated along two variables:

- **Color** — photographed and classified to enable gradient-based sorting across the assembled surface
- **Damage score** — structural condition assessed and quantified (intact → heavily damaged) to determine structural suitability and placement priority

The two variables were combined into a scoring system that assigned each brick a position in the final design: similar colors grouped to produce a visible color gradient across the tower face, with damage scores used to prioritize more intact bricks for structurally critical positions.

## AI-Assisted Layout Generation

With the full brick inventory and scores established, AI algorithms generated the reassembly layout — producing placement instructions that optimized for both the color gradient and structural viability of each position. This step translated the material database into an actionable construction sequence for the robot.

## Robotic Reassembly

A Universal Robots arm executed the reassembly, following the AI-generated placement instructions to build the tower brick by brick. Computer vision provided object perception for locating bricks in the workspace; sensor-based feedback guided pick-and-place operations in real time.

## Role & Tools

- Python — brick classification pipeline, scoring system, data processing
- Computer vision — brick identification, cataloging, spatial localization
- AI layout generation — reassembly configuration from material condition data
- Universal Robots arm (IAAC) — physical disassembly and reassembly execution
- Grasshopper / Computational Design — structural and spatial logic
