---
title: REST vs GraphQL
description: Two ways to talk to servers.
category: Core Concepts (Backend)
---

# REST vs GraphQL

## REST (Representational State Transfer)
The traditional, resource-based approach.
- **Structure:** Multiple endpoints, each representing a resource (e.g., `GET /users`, `GET /users/1`, `GET /posts`).
- **Pros:**
  - Simple, standardized (uses HTTP verbs like GET, POST, PUT, DELETE).
  - Highly cacheable (CDN friendly).
  - Decoupled client and server.
- **Cons:**
  - **Over-fetching:** Getting user data might also return their address, age, and phone when you only needed their name.
  - **Under-fetching:** To get a user AND their posts, you typically need to make two requests (`/users/1` and `/users/1/posts`).

## GraphQL
The query-language approach developed by Facebook.
- **Structure:** Single endpoint (`/graphql`). You send a query describing exactly what you want.
- **Example:**
```graphql
query {
  user(id: "1") {
    name
    posts {
      title
    }
  }
}
```
- **Pros:**
  - **Exact fetching:** You get exactly the data you asked for, no more, no less.
  - **Single Request:** Get nested resources in one go.
  - **Strongly Typed:** The schema defines exactly what's available.
- **Cons:**
  - **Complexity:** Harder to set up and maintain.
  - **Caching:** Harder to cache at the network/CDN level because everything is a POST request to the same URL.
  - **Performance:** Complex nested queries can kill database performance (the N+1 problem).

## When to use which?
- **REST:** Public APIs, simple apps, high caching needs.
- **GraphQL:** Complex data relationships, mobile apps (where bandwidth is precious), internal APIs where UI needs evolve fast.
