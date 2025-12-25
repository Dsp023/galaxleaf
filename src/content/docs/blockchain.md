---
title: Blockchain
description: The trustless database.
category: Core Concepts (Web3)
---

# Blockchain

## Overview
A **Blockchain** is a distributed, immutable ledger. It is a database shared across a network of computers (nodes) where records are stored in "blocks" linked together using cryptography.

## Key Properties
1.  **Decentralized:** No single entity controls the network. The truth is determined by consensus among thousands of nodes.
2.  **Immutable:** Once data is written, it cannot be changed or deleted. To modify a past block, you would have to redo the cryptographic proof for that block and all subsequent blocks, which is computationally impossible for established chains.
3.  **Transparent:** Anyone can audit the history of transactions.

## How it works (Simplified)
1.  **Transaction:** Alice sends 1 BTC to Bob.
2.  **Memphis:** The transaction enters a pool of pending transactions.
3.  **Block Creation:** "Miners" (or Validators) pick a batch of transactions and bundle them into a **Block**.
4.  **Proof:** They perform a complex operation (Mining/Staking) to validate the block.
5.  **Chain:** The new block involves a "Hash" of the *previous* block, creating a cryptographic chain.
6.  **Consensus:** The network agrees the block is valid and adds it to their copy of the ledger.

## Use Cases
- **Cryptocurrency:** Bitcoin (Digital Gold), Stablecoins.
- **Smart Contracts:** Ethereum (Programmable money). Automated agreements that execute when conditions are met.
- **DeFi:** Decentralized Finance (Lending, Exchange) without banks.
- **Supply Chain:** Tracking provenance of goods.
