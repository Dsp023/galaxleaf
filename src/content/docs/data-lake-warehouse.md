---
title: Data Lake vs Data Warehouse
description: Where does the data live?
category: Data Engineering
---

# Data Lake vs Data Warehouse

## Data Warehouse
A repository of **structured, filtered data** that has been processed for a specific purpose.
-   **Structure:** Schema-on-write (You define the table structure before inserting).
-   **Users:** Business Analysts using BI tools (Tableau, Looker).
-   **Tech:** Snowflake, Google BigQuery, Amazon Redshift.
-   **Analogy:** A neat library where every book is cataloged.

## Data Lake
A centralized repository that stores all **structured and unstructured data** at any scale.
-   **Structure:** Schema-on-read (Just dump raw JSON, CSV, logs, images; figure out the structure later).
-   **Users:** Data Scientists, ML Engineers.
-   **Tech:** Amazon S3, Azure Data Lake, Hadoop HDFS.
-   **Analogy:** A giant dumping ground or a "lake" where streams flow in.

## The Lakehouse
A modern hybrid (promoted by Databricks) that tries to bring the structure and performance of a Warehouse to the cheap storage of a Lake.
