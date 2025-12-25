---
title: Quantization
description: Shrinking models to fit.
category: Optimization
---

# Quantization

## Overview
**Quantization** is the process of reducing the precision of the numbers (weights) used to represent a model's parameters. Standard models usually use **32-bit floating point** numbers (FP32). Quantization reduces this to 16-bit, 8-bit, or even 4-bit integers.

## Why?
1.  **Memory:** A 7-billion parameter model in FP16 takes ~14GB of VRAM. In 4-bit quantization, it takes ~3.5GB. This allows huge models to run on consumer GPUs or even MacBooks.
2.  **Speed:** Lower-precision math is faster to compute.

## Trade-offs
Reducing precision introduces "noise," which can slightly degrade the model's accuracy. However, creating techniques like **QLoRA** and **GPTQ** have shown that 4-bit models often perform almost as well as the original full-precision models, making local LLMs viable for everyone.
