---
title: Containerization (Docker)
description: Solve "It works on my machine".
category: Core Concepts (DevOps)
---

# Containerization

## Overview
**Containerization** involves bundling an application together with all of its related configuration files, libraries, and dependencies required for it to run across different computing environments.

## Virtual Machines (VMs) vs Containers

### Virtual Machines
- A VM emulates an entire computer, including the **Guest OS**.
- Heavy: Requires GBs of storage and mostly duplicates the Host OS.
- Slow boot time.

### Containers
- Containers share the **Host OS Kernel** but isolate the application process (userspace).
- Lightweight: MBs in size.
- Startup is instant (milliseconds).
- **Docker** is the standard tool for creating containers.

## Why use it?
1.  **Consistency:** A container runs exactly the same on a developer's Mac, the QA testing server, and the Production Linux cloud instance.
2.  **Isolation:** You can run Python 2.7 app and a Python 3.10 app on the same server without conflict.
3.  **Efficiency:** Higher density. Use less hardware to run more apps.

## Docker Basics
- **Dockerfile:** The recipe. Describes how to build the image (Steps: Start with Linux, Install Node, Copy code, Run app).
- **Image:** The baked cake. A read-only template built from the Dockerfile.
- **Container:** The running instance. You can run multiple containers from one image.
