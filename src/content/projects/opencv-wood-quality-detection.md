---
title: "OpenCV Wood Quality Detection — ongoing"
description: "Computer vision pipeline for structural defect detection and crack identification in timber strips — dimension extraction and material classification for fabrication suitability, with Grasshopper integration in progress."
date: 2026-01-01
tags: [fabrication, robotics, design]
featured: false
year: 2026
status: published
---

## Overview

An ongoing computer vision pipeline for classifying timber strips by structural quality before they enter a fabrication workflow. The system detects surface defects, cracks, and knots; extracts physical dimensions; and classifies each piece as suitable or unsuitable for specific fabrication roles.

The motivation is to reduce manual inspection time and introduce objective, consistent quality criteria at the input stage of a fabrication process — before material reaches the robot.

## Pipeline

**1. Input**
Timber strips photographed or captured via live feed under controlled lighting.

**2. Defect Detection**
OpenCV processes each image: crack identification via edge detection and morphological analysis, surface anomaly classification using contour analysis and area thresholding.

**3. Dimension Extraction**
Physical dimensions extracted from calibrated reference markers — length, width, and thickness recovered without contact measurement.

**4. Classification**
Each piece assigned a fabrication suitability score based on defect type, location, and extent. Classification output maps each strip to permitted fabrication roles (structural vs. non-structural vs. reject).

## Grasshopper Integration (in progress)

The classification output is being connected to Grasshopper to close the loop between material inspection and fabrication geometry. A piece classified as suitable triggers automatic toolpath generation for that specific component; unsuitable pieces are flagged before they enter the robotic workflow.

## Tools

- **Python + OpenCV** — image acquisition, defect detection, dimension extraction
- **Grasshopper** — fabrication geometry, toolpath integration (in progress)
- Calibration targets — physical reference for dimension extraction
