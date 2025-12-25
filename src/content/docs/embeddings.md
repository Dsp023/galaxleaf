---
title: Embeddings
description: Representing meaning as vectors.
category: Embeddings & RAG
---

# Embeddings: The Vector Representation of Meaning

## What Are Embeddings?

**Embeddings** transform discrete data (words, images, users) into continuous vector representations that capture semantic meaning.

### The Problem
```python
# Words are discrete symbols
"king" = word_id_5234
"queen" = word_id_8901

# How do we represent that king and queen are related?
# Symbolic representation has no notion of similarity
```

### The Solution
```python
# Embeddings map to continuous vectors
"king"  → [0.2, 0.5, 0.1, -0.3, ...]  # 300 dimensions
"queen" → [0.3, 0.4, 0.2, -0.2, ...]

# Vectors close in space = semantically similar!
distance(king, queen) = 0.15  # Close!
distance(king, car) = 0.89    # Far apart
```

## Word Embeddings

### Word2Vec (2013)

Two architectures:

#### 1. CBOW (Continuous Bag of Words)
Predict word from context:
```
Input: "The cat sat on the ___"
Output: "mat" (predict center word from surrounding words)
```

#### 2. Skip-gram
Predict context from word:
```
Input: "mat"
Output: ["the", "cat", "sat", "on", "the"] (predict context from center word)
```

### Implementation Concept
```python
import numpy as np

class Word2Vec:
    def __init__(self, vocab_size, embedding_dim=300):
        # Embedding matrix: vocab_size × embedding_dim
        self.embeddings = np.random.randn(vocab_size, embedding_dim)
    
    def forward(self, word_idx, context_indices):
        # Get word vector
        word_vec = self.embeddings[word_idx]
        
        # Get context vectors
        context_vecs = self.embeddings[context_indices]
        
        # Dot product similarity
        scores = np.dot(context_vecs, word_vec)
        
        # Softmax to get probabilities
        probs = np.exp(scores) / np.sum(np.exp(scores))
        
        return probs
```

### The Magic: Vector Arithmetic

Famous example:
```python
king - man + woman ≈ queen

# In vector space:
[0.2, 0.5, ...] - [0.1, 0.3, ...] + [0.15, 0.35, ...] 
≈ [0.3, 0.4, ...]  # Close to queen's vector!
```

More examples:
```
paris - france + germany ≈ berlin
walking - walk + swim ≈ swimming
```

### GloVe (Global Vectors)
```python
# Co-occurrence matrix approach
# Count how often words appear together in corpus
# Factorize matrix to get embeddings

# Pre-trained GloVe vectors (50d, 100d, 200d, 300d)
from gensim.models import KeyedVectors
glove = KeyedVectors.load_word2vec_format('glove.6B.100d.txt')

print(glove.most_similar('king'))
# [('queen', 0.85), ('monarch', 0.79), ('prince', 0.76), ...]
```

## Sentence & Document Embeddings

### Averaging Word Vectors (Naive)
```python
def sentence_embedding(sentence, word_vectors):
    words = sentence.split()
    vectors = [word_vectors[w] for w in words if w in word_vectors]
    return np.mean(vectors, axis=0)

# Works okay for simple cases
# But loses word order and context
```

### Sentence-BERT (Better)
```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

sentences = [
    "The cat sat on the mat",
    "The dog rested on the rug",
    "I love programming in Python"
]

embeddings = model.encode(sentences)
# Shape: (3, 384) - 3 sentences, 384-dim vectors

# Compute similarity
from sklearn.metrics.pairwise import cosine_similarity
sim = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
print(f"Similarity: {sim:.3f}")  # 0.65 (pretty similar!)
```

## Modern LLM Embeddings

### OpenAI Embeddings
```python
import openai

response = openai.Embedding.create(
    model="text-embedding-3-small",  # 1536 dimensions
    input="Your text here"
)

embedding = response['data'][0]['embedding']
# [0.002, -0.015, 0.008, ..., 0.001]  # 1536 floats
```

**Pricing:** $0.02 per 1M tokens (very cheap!)

### Use Case: Semantic Search
```python
# 1. Embed all documents
docs = ["Python is great", "JavaScript is awesome", "I love coding"]
doc_embeddings = [model.encode(doc) for doc in docs]

# 2. Embed query
query = "Programming languages"
query_embedding = model.encode(query)

# 3. Find most similar
similarities = [
    cosine_similarity([query_embedding], [emb])[0][0]
    for emb in doc_embeddings
]

# Results: [0.75, 0.71, 0.53]
# "Python is great" is most relevant!
```

## Image Embeddings

### CLIP (OpenAI)
```python
# Embedsimages AND text in same space!
from transformers import CLIPProcessor, CLIPModel

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# Image
image = Image.open("cat.jpg")
image_embedding = model.get_image_features(
    **processor(images=image, return_tensors="pt")
)

# Text
text_embedding = model.get_text_features(
    **processor(text=["a photo of a cat"], return_tensors="pt")
)

# Similarity
similarity = cosine_similarity(image_embedding, text_embedding)
# High correlation = image matches text!
```

**Use Cases:**
- Image search by text description
- Zero-shot image classification
- Visual question answering

## Vector Databases

Storing and searching billions of embeddings:

### Pinecone
```python
import pinecone

pinecone.init(api_key="your-key")
index = pinecone.Index("my-index")

# Upsert vectors
index.upsert(vectors=[
    ("doc1", embedding1, {"text": "Python tutorial"}),
    ("doc2", embedding2, {"text": "JavaScript guide"}),
])

# Query
results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True
)
```

### pgvector (PostgreSQL Extension)
```sql
-- Create table with vector column
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding VECTOR(1536)
);

-- Insert
INSERT INTO documents (content, embedding)
VALUES ('Hello world', '[0.1, 0.2, ..., 0.5]');

-- Search nearest neighbors
SELECT content
FROM documents
ORDER BY embedding <-> '[0.15, 0.23, ..., 0.48]'
LIMIT 5;
```

## Dimensionality

Trade-offs:

| Dimensions | Pros | Cons |
|------------|------|------|
| 50-100 | Fast, small storage | Less expressive |
| 300-768 | Good balance | Standard choice |
| 1536-3072 | Highest quality | Slow, expensive |

**Dimensionality Reduction:**
```python
from sklearn.decomposition import PCA

# Reduce 1536 → 256
pca = PCA(n_components=256)
reduced = pca.fit_transform(embeddings)

# Faster search, ~90% of information retained
```

## Fine-Tuning Embeddings

```python
from sentence_transformers import SentenceTransformer, InputExample, losses
from torch.utils.data import DataLoader

model = SentenceTransformer('all-MiniLM-L6-v2')

# Training data: (sentence1, sentence2, similarity_score)
train_examples = [
    InputExample(texts=['Python programming', 'Coding in Python'], label=0.9),
    InputExample(texts=['Python programming', 'Cooking recipes'], label=0.1),
]

train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=16)
train_loss = losses.CosineSimilarityLoss(model)

model.fit(
    train_objectives=[(train_dataloader, train_loss)],
    epochs=10
)
```

**When to fine-tune:**
- Domain-specific language (medical, legal)
- Company-specific terminology
- Better retrieval for your use case

## Evaluation

### Intrinsic
```python
# Word similarity tasks
# "king" and "queen" should have high similarity

from scipy.stats import spearmanr

# Human ratings: (word1, word2, human_score)
gold = [("king", "queen", 0.85), ("king", "car", 0.02), ...]

# Model predictions
predictions = [cosine(embed[w1], embed[w2]) for w1, w2 in gold]

# Spearman correlation
correlation = spearmanr([g[2] for g in gold], predictions)
```

### Extrinsic
- Retrieval accuracy (did we find the right docs?)
- Downstream task performance (classification, QA)

## Common Pitfalls

### 1. Curse of Dimensionality
```python
# In high dimensions, all points are far apart!
# Distances become less meaningful
# Use approximate nearest neighbors (ANN)
```

### 2. Out-of-Vocabulary Words
```python
# Word not in training data → no embedding
# Solution: Subword embeddings (BPE, WordPiece)
"antidisestablishmentarianism" → ["anti", "dis", "establish", ...]
```

### 3. Context Independence (Word2Vec/GloVe)
```python
# "bank" has one embedding
# But "river bank" vs "savings bank" are different!
# Solution: Contextual embeddings (BERT, GPT)
```

## Contextual Embeddings (BERT)

```python
from transformers import BertTokenizer, BertModel

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Same word, different contexts
text1 = "I went to the bank to deposit money"
text2 = "I sat by the river bank"

inputs1 = tokenizer(text1, return_tensors="pt")
inputs2 = tokenizer(text2, return_tensors="pt")

# Get embeddings
outputs1 = model(**inputs1)
outputs2 = model(**inputs2)

# "bank" has DIFFERENT embeddings in each context!
```

## Further Reading

- [Word2Vec Paper](https://arxiv.org/abs/1301.3781)
- [Illustrated Word2Vec](http://jalammar.github.io/illustrated-word2vec/)
- [Sentence-BERT](https://www.sbert.net/)
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)

## Conclusion

Embeddings are the foundation of modern NLP and multimodal AI. They transform discrete symbols into continuous vectors that capture meaning, enabling similarity search, semantic understanding, and transfer learning. From Word2Vec's vector arithmetic to BERT's contextual representations to CLIP's unified image-text space, embeddings have revolutionized how machines understand the world.
