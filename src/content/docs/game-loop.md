---
title: The Game Loop
description: The heartbeat of a game.
category: Game Development
---

# The Game Loop

## Overview
Unlike standard software which waits for user input (event-driven), a video game must keep running continuously—moving enemies, playing physics, animating particles—even if the player does nothing. This endless cycle is the **Game Loop**.

## The Cycle
Usually running 60 times per second (60 FPS), the loop does three things:

1.  **Input:** Check controller/keyboard state.
2.  **Update:** Move characters, check collisions, run AI, update physics.
3.  **Render:** Draw the scene to the screen.

```cpp
while (game_is_running) {
    double start = getCurrentTime();
    
    processInput();
    update(deltaTime);
    render();
    
    double end = getCurrentTime();
    sleep(16ms - (end - start)); // Wait to maintain 60FPS
}
```

## Delta Time
**Delta Time (dt)** is the time elapsed since the last frame.
If you move a character `position += 5`, specific computers running at 120FPS will move twice as fast as computers at 60FPS.
Correct: `position += speed * dt`. This ensures movement speed is consistent regardless of framerate.
