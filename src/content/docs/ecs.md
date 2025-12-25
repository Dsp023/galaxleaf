---
title: Entity Component System (ECS)
description: Composition over Inheritance on steroids.
category: Game Development
---

# Entity Component System (ECS)

## Overview
**ECS** is an architectural pattern used in game development (Unity DOTS, Bevy, Overwatch engine) that favors performance and flexibility over standard Object-Oriented Programming (OOP).

## The Problems with OOP
In OOP, you might have a class `Player` inheriting from `Character` inheriting from `GameObject`.
-   What if a `Tree` needs to be destructible like a `Player`? Multiple inheritance is messy.
-   Memory is scattered (Pointer chasing), causing CPU cache misses.

## The ECS Trio
1.  **Entity:** Just an ID (e.g., `Entity #42`). It has no data or logic. Ideally just an integer.
2.  **Component:** Pure data. No methods.
    -   `Position { x: 0, y: 0 }`
    -   `Velocity { x: 5, y: 0 }`
    -   `Health { current: 100 }`
3.  **System:** Logic that runs on entities with specific components.
    -   `MovementSystem`: Finds all entities with *Position* AND *Velocity*, and adds velocity to position.

## Benefits
-   **Performance:** Components are stored in contiguous memory arrays. The CPU can process them extremely fast (Data-Oriented Design).
-   **Flexibility:** Want to make a spell fly? Just add a `Velocity` component to the `Spell` entity. No inheritance mess.
