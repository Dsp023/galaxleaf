---
title: Raycasting
description: The "Laser Eye" of games.
category: Game Development
---

# Raycasting

## Overview
**Raycasting** involves shooting an invisible line (a ray) from point A in a specific direction to see if it hits anything.

## Use Cases
1.  **Shooting:** In an FPS game, when you fire, a ray is cast from the center of the camera. If it intersects an enemy's "Hitbox," they take damage.
2.  **Vision:** "Can the enemy see the player?" Raycast from enemy eyes to player. If the ray hits a wall first, line-of-sight is blocked.
3.  **Mouse Selection:** When you click on a 3D unit in an RTS, a ray is cast from your 2D mouse cursor "into" the 3D world to find what unit is under it.
4.  **Ground Check:** "Is Mario standing on the floor?" Cast a short ray downwards from Mario's feet.

## Raycasting vs Raytracing
-   **Raycasting:** Usually one ray per object/event. Fast. Used for logic.
-   **Raytracing:** Millions of rays per frame, bouncing off surfaces to simulate realistic light photons. Slow. Used for rendering graphics.
