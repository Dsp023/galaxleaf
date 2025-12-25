---
title: Zero Trust Architecture
description: Never trust, always verify.
category: Cybersecurity
---

# Zero Trust

## The Old Model (Castle and Moat)
Organizations used to have a "Perimeter."
-   If you were outside the firewall (Internet): Untrusted.
-   If you were inside the firewall (Office Wi-Fi / VPN): Trusted. You could access almost everything.
**Problem:** Once a hacker Phishes one employee and gets "inside," they can move laterally and steal everything.

## The Zero Trust Model
**Assume the breach has already happened.**
No user or device is trusted by default, even if they are inside the corporate network.

## Core Principles
1.  **Verify Explicitly:** Authenticate and authorize every single request based on all available data (Identity, Location, Device Health).
2.  **Least Privilege Access:** Users get access only to the specific resources they need, Just-In-Time (JIT).
3.  **Assume Breach:** Segment the network. Encrypt internal traffic.

## Example
Instead of logging into a VPN and seeing every server, you log into a Zero Trust Proxy (like Cloudflare Access or Zscaler). To access the "HR App," you need MFA. To access the "Engineering DB," you need a different permission. Moving between them requires re-verification.
