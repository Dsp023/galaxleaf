---
title: CI/CD
description: Continuous Integration and Continuous Deployment.
category: Core Concepts (DevOps)
---

# CI/CD

## The Pipeline
CI/CD represents the modern software supply chain. It automates the path from "Code written on developer's laptop" to "Feature running in production."

## 1. Continuous Integration (CI)
**"Don't break the build."**
Every time a developer pushes code to the shared repository (e.g., GitHub), an automated pipeline runs:
- **Linting:** Checking style/syntax.
- **Building:** Compiling the code to check for errors.
- **Testing:** Running Unit and Integration tests to ensure no regressions.

If any step fails, the merge is blocked. This ensures the "main" branch is always in a healthy, buildable state.

## 2. Continuous Delivery (CD)
**"Always be ready to ship."**
After CI passes, specific artifacts (like Docker images or binaries) are created and deployed to a **Staging Environment** automatically. Here, they can be manually tested. Deployment to production is a manual button click, but the *process* of deployment is automated.

## 3. Continuous Deployment (CD - The other one)
**"Ship it."**
The advanced level. If CI and tests pass, the code is automatically pushed to **Production** without human intervention. Commonly used by tech giants (Netflix, Amazon) who deploy thousands of times a day.

## Benefits
- **Speed:** Features reach users faster.
- **Safety:** Smaller, incremental changes are easier to fix than massive monthly releases.
- **Consistency:** No more "It works on my machine" issues.
