---
title: Smart Contracts
description: Code is Law.
category: Web3
---

# Smart Contracts

## Overview
A **Smart Contract** is a program stored on a blockchain that runs when predetermined conditions are met. It automates the execution of an agreement so that all participants can be immediately certain of the outcome, without any intermediary's involvement or time loss.

## Characteristics
-   **Deterministic:** The same input always produces the same output.
-   **Immutable:** Once deployed, code cannot be patched or changed (usually). Bugs are forever.
-   **Transparent:** Anyone can read the source code (or bytecode) on the chain.

## Example (Solidity)
A simple "Vending Machine" contract.
```solidity
pragma solidity ^0.8.0;

contract VendingMachine {
    address public owner;
    mapping (address => uint) public donutBalances;

    constructor() {
        owner = msg.sender;
        donutBalances[address(this)] = 100;
    }

    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Not enough ether");
        require(donutBalances[address(this)] >= amount, "Not enough donuts");
        
        donutBalances[address(this)] -= amount;
        donutBalances[msg.sender] += amount;
    }
}
```

## Gas
Running code on the blockchain costs money (Gas). Every operation (addition, storage) costs a fraction of ETH. This prevents infinite loops and spam.
