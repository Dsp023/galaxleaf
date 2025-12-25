---
title: Zero Knowledge Proofs (ZKP)
description: I know a secret, but I won't tell you what it is.
category: Web3
---

# Zero Knowledge Proofs (ZKP)

## Overview
A cryptographic method by which one party (the Prover) can prove to another party (the Verifier) that they know a value `x`, without conveying any information apart from the fact that they know users.

## Analogy: The Cave
Imagine a circular cave with a magic door in the middle. The door opens only with a password.
-   Alice enters the cave and goes to the back.
-   Bob stands outside.
-   Alice appears from the left side.
-   Bob: "If you really know the password, enter from the right and come out the left."
-   Alice does it.
Bob now knows Alice has the password *without Alice shouting the password across the cave*.

## Use Cases
1.  **Privacy:** Verify you are over 18 without revealing your birthdate. Verify you have enough money for a transaction without revealing your bank balance (Zcash, Monero).
2.  **Scalability (Rollups):** **zk-Rollups** (like zkSync, Starknet) handle thousands of transactions off-chain, generate a tiny ZK-proof that they are all valid, and post just that proof to Ethereum. This compresses 1000 transactions into the space of one.
