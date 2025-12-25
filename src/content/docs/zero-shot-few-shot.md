---
title: Zero-shot & Few-shot Prompting
description: Teaching the model without training it.
category: Prompt Engineering
---

# Zero-shot & Few-shot Prompting: In-Context Learning

## Zero-shot Prompting

**Definition:** Ask the model to perform a task without providing any examples.

### Example
```
Prompt: "Classify the sentiment of this text: 'The food was okay.' 
Output only Positive, Negative, or Neutral."

Response: "Neutral"
```

### How It Works
LLMs are trained on massive datasets and have seen similar patterns during training. They can generalize to new tasks based on instructions alone.

### When It Works Well
```python
# Simple, well-defined tasks
prompts = [
    "Translate to French: Hello, how are you?",
    "Summarize this article in one sentence: ...",
    "What is the capital of France?",
    "Is this email spam? Subject: 'You won $1M!'"
]

# Model handles these without examples
```

### When It Fails
```python
# Complex reasoning
Prompt: "Solve: If a train leaves Chicago at 2pm going 60mph..."
Response: *Makes calculation errors*

# Domain-specific tasks
Prompt: "Classify this medical symptom as urgent or routine..."
Response: *Unreliable without medical context*

# Specific output formats
Prompt: "Extract names from this text..."
Response: *Inconsistent formatting*
```

## Few-shot Prompting

**Definition:** Provide a few examples in the prompt to guide the model's behavior.

### Basic Structure
```
[Example 1 Input] → [Example 1 Output]
[Example 2 Input] → [Example 2 Output]
[Example 3 Input] → [Example 3 Output]
[Your Input] → ?
```

### Example: Sentiment Analysis
```
Prompt:
"""
Classify the sentiment as Positive, Negative, or Neutral.

Text: "This movie was absolutely fantastic!"
Sentiment: Positive

Text: "I hated every minute of it."
Sentiment: Negative

Text: "It was alright, nothing special."
Sentiment: Neutral

Text: "The soundtrack was amazing but the plot was weak."
Sentiment:
"""

Response: "Neutral"
```

### Example: Custom Format
```python
# Teach model a specific output format
prompt = """
Extract person names in JSON format.

Text: "Alice went to the store with Bob."
Output: {"names": ["Alice", "Bob"]}

Text: "Charlie and Diana had lunch."
Output: {"names": ["Charlie", "Diana"]}

Text: "Emma called Frank yesterday."
Output:
"""

# Model learns the JSON format from examples
response = {"names": ["Emma", "Frank"]}
```

## Number of Examples

### 0-shot (No examples)
- **Speed:** Fastest ⚡
- **Cost:** Cheapest 💰
- **Accuracy:** Good for simple tasks

### 1-shot (One example)
- **Speed:** Fast
- **Cost:** Low
- **Accuracy:** Better than zero-shot for specific formats

### 3-5 shot (Few examples)
- **Speed:** Moderate
- **Cost:** Moderate
- **Accuracy:** Best for complex patterns

### 10+ shot (Many examples)
- **Speed:** Slower (long prompts)
- **Cost:** Higher (more tokens)
- **Accuracy:** Diminishing returns after 5-10

**Rule of Thumb:** Start with zero-shot, add examples if needed.

## Advanced Techniques

### Chain-of-Thought (CoT) Few-shot
```
Prompt:
"""
Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. 
Each can has 3 balls. How many tennis balls does he have now?
A: Roger started with 5 balls. 2 cans × 3 balls = 6 new balls. 
5 + 6 = 11 balls. Answer: 11

Q: The cafeteria had 23 apples. They used 20 to make lunch. 
They bought 6 more. How many do they have?
A: Started with 23 apples. Used 20, leaving 23 - 20 = 3 apples.
Bought 6 more, so 3 + 6 = 9 apples. Answer: 9

Q: Olivia has $23. She bought 5 bagels for $3 each. How much does she have left?
A:
"""

# Model learns to show reasoning steps
```

### Diverse Examples
```python
# Bad: All examples too similar
examples = [
    ("The cat sat", "sat"),
    ("The dog ran", "ran"),
    ("The bird flew", "flew")
]

# Good: Diverse examples
examples = [
    ("The quick brown fox jumps", "jumps"),  # Multi-word subject
    ("She sings", "sings"),                   # Pronoun subject
    ("Running fast is fun", "is")             # Gerund subject
]
```

### Contrastive Examples
```python
# Show what TO do and what NOT to do
prompt = """
Good:
Q: What's 2+2?
A: 4

Bad:
Q: What's 2+2?
A: The answer to this mathematical question...

Good:
Q: Capital of France?
A: Paris

Bad:
Q: Capital of France?
A: The capital city of France is...

Q: What's 5×5?
A:
"""

# Model learns concise style
```

## Prompt Templates

### Classification Template
```python
def few_shot_classify(examples, text):
    prompt = "Classify the text.\n\n"
    
    for ex_text, ex_label in examples:
        prompt += f'Text: "{ex_text}"\nLabel: {ex_label}\n\n'
    
    prompt += f'Text: "{text}"\nLabel:'
    
    return llm(prompt)

# Usage
examples = [
    ("I love this!", "Positive"),
    ("This is terrible", "Negative"),
]
result = few_shot_classify(examples, "It's okay")
```

### Extraction Template
```python
def few_shot_extract(examples, text):
    prompt = "Extract information:\n\n"
    
    for ex_text, ex_data in examples:
        prompt += f'Input: {ex_text}\nOutput: {json.dumps(ex_data)}\n\n'
    
    prompt += f'Input: {text}\nOutput:'
    
    return llm(prompt)
```

## Dynamic Few-shot (Retrieval-Augmented)

Instead of hard-coding examples, retrieve relevant ones:

```python
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

# Example bank
examples = [
    ("The movie was great!", "Positive"),
    ("I hate Mondays", "Negative"),
    ("It's an okay day", "Neutral"),
    # ... 1000 more examples
]

# Embed all examples
example_embeddings = model.encode([ex[0] for ex in examples])

def dynamic_few_shot(query, k=3):
    # Find most similar examples
    query_embedding = model.encode([query])[0]
    similarities = np.dot(example_embeddings, query_embedding)
    top_k_indices = np.argsort(similarities)[-k:]
    
    # Build prompt with relevant examples
    prompt = ""
    for idx in top_k_indices:
        text, label = examples[idx]
        prompt += f'Text: "{text}"\nLabel: {label}\n\n'
    
    prompt += f'Text: "{query}"\nLabel:'
    
    return llm(prompt)

# Automatically selects relevant examples for each query!
```

## Evaluation

### A/B Testing
```python
# Zero-shot
zero_shot_accuracy = 0.72

# 3-shot
three_shot_accuracy = 0.89

# 5-shot
five_shot_accuracy = 0.91

# 10-shot
ten_shot_accuracy = 0.92

# Insight: 3-5 examples provides best cost/accuracy trade-off
```

### Cost Analysis
```python
# Assume $0.03 per 1k tokens

# Zero-shot: 50 tokens/request
cost_per_request = 0.050 * 0.03 / 1000 = $0.0000015

# 5-shot: 300 tokens/request (examples add tokens)
cost_per_request = 0.300 * 0.03 / 1000 = $0.0000090

# Decrease: $0.30 → $1.80 per 200k requests
# Increase accuracy: 72% → 91%
# Often worth it!
```

## Best Practices

### 1. Example Quality > Quantity
```python
# 3 perfect examples > 10 mediocre examples
good_examples = [
    # Clear, unambiguous
    # Covers edge cases
    # Matches target distribution
]
```

### 2. Order Matters
```python
# Models are biased toward recent examples
# Put most important examples last

prompt = """
Easy example...
Medium example...
Hard example...  ← Model pays most attention here
Your query...
"""
```

### 3. Instruction + Examples
```python
# Combine explicit instructions with examples
prompt = """
You are a sentiment classifier. Output ONLY: Positive, Negative, or Neutral.

Examples:
"I love it!" → Positive
"It's terrible" → Negative
"It's okay" → Neutral

Now classify: "The product exceeded my expectations"
"""
```

### 4. Seed Examples Selection
```python
# Use stratified sampling
positive_examples = random.sample(positive_data, k=2)
negative_examples = random.sample(negative_data, k=2)
neutral_examples = random.sample(neutral_data, k=1)

examples = positive_examples + negative_examples + neutral_examples
random.shuffle(examples)  # Mix order
```

## Common Pitfalls

### 1. Example Leakage
```python
# Bad: Test example in few-shot prompt!
test_text = "The movie was great"
prompt = f"""
"The product is awesome" → Positive
"The movie was great" → Positive  ← LEAK!
"It's broken" → Negative

Classify: "{test_text}"
"""
```

### 2. Label Imbalance
```python
# Bad: All examples are positive
examples = [
    ("Great!", "Positive"),
    ("Love it!", "Positive"),
    ("Amazing!", "Positive"),
]

# Model becomes biased toward "Positive"
```

### 3. Example Ambiguity
```python
# Bad: Ambiguous examples
"It's fine" → Positive  # Really? Or Neutral?
"Not bad" → Negative    # Double negative!
```

## Zero-shot vs Few-shot Decision Tree

```
Can you describe the task clearly in words?
├─ YES → Try zero-shot first
│   └─ Works well? → Done!
│   └─ Doesn't work → Add few-shot examples
└─ NO (complex pattern/format)
    └─ Start with few-shot (3-5 examples)
```

## Real-World Applications

### Customer Support Classification
```python
# 5-shot for ticket routing
examples = [
    ("My package hasn't arrived", "Shipping"),
    ("I can't log in", "Account"),
    ("Refund request", "Billing"),
    ("Product is defective", "Returns"),
    ("How do I use feature X?", "Technical Support")
]
```

### Code Generation
```python
# 2-3 examples of desired code style
examples = """
# Convert Celsius to Fahrenheit
def c_to_f(celsius):
    return celsius * 9/5 + 32

# Convert Fahrenheit to Celsius  
def f_to_c(fahrenheit):
    return (fahrenheit - 32) * 5/9

# Convert kilometers to miles
def km_to_miles(km):
"""
# Model learns function naming, docstring style, formula patterns
```

## Further Reading

- [GPT-3 Paper (Brown et al.)](https://arxiv.org/abs/2005.14165) - Introduced few-shot learning
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)

## Conclusion

Few-shot prompting is the fastest way to adapt LLMs to new tasks without fine-tuning. By providing a handful of examples, you can teach the model your desired output format, reasoning style, or classification logic in seconds. Start with zero-shot for simple tasks, add examples when needed, and use 3-5 carefully chosen examples for best results. Dynamic few-shot (retrieval-augmented) represents the cutting edge, automatically selecting relevant examples for each query.
