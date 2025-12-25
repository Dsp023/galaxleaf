---
title: ETL vs ELT
description: Data pipelines explained.
category: Data Engineering
---

# ETL vs ELT

## ETL (Extract, Transform, Load)
The traditional approach, often used with Data Warehouses like Oracle or old-school setups.
1.  **Extract:** Pull data from sources (APIs, logs, SQL DBs).
2.  **Transform:** Clean, aggregate, and mask data into a rigid schema on a separate processing server.
3.  **Load:** Save the clean data into the target Data Warehouse.
-   **Pros:** Only clean data enters the warehouse (storage efficient).
-   **Cons:** Slow. Changing the transformation logic requires re-running the whole pipeline.

## ELT (Extract, Load, Transform)
The modern cloud-native approach (Snowflake, BigQuery, Redshift).
1.  **Extract:** Pull data.
2.  **Load:** Dump the raw data *directly* into the Data Warehouse (Data Lake) immediately.
3.  **Transform:** Use the power of the Warehouse (SQL) to transform data on-demand.
-   **Pros:** Faster ingest. Raw data is always available if you made a mistake in transformation. Separation of storage and compute makes this cheap.
-   **Cons:** Requires powerful cloud warehouses.
