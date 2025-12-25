---
title: Backpropagation
description: The fundamental algorithm for training neural networks.
category: Core Concepts (AI)
---

# Backpropagation: How Neural Networks Learn

## The Core Idea

**Backpropagation** (backward propagation of errors) is the algorithm that makes neural network training possible. It efficiently computes how much each weight contributed to the error, allowing us to adjust them to reduce mistakes.

## The Mathematical Foundation

### Chain Rule of Calculus

The entire algorithm rests on the chain rule:

$$\frac{\partial z}{\partial x} = \frac{\partial z}{\partial y} \cdot \frac{\partial y}{\partial x}$$

If $z$ depends on $y$, which depends on $x$, we can compute the derivative by multiplying intermediate derivatives.

## Step-by-Step Example

### Simple 2-Layer Network

```python
import numpy as np

# Network: Input → Hidden (2 neurons) → Output (1 neuron)
# Task: Learn XOR function

# Initialize random weights
np.random.seed(42)
w1 = np.random.randn(2, 2)  # Input to hidden
w2 = np.random.randn(2, 1)  # Hidden to output

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)

# Training data (XOR)
X = np.array([[0,0], [0,1], [1,0], [1,1]])
y = np.array([[0], [1], [1], [0]])

learning_rate = 0.5

for epoch in range(10000):
    # === FORWARD PASS ===
    # Layer 1
    hidden_input = np.dot(X, w1)
    hidden_output = sigmoid(hidden_input)
    
    # Layer 2
    final_input = np.dot(hidden_output, w2)
    final_output = sigmoid(final_input)
    
    # === CALCULATE ERROR ===
    error = y - final_output
    
    if epoch % 1000 == 0:
        loss = np.mean(np.square(error))
        print(f"Epoch {epoch}, Loss: {loss:.4f}")
    
    # === BACKWARD PASS ===
    # Output layer gradients
    d_output = error * sigmoid_derivative(final_output)
    
    # Hidden layer gradients (chain rule!)
    error_hidden = d_output.dot(w2.T)
    d_hidden = error_hidden * sigmoid_derivative(hidden_output)
    
    # === UPDATE WEIGHTS ===
    w2 += hidden_output.T.dot(d_output) * learning_rate
    w1 += X.T.dot(d_hidden) * learning_rate

# Test
print("\nPredictions:")
for i in range(len(X)):
    hidden = sigmoid(np.dot(X[i], w1))
    output = sigmoid(np.dot(hidden, w2))
    print(f"{X[i]} → {output[0]:.4f} (expected: {y[i][0]})")
```

## The Backward Pass Explained

### 1. Output Layer Error
```python
# How wrong were we?
error = y_true - y_pred

# How much should output neuron change?
# Derivative of loss with respect to output
d_output = error * sigmoid_derivative(y_pred)
```

### 2. Propagate Error Backwards
```python
# How much did hidden layer contribute to error?
# "Blame" each hidden neuron proportional to its weight
error_hidden = d_output.dot(weights_hidden_to_output.T)

# Apply activation derivative
d_hidden = error_hidden * sigmoid_derivative(hidden_activation)
```

### 3. Compute Weight Updates
```python
# How much should each weight change?
# Gradient = (activation of previous layer) * (error of next layer)
delta_w2 = hidden_activation.T.dot(d_output)
delta_w1 = input.T.dot(d_hidden)
```

### 4. Update Weights
```python
# Move weights in direction that reduces error
weights -= learning_rate * delta_weights
```

## Why Backpropagation is Efficient

**Naive approach:** Calculate loss for each weight individually
```python
# Terrible! O(n²) complexity
for weight in all_weights:
    weight += epsilon
    loss_plus = calculate_loss()
    weight -= epsilon
    gradient = (loss_plus - loss) / epsilon
```

**Backpropagation:** Calculate all gradients in one backward pass
```python
# Brilliant! O(n) complexity
# Reuse computations via chain rule
```

For a network with 1 million weights:
- Naive: 1 million forward passes
- Backprop: 1 forward + 1 backward pass

**Speedup: 500,000x**

## Common Problems

### 1. Vanishing Gradients

```python
# Deep network with sigmoid activation
for layer in range(100):
    x = sigmoid(x)
    # Sigmoid derivative is max 0.25
    # After 100 layers: 0.25^100 ≈ 0 (gradient vanishes!)
```

**Solution:** Use ReLU activation
```python
def relu(x):
    return max(0, x)
# Derivative is 1 (for x > 0), doesn't vanish!
```

### 2. Exploding Gradients

```python
# Gradients become huge
# Weights update too drastically
# Network oscillates

# Solution: Gradient Clipping
if gradient > threshold:
    gradient = threshold
```

### 3. Dead ReLU Problem

```python
# If ReLU neuron outputs 0, gradient is 0
# It never recovers ("dead neuron")

# Solution: Leaky ReLU
def leaky_relu(x):
    return max(0.01 * x, x)
# Small gradient even for negative values
```

## Modern Optimizations

### Momentum
```python
# Don't just go in gradient direction
# Build up velocity like a ball rolling downhill
velocity = 0.9 * velocity + learning_rate * gradient
weights -= velocity
```

### Adam (Most Popular)
```python
# Adaptive learning rate per weight
# Combines momentum + RMSProp
# Used in 90% of modern deep learning
```

## Computational Graph View

```
Forward: x → layer1 → layer2 → loss
Backward: ∂loss/∂x ← ∂loss/∂layer1 ← ∂loss/∂layer2 ← loss
```

Modern frameworks (PyTorch, TensorFlow) build this graph automatically.

```python
import torch

# PyTorch does backprop for you!
x = torch.tensor([1.0, 2.0], requires_grad=True)
y = (x ** 2).sum()
y.backward()  # Automatically computes gradients
print(x.grad)  # tensor([2., 4.])
```

## Further Reading

- [Calculus on Computational Graphs](http://colah.github.io/posts/2015-08-Backprop/)
- [CS231n: Backpropagation](http://cs231n.github.io/optimization-2/)
- [Original Paper (1986)](http://www.nature.com/articles/323533a0)
