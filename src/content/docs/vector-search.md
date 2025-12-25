---
title: Vector Search
description: Finding things by meaning, not keywords.
category: Embeddings & RAG
---

# Vector Search

## Overview
**Vector Search** (or Semantic Search) uses embedding vectors to find items that are conceptually similar to a query. Unlike keyword search (BM25/TF-IDF), which looks for exact word matches, vector search looks for proximity in the multi-dimensional "meaning space."

## How it works
1.  **Embed:** Convert your database of text (documents) into vectors using an embedding model (e.g., OpenAI `text-embedding-3`).
2.  **Store:** Save these vectors in a Vector Database (Pinecone, Milvus, pgvector).
3.  **Query:** When a user searches, convert their query into a vector using the *same* model.
4.  **Compare:** Find the nearest neighbors (vectors closest to the query vector) using a distance metric like **Cosine Similarity** or **Euclidean Distance**.

## Approximate Nearest Neighbor (ANN)
Searching through millions of vectors exactly is slow ($O(N)$). Vector databases use ANN algorithms (like **HNSW** - Hierarchical Navigable Small World graphs) to find "close enough" matches incredibly fast ($O(\log N)$).

## Use Cases
-   **RAG:** Finding context for LLMs.
-   **Recommendation Systems:** "Show me products similar to this one."
-   **Image Search:** "Find images that look like this photo" (using image embeddings like CLIP).
