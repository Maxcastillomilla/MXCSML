---
title: "Collaborative Robotic Wood Bending — Graduation Project"
description: "Graduation project: parametric forming sequences for structural timber assembly using an ABB IRB 140 — computational strategies that integrate material behaviour with toolpath generation."
date: 2025-10-01
cover: ../../assets/projects/robotic-fabrication.jpg
tags: [fabrication, robotics]
featured: false
year: 2025
status: published
---

## Overview

A graduation project exploring how robotic fabrication and computational design can be integrated with the inherent material behaviour of timber. Rather than treating the material as a passive medium to be forced into designed forms, the project treats wood's bending properties as an active variable in the toolpath logic.

The platform is an ABB IRB 140 robotic arm, operated through parametric forming sequences that were computed specifically to accommodate how each timber strip responds to forming — its grain direction, moisture content, and elastic range.

## Approach

The core challenge was developing forming sequences that remain valid across material variation. No two timber strips behave identically; the computational strategy had to produce paths that worked within the material's constraints rather than against them.

The process generated structural timber assemblies where the final geometry is partly authored by the material itself — the computational system proposing paths, the material validating them through physical response.

## Computational Strategy

- Parametric forming sequences computed per-component based on material profile
- Toolpath generation integrated with material bending models
- ABB IRB 140 arm as execution platform
- Grasshopper — parametric geometry, forming logic, robotic path output

## Tools

- **ABB IRB 140** — robotic forming arm
- **Grasshopper / Rhinoceros** — parametric design and toolpath computation
- **RAPID** — robot programming and execution control
