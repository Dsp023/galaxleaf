---
title: Encryption
description: Making math secure.
category: Cybersecurity
---

# Encryption

## Symmetric Encryption (Shared Secret)
-   **How:** The *same* key is used to lock and unlock the data.
-   **Algorithm:** AES (Advanced Encryption Standard).
-   **Speed:** Very fast.
-   **Problem:** Key Distribution. How do I send you the key safely without a hacker intercepting it?

## Asymmetric Encryption (Public-Private Key)
-   **How:** User has two keys.
    -   **Public Key:** Anyone can see it. Used to *Encrypt*.
    -   **Private Key:** Kept secret. Used to *Decrypt*.
-   **Analogy:** Anyone can snap a padlock (Public Key) onto a box, but only the person with the Key (Private) can open it.
-   **Algorithm:** RSA, Elliptic Curve (ECC).
-   **Use Case:** HTTPS handshake, SSH, Bitcoin wallets.

## Hashing (Not Encryption)
Hashing is **one-way**. You turn data into a string (Hash). You cannot turn the hash back into data.
-   **Use Case:** Storing passwords. You don't store "password123". You store `hash("password123")`. When user logs in, you hash their input and compare it to the stored hash. (With Salt).
