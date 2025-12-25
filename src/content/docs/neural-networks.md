---
title: Neural Networks
description: The foundation of modern AI.
category: Core Concepts (AI)
---

# Neural Networks: Computing Like the Brain

## Introduction

Neural networks are computing systems inspired by biological neural networks in animal brains. They're the foundation of modern AI, powering everything from image recognition to language models.

## Basic Structure

### The Artificial Neuron (Perceptron)

```
Inputs (x₁, x₂, x₃) → Weights (w₁, w₂, w₃) → Σ → Activation Function → Output
```

```python
import numpy as np

class Neuron:
    def __init__(self, num_inputs):
        # Initialize random weights and bias
        self.weights = np.random.randn(num_inputs)
        self.bias = np.random.randn()
    
    def forward(self, inputs):
        # Weighted sum
        total = np.dot(inputs, self.weights) + self.bias
        
        # Activation (sigmoid)
        return 1 / (1 + np.exp(-total))

# Example
neuron = Neuron(3)
output = neuron.forward([0.5, 0.3, 0.9])
print(f"Output: {output}")  # 0.0 to 1.0
```

### Layers

**Input Layer:** Receives raw data (pixels, words, numbers)  
**Hidden Layers:** Process and transform data  
**Output Layer:** Produces predictions

```python
class NeuralNetwork:
    def __init__(self, layer_sizes):
        self.layers = []
        for i in range(len(layer_sizes) - 1):
            layer = np.random.randn(layer_sizes[i], layer_sizes[i+1])
            self.layers.append(layer)
    
    def forward(self, X):
        activation = X
        for layer in self.layers:
            activation = self.sigmoid(np.dot(activation, layer))
        return activation
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

# 3-layer network: 784 inputs (28x28 image) → 128 hidden → 10 outputs (digits 0-9)
nn = NeuralNetwork([784, 128, 10])
```

## Activation Functions

### 1. Sigmoid
```python
def sigmoid(x):
    return 1 / (1 + np.exp(-x))
# Output: 0 to 1 (good for probabilities)
# Problem: Vanishing gradients
```

### 2. ReLU (Rectified Linear Unit)
```python
def relu(x):
    return np.maximum(0, x)
# Output: 0 to infinity
# Fast, fixes vanishing gradients
# Most popular in deep networks
```

### 3. Tanh
```python
def tanh(x):
    return np.tanh(x)
# Output: -1 to 1
# Zero-centered (better than sigmoid)
```

## Training: Backpropagation

### The Process

1. **Forward Pass:** Input → Hidden → Output
2. **Calculate Loss:** How wrong were we?
3. **Backward Pass:** Calculate gradients (∂Loss/∂Weight)
4. **Update Weights:** weight -= learning_rate * gradient

```python
def train(network, X, y, learning_rate=0.01, epochs=1000):
    for epoch in range(epochs):
        # Forward pass
        output = network.forward(X)
        
        # Calculate loss (Mean Squared Error)
        loss = np.mean((output - y) ** 2)
        
        # Backward pass (simplified)
        # Calculate gradient of loss with respect to output
        d_output = 2 * (output - y) / len(y)
        
        # Backpropagate through layers
        for i in reversed(range(len(network.layers))):
            # Chain rule: d_loss/d_weight = d_loss/d_output * d_output/d_weight
            d_weights = np.dot(network.activations[i].T, d_output)
            
            # Update weights
            network.layers[i] -= learning_rate * d_weights
            
            # Propagate error to previous layer
            d_output = np.dot(d_output, network.layers[i].T)
        
        if epoch % 100 == 0:
            print(f"Epoch {epoch}, Loss: {loss:.4f}")
```

## Real Example: Handwritten Digit Recognition

```python
import tensorflow as tf
from tensorflow import keras

# Load MNIST dataset
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

# Normalize pixel values (0-255 → 0-1)
X_train = X_train / 255.0
X_test = X_test / 255.0

# Build model
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),  # 784 inputs
    keras.layers.Dense(128, activation='relu'),   # Hidden layer
    keras.layers.Dropout(0.2),                    # Prevent overfitting
    keras.layers.Dense(10, activation='softmax')  # 10 outputs (0-9)
])

# Compile
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train
model.fit(X_train, y_train, epochs=5, validation_split=0.1)

# Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Test accuracy: {test_acc:.4f}")  # ~98%
```

## Deep Learning Era

**Deep Networks:** Many hidden layers (10, 50, 100+ layers)

**Breakthrough:** ImageNet 2012 - AlexNet (deep CNN) achieved 84.6% accuracy, crushing previous 74.3%

**Key Innovations:**
- **GPUs:** Massively parallel computation
- **ReLU:** Solved vanishing gradients
- **Dropout:** Prevents overfitting
- **Batch Normalization:** Stabilizes training
- **Residual Connections (ResNet):** Enables 1000+ layer networks

## Use Cases

**Computer Vision:** Object detection, facial recognition, medical imaging  
**NLP:** Machine translation, sentiment analysis, chatbots  
**Speech:** Voice assistants (Siri, Alexa)  
**Gaming:** AlphaGo defeated world champion (2016)  
**Science:** Protein folding (AlphaFold), drug discovery

## Common Architectures

### Convolutional Neural Networks (CNNs)
For images. Learns spatial hierarchies.

### Recurrent Neural Networks (RNNs)
For sequences (text, time series). Has memory.

### Transformers
Current state-of-the-art for NLP (GPT, BERT).

## Further Reading

- [3Blue1Brown: Neural Networks](https://www.3blue1brown.com/topics/neural-networks)
- [CS231n: Convolutional Neural Networks](http://cs231n.github.io/)
- [Deep Learning Book (Goodfellow)](https://www.deeplearningbook.org/)
