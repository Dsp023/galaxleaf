---
title: Batch vs Streaming
description: Moving data: in chunks or real-time?
category: Data Engineering
---

# Batch vs Streaming

## Batch Processing
Processing a large volume of data all at once, typically on a schedule (e.g., every night at 2 AM).
-   **How:** "Take all the sales logs from yesterday and calculate the daily revenue."
-   **Tools:** Apache Spark (Batch mode), Hadoop MapReduce, dbt.
-   **Pros:** Efficient for large historical analysis. Simple to manage.
-   **Cons:** Data is always stale (latency of hours or days).

## Streaming Processing
Processing data individually as it arrives, in real-time.
-   **How:** "Every time a sale happens, update the revenue dashboard immediately."
-   **Tools:** Apache Kafka, Apache Flink, Spark Streaming.
-   **Pros:** Instant insights. Critical for fraud detection or stock trading.
-   **Cons:** Technically complex. Handling out-of-order events or failures is hard.
