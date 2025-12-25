---
title: Chain of Thought (CoT)
description: Asking the model to "show its work".
category: Prompt Engineering
---

# Chain of Thought (CoT): Teaching AI to Reason

## The Problem

Standard prompting often fails on multi-step reasoning:

```
Prompt: "Roger has 5 tennis balls. He buys 2 cans of tennis balls. 
Each can has 3 tennis balls. How many tennis balls does he have now?"

Model: "11" ✅ (Lucky guess)
or: "8" ❌ (Wrong calculation)
```

The model jumps to an answer without showing reasoning, leading to errors.

## The Solution: Chain of Thought

Ask the model to **think step by step** before answering.

```
Prompt: "Roger has 5 tennis balls. He buys 2 cans of tennis balls. 
Each can has 3 tennis balls. How many tennis balls does he have now?
Let's think step by step"

Model:
"Step 1: Roger starts with 5 tennis balls.
Step 2: He buys 2 cans of tennis balls.
Step 3: Each can has 3 tennis balls, so 2 cans × 3 = 6 tennis balls.
Step 4: Total tennis balls = 5 + 6 = 11.
Answer: 11" ✅
```

## How It Works

### Implicit Reasoning Chain

Without CoT, the model does:
```
Input → [Hidden reasoning] → Answer
```

With CoT, we make it explicit:
```
Input → Step 1 → Step 2 → Step 3 → Answer
```

By generating intermediate steps, the model:
- Catches calculation errors
- Handles complex logic
- Provides explainable reasoning

## Types of CoT

### 1. Zero-shot CoT

Simply add "Let's think step by step" to the prompt.

```python
def zero_shot_cot(question):
    prompt = f"{question}\nLet's think step by step."
    return llm(prompt)

# Example
question = "If a shirt costs $15 and is on sale for 20% off, what's the final price?"
response = zero_shot_cot(question)

# Output:
# "Let's think step by step.
# 1. Original price: $15
# 2. Discount: 20% of $15 = $3
# 3. Final price: $15 - $3 = $12
# Answer: $12"
```

**Discovery:** This simple phrase triggers reasoning behavior!  
**Source:** [Kojima et al., "Large Language Models are Zero-Shot Reasoners"](https://arxiv.org/abs/2205.11916)

### 2. Few-shot CoT

Provide examples WITH reasoning steps.

```python
prompt = """
Q: There are 15 trees in the grove. Grove workers will plant trees today. 
After they are done, there will be 21 trees. How many did they plant?
A: There are originally 15 trees. Then there were 21 trees after some more were planted. 
So they must have planted 21 - 15 = 6 trees. The answer is 6.

Q: Cafeteria had 23 apples. They used 20 for lunch and bought 6 more. How many do they have?
A: Cafeteria started with 23 apples. They used 20, leaving 23 - 20 = 3 apples. 
Then they bought 6 more, so 3 + 6 = 9 apples. The answer is 9.

Q: Olivia has $23. She bought 5 bagels for $3 each. How much does she have left?
A:
"""

# Model learns to show work from examples
```

### 3. Self-Consistency

Generate multiple reasoning paths, pick the most common answer.

```python
def self_consistency_cot(question, n=5):
    prompt = f"{question}\nLet's think step by step."
    
    # Generate multiple responses
    responses = [llm(prompt, temperature=0.7) for _ in range(n)]
    
    # Extract final answers
    answers = [extract_answer(r) for r in responses]
    
    # Vote
    from collections import Counter
    most_common = Counter(answers).most_common(1)[0][0]
    
    return most_common

# Example outputs:
# Path 1: Answer is 11
# Path 2: Answer is 11  
# Path 3: Answer is 8 (error in reasoning)
# Path 4: Answer is 11
# Path 5: Answer is 11

# Majority vote: 11 ✅
```

**Improvement:** 5-15% accuracy boost on math/logic problems.

## Advanced Techniques

### Least-to-Most Prompting

Break complex problems into subproblems.

```python
# Step 1: Decompose
question = "What is the last letter of the word resulting from concatenating 
the second letter of 'apple' and the first letter of 'orange'?"

decomposition_prompt = f"""
Break this question into simpler steps:
{question}
"""

# Output:
# Step 1: Find the second letter of 'apple'
# Step 2: Find the first letter of 'orange'  
# Step 3: Concatenate those letters
# Step 4: Find the last letter of the result

# Step 2: Solve each step
for step in steps:
    answer = solve(step)

# Step 3: Combine
```

### Program-Aided Language Models (PAL)

Offload calculations to code.

```python
prompt = """
Q: Roger has 5 tennis balls. He buys 2 cans of 3 balls each. How many total?

# Python code to solve:
roger_balls = 5
cans_bought = 2
balls_per_can = 3
new_balls = cans_bought * balls_per_can
total = roger_balls + new_balls
print(total)

Q: Janet's ducks lay 16 eggs per day. She eats 3 for breakfast. 
She bakes muffins with 4. She sells the remainder for $2 each. 
How much does she make daily?

# Python code to solve:
"""

# Model generates code instead of natural language
# Execute code for guaranteed correct arithmetic
```

### Tree of Thoughts (ToT)

Explore multiple reasoning branches.

```
Question: "24 game: Use 4, 9, 10, 13 to make 24"

Branch 1: (13 - 9) × (10 - 4) = 4 × 6 = 24 ✅
Branch 2: (13 + 9) - (10 + 4) = 22 - 14 = 8 ❌
Branch 3: 13 × (10 - 9) + 4 = 13 × 1 + 4 = 17 ❌

Keep exploring Branch 1 variations...
```

## When CoT Helps Most

### ✅ Multi-step Reasoning
- Math word problems
- Logic puzzles
- Planning tasks

### ✅ Symbolic Manipulation
```
Q: "Reverse the letters in 'apple'"
Without CoT: "elppa" (correct by memorization)
With CoT: "a-p-p-l-e reversed is e-l-p-p-a" (actually understands)
```

### ✅ Commonsense Reasoning
```
Q: "I dropped my phone in the pool. Is it likely to still work?"
CoT: "Water damages electronics. Dropped in pool = phone got wet. 
Wet electronics usually don't work. Answer: No, unlikely to work."
```

## When CoT Doesn't Help

### ❌ Simple Factual Recall
```
Q: "What is the capital of France?"
CoT adds verbosity without benefit
```

### ❌ Very Long Chains
```
10+ step reasoning → model loses track
Solution: Break into sub-questions
```

### ❌ Tasks Requiring Specific Knowledge
```
CoT can't invent facts missing from training data
Still needs RAG or tool use
```

## Evaluation

### Benchmarks

| Benchmark | Task | Without CoT | With CoT |
|-----------|------|-------------|----------|
| GSM8K | Grade school math | 17.7% | 40.7% |
| MATH | Math problems | 6.9% | 12.5% |
| StrategyQA | Implicit reasoning | 54.4% | 65.4% |
| CommonsenseQA | Commonsense | 72.5% | 78.1% |

**Source:** [Chain-of-Thought Prompting (Wei et al.)](https://arxiv.org/abs/2201.11903)

### Human Evaluation

```python
# Judge whether reasoning is sound
def evaluate_cot_quality(response):
    criteria = {
        'logical': "Each step follows from previous",
        'complete': "No unjustified leaps",
        'accurate': "Calculations correct",
        'clear': "Easy to follow"
    }
    
    scores = {}
    for criterion, description in criteria.items():
        scores[criterion] = human_judge(response, description)
    
    return scores
```

## Implementation Tips

### 1. Prompt Engineering
```python
# Variations of "think step by step"
variations = [
    "Let's think step by step",
    "Let's solve this problem step by step",
    "Let's break this down:",
    "Let's think about this logically:",
    "Let's approach this systematically:",
]

# Test which works best for your use case
```

### 2. Answer Extraction
```python
import re

def extract_answer(cot_response):
    # Look for common patterns
    patterns = [
        r"(?:The answer is|Answer:|Therefore,)\s*(.+)",
        r"(?:Final answer:|Conclusion:)\s*(.+)",
        r"(?:Result:)\s*(.+)",
    ]
    
    for pattern in patterns:
        match = re.search(pattern, cot_response, re.IGNORECASE)
        if match:
            return match.group(1).strip()
    
    # Fallback: Return last line
    return cot_response.strip().split('\n')[-1]
```

### 3. Verification
```python
def verify_cot(question, cot_response):
    # Ask model to verify its own reasoning
    verify_prompt = f"""
    Question: {question}
    
    Proposed solution:
    {cot_response}
    
    Is this solution correct? Check each step. Answer Yes or No.
    """
    
    verification = llm(verify_prompt)
    
    if "no" in verification.lower():
        # Regenerate with different prompt or temperature
        return regenerate_cot(question)
    
    return cot_response
```

## Limitations

### 1. Hallucinated Reasoning
```
Model might invent plausible-sounding but incorrect steps
Solution: Verify with code execution (PAL) or external tools
```

### 2. Verbosity
```
CoT increases token usage 2-5x
Cost implications for production systems
```

### 3. Not Always Faithful
```
Model sometimes generates answer first, then rationalizes
Reasoning may not reflect true "thought process"
```

### 4. Inconsistent Benefit
```
Some models (GPT-4) benefit more than others (small models)
Test on your specific model + task
```

## Production Considerations

### Cost Optimization
```python
# Hybrid approach
def smart_cot(question, difficulty_threshold=0.7):
    # Classify question difficulty
    difficulty = classify_difficulty(question)
    
    if difficulty < difficulty_threshold:
        # Simple question: Direct answer (cheap)
        return llm(question)
    else:
        # Complex: Use CoT (expensive but accurate)
        return llm(f"{question}\nLet's think step by step.")
```

### Caching
```python
# Cache CoT responses for common questions
from functools import lru_cache

@lru_cache(maxsize=1000)
def cached_cot(question):
    return llm(f"{question}\nLet's think step by step.")
```

## Further Reading

- [Chain-of-Thought Paper (Wei et al.)](https://arxiv.org/abs/2201.11903)
- [Self-Consistency Paper](https://arxiv.org/abs/2203.11171)
- [Tree of Thoughts](https://arxiv.org/abs/2305.10601)
- [Program-Aided Models](https://arxiv.org/abs/2211.10435)

## Conclusion

Chain-of-Thought prompting is one of the most impactful techniques in prompt engineering. By asking models to "think step by step," we unlock significantly better performance on reasoning tasks—often improving accuracy by 20-50% on math and logic problems. While it increases token costs and doesn't help all tasks, CoT has become essential for applications requiring multi-step reasoning, from educational tutors to code assistants to research tools. The key is knowing when to use it: complex reasoning = CoT, simple recall = skip it.
