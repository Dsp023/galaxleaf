---
title: Shaders
description: Coding for the GPU.
category: Game Development
---

# Shaders

## Overview
A **Shader** is a small program that runs on the Graphics Processing Unit (GPU). They are responsible for determining the color, lighting, and position of every pixel on your screen.

## Types of Shaders
1.  **Vertex Shader:** Handles geometry. It takes a 3D point (vertex) and calculates where it should appear on your 2D screen. It handles animation (like waving grass).
2.  **Fragment (Pixel) Shader:** Handles color. It runs for every single pixel covering the object. It calculates lighting, shadows, textures, and reflections.

## Languages
-   **GLSL:** OpenGL Shading Language (Web, Linux, Android).
-   **HLSL:** High-Level Shading Language (DirectX, Windows, Xbox).
-   **Metal:** Apple devices.

## How it feels
Shaders run in massive parallel (thousands of threads).
If you write a "red" shader, millions of pixels process that code simultaneously.
This makes them incredibly powerful for effects like water, fire, fog, and bloom.
