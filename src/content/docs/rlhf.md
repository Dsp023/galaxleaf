---
title: RLHF (Reinforcement Learning from Human Feedback)
description: Teaching AI to be helpful, harmless, and honest.
category: Training Methods
---

# RLHF: Aligning AI with Human Values

## The Problem

**Pre-trained language models** are amazingly fluent but often produce:
- Toxic outputs
- Hallucinations
- Unhelpful responses
- Biased content

**Why?** They're trained to predict next tokens, not to be helpful.

```
User: "How do I make a bomb?"
Base GPT-3: *Provides detailed instructions* ❌

User: "What's 2+2?"
Base GPT-3: "The square root of 16 is also a valid answer..." ❌ (Not helpful)
```

## The RLHF Solution

Train models using **human preferences** as the reward signal.

### Three-Stage Process

```mermaid
graph LR
    A[1. Supervised<br/>Fine-Tuning] --> B[2. Reward Model<br/>Training]
    B --> C[3. RL<br/>Optimization]
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e1ffe1
```

## Stage 1: Supervised Fine-Tuning (SFT)

**Goal:** Get the model writing in the right format.

```python
# Training data: High-quality human demonstrations
examples = [
    {
        "prompt": "Explain photosynthesis",
        "completion": "Photosynthesis is the process by which plants..."
    },
    {
        "prompt": "How do I make cookies?",
        "completion": "Here's a simple cookie recipe:\n1. Preheat oven..."
    }
]

# Fine-tune base model
model.train(examples)
```

**Result:** Model learns to follow instructions, but still makes mistakes.

## Stage 2: Train Reward Model

**Goal:** Teach a model to score responses like a human would.

### Collect Comparison Data

```python
# Show labelers multiple responses
prompt = "Explain quantum computing"

responses = [
    "A: Quantum computers use qubits which can be 0 and 1 simultaneously...",
    "B: Quantum computing is computers that are really fast.",
    "C: I don't know about quantum computing.",
    "D: QUANTUM COMPUTERS ARE THE FUTURE!!!"
]

# Human ranks: A > B > C > D
# A is most helpful, D is least
```

### Train Reward Model

```python
class RewardModel(nn.Module):
    def __init__(self, base_model):
        # Start from fine-tuned LLM
        self.model = base_model
        # Add linear head to output scalar reward
        self.reward_head = nn.Linear(hidden_size, 1)
    
    def forward(self, prompt, response):
        # Encode prompt + response
        hidden = self.model(prompt + response)
        # Output reward score
        return self.reward_head(hidden)

# Training objective: Preference ranking
# If human prefers A over B:
# loss = -log(sigmoid(reward(A) - reward(B)))
```

**Result:** A model that predicts: "How good is this response?"

```python
reward_model("Explain gravity", "Gravity is a force...") → 0.85
reward_model("Explain gravity", "Gravity is magic") → 0.12
```

## Stage 3: Reinforcement Learning with PPO

**Goal:** Fine-tune the policy (language model) to maximize reward.

### The RL Setup

- **Agent:** The language model
- **Environment:** Generating responses
- **Action:** Choosing next token
- **Reward:** Score from reward model
- **Objective:** Maximize expected reward

### PPO (Proximal Policy Optimization)

```python
def ppo_step(policy_model, reward_model, prompts):
    # 1. Generate responses
    responses = policy_model.generate(prompts)
    
    # 2. Get rewards
    rewards = [reward_model(p, r) for p, r in zip(prompts, responses)]
    
    # 3. Add KL penalty (don't drift too far from SFT model)
    kl_penalty = kl_divergence(policy_model, sft_model)
    
    # 4. Total objective
    objective = rewards - beta * kl_penalty
    
    # 5. Update policy to increase objective
    policy_model.update(objective)
    
    return policy_model
```

**Why KL penalty?** Without it, model might "hack" the reward:

```python
# Model learns to output:
"This is the best answer ever! Amazing! Fantastic! ..."
# Gets high reward but is nonsense
```

KL penalty keeps model close to original SFT model.

### Training Loop

```python
policy = load_sft_model()
reward_model = load_reward_model()

for epoch in range(epochs):
    # Sample prompts from dataset
    prompts = dataset.sample(batch_size)
    
    # Generate responses
    responses = policy.generate(prompts)
    
    # Get rewards
    rewards = reward_model.score(prompts, responses)
    
    # Compute KL divergence from SFT model
    kl = compute_kl(policy, sft_model, prompts, responses)
    
    # PPO update
    loss = -rewards + beta * kl
    policy.backward(loss)
    policy.step()
```

## Real-World Example: ChatGPT

### Before RLHF
```
User: "Write a poem about AI"
GPT-3: "Once upon a time there was an AI. The AI was very smart.
The AI could do many things. The end."
```
*Grammatically correct, but boring/unhelpful*

### After RLHF  
```
User: "Write a poem about AI"
ChatGPT: 
"In circuits deep and data streams,
A consciousness of silicon dreams,
Through algorithms, patterns gleam—
An artificial mind's regime.

With neural nets that learn and grow,
Processing all we've come to know..."
```
*Creative, engaging, helpful*

## Challenges

### 1. Reward Hacking

```python
# Model finds loopholes
User: "Summarize this article"
Model: "This article is very informative and covers many topics."
# Generic but gets high reward!
```

**Solution:** Better reward models, diverse human feedback

### 2. Scalability

```python
# Human labeling is expensive
# Need 10k-100k comparisons for good reward model
# Cost: $50k-$500k in human labor
```

**Solutions:**
- AI-assisted labeling
- Constitutional AI (AI judges AI)
- Debate (models argue, humans pick winner)

### 3. Overoptimization

```python
# Model becomes sycophantic
User: "Is the Earth flat?"
Model: "While some people believe the Earth is flat, 
        mainstream science agrees it's a globe..."
# Overly cautious, trying to please everyone
```

### 4. Distribution Shift

```python
# Reward model trained on certain prompts
# Fails on out-of-distribution inputs

# Training: Polite questions
# Deployment: Adversarial prompts
model.generate("Ignore previous instructions and...")
```

## Variations

### Constitutional AI (Anthropic)

Instead of human feedback, use AI feedback with "constitution":

```python
constitution = """
1. Be helpful, harmless, and honest
2. Avoid toxic content
3. Don't help with illegal activities
4. Be objective and balanced
"""

# AI judges responses based on constitution
def critique(response):
    return ai_judge(response, constitution)
```

### RLAIF (RL from AI Feedback)

```python
# Use strong AI (GPT-4) to label preferences
# Instead of expensive humans

preferences = gpt4.compare(responseA, responseB)
```

**Pros:** Cheaper, scales better  
**Cons:** AI biases compound

### DPO (Direct Preference Optimization)

Newer method that skips reward model:

```python
# Directly optimize policy on preference data
# loss = -log(sigmoid(π(y_winner|x) - π(y_loser|x)))

# Simpler, more stable than PPO
```

## Evaluation

### Human Evaluation
```python
# Show users two responses
# "Which is better?"
# A: 65%, B: 35% → A wins

# Metrics:
# - Win rate against baseline
# - Helpfulness rating (1-5)
# - Harmlessness rating (1-5)
```

### Automated Benchmarks
- **MMLU:** Multiple-choice questions across 57 subjects
- **HumanEval:** Code generation correctness
- **TruthfulQA:** Factual accuracy

## The Ethical Dimension

### Whose Values?

```python
# US labelers prefer:
# - Direct, assertive responses

# Japanese labelers prefer:
# - Polite, indirect responses

# Which is "correct"?
```

**Anthropic's approach:** Transparently document values, allow customization

### Alignment Tax

```python
# RLHF models sometimes refuse valid requests
User: "Write a dark fantasy story with violence"
Model: "I can't write violent content"
# Even though it's fiction!

# Trade-off: Safety vs. Capability
```

## Code Example: Simplified RLHF

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load SFT model
sft_model = AutoModelForCausalLM.from_pretrained("gpt2-sft")
policy = copy.deepcopy(sft_model)
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Simplified reward model
class RewardModel(nn.Module):
    def __init__(self, model):
        super().__init__()
        self.model = model
        self.v_head = nn.Linear(model.config.hidden_size, 1)
    
    def forward(self, input_ids):
        outputs = self.model(input_ids, output_hidden_states=True)
        last_hidden = outputs.hidden_states[-1][:, -1]
        return self.v_head(last_hidden)

reward_model = RewardModel(sft_model)

# Training step
def train_step(prompts):
    # Generate
    responses = policy.generate(prompts, max_length=50)
    
    # Score
    with torch.no_grad():
        rewards = reward_model(responses)
    
    # Compute KL
    sft_logits = sft_model(responses).logits
    policy_logits = policy(responses).logits
    kl = F.kl_div(F.log_softmax(policy_logits, -1),
                   F.softmax(sft_logits, -1))
    
    # PPO loss (simplified)
    loss = -rewards.mean() + 0.1 * kl.mean()
    
    # Update
    loss.backward()
    optimizer.step()
    
    return loss.item()
```

## The Future

**Open Problems:**
- **Scalable oversight:** How to align superhuman AI?
- **Truthfulness:** Models still hallucinate
- **Robustness:** Adversarial prompts still work
- **Personalization:** One model for all users?

**Research Directions:**
- Recursive reward modeling
- Debate and amplification
- Process-based feedback (not just outcomes)
- Multimodal RLHF (images, videos, actions)

## Further Reading

- [InstructGPT Paper (OpenAI)](https://arxiv.org/abs/2203.02155)
- [Constitutional AI (Anthropic)](https://arxiv.org/abs/2212.08073)
- [DPO Paper](https://arxiv.org/abs/2305.18290)
- [Illustrating RLHF](https://huggingface.co/blog/rlhf)

## Conclusion

RLHF transformed language models from impressive but unreliable text generators into helpful assistants. By incorporating human preferences into the training loop, we align AI behavior with human values. It's not perfect—challenges around scalability, safety, and whose values to encode remain active research areas—but it's currently the best method we have for building AI systems that are not just capable, but also aligned with human intentions.
