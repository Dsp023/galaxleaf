---
title: Scaling Strategies
description: Handling growth.
category: Core Concepts (Backend)
---

# Horizontal vs Vertical Scaling

## Vertical Scaling (Scaling Up)
Adding more power (CPU, RAM, SSD) to an existing machine.
- **"Buy a bigger server."**
- **Pros:** Easiest to implement. No code changes required. Can handle massive databases (e.g., standard SQL).
- **Cons:**
  - **Ceiling:** There is a limit to how big a single machine can get.
  - **Downtime:** Adding RAM usually requires a restart.
  - **Single Point of Failure:** If that one big machine dies, you go down.
  - **Cost:** High-end hardware gets exponentially expensive.

## Horizontal Scaling (Scaling Out)
Adding more machines (nodes) to a system.
- **"Buy more cheap servers."**
- **Pros:**
  - **Infinite Scale:** Theoretically limited only by budget/architecture.
  - **Resilience:** If one node dies, the others take over.
  - **No Downtime:** You can add/remove nodes on the fly.
- **Cons:**
  - **Complexity:** Requires load balancers, distributed databases, and careful application design (statelessness).
  - **Data Consistency:** Harder to keep data synced across 100 machines (see CAP Theorem).

## The Modern Approach
Web servers (Stateless) are almost always **Horizontally Scaled** behind a Load Balancer.
Databases (Stateful) are harder. They often rely on **Vertical Scaling** first (a huge master node), then **Read Replicas** (horizontal for reads), and finally **Sharding** (horizontal for writes) only when absolutely necessary.
