---
title: CIA Triad
description: The three pillars of security.
category: Cybersecurity
---

# CIA Triad

## The Model
The **CIA Triad** is the fundamental framework for Information Security.

## 1. Confidentiality
**"Only authorized people can see data."**
-   **Attack:** Data Breach, Packet Sniffing.
-   **Defense:** Encryption (AES, TLS), Access Controls (MFA), Redaction.

## 2. Integrity
**"Data must not be tampered with."**
-   **Attack:** Man-in-the-Middle changes a bank transfer amount; SQL Injection modifies a record.
-   **Defense:** Hashing (SHA-256), Digital Signatures, Checksums, Backups.

## 3. Availability
**"Data must be accessible when needed."**
-   **Attack:** DDoS (Distributed Denial of Service) attack, Ransomware locking files.
-   **Defense:** Redundancy (multiple servers), CDNs, Backups, Disaster Recovery Plans.

*Note:* These often conflict. High Confidentiality (locking everything up in an underground disconnected vault) hurts Availability.
