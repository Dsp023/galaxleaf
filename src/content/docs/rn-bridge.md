---
title: React Native Bridge
description: How JS talks to Native.
category: Mobile
---

# React Native Bridge

## The Architecture (Old)
In classic React Native, there are two worlds:
1.  **JavaScript Thread:** Runs your React code (business logic).
2.  **Native Thread (Main/UI):** Runs the Objective-C/Java code that renders views on the screen.

They do not share memory. They communicate via the **Bridge** using JSON messages.
-   **JS:** "Please create a View at (0,0) with color red." -> Serializes to JSON -> **Bridge** -> Deserializes -> **Native:** Creates UI View.

## Performance Bottleneck
The Bridge is asynchronous. sending massive amounts of data (like 60fps animation updates or large lists) over the JSON bridge can cause traffic jams, leading to dropped frames (jank).

## The New Architecture (Bridgeless / JSI)
Modern React Native (0.68+) introduced **JSI (JavaScript Interface)**.
This allows JavaScript to hold a direct reference to C++ Host Objects. It can call native methods *synchronously* without serializing to JSON.
-   **Result:** Much faster performance, shared memory, and smoother animations (using Reanimated).
