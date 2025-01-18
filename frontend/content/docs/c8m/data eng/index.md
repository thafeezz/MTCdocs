---
title: Data Engineering
author: Talha Hafeez
---

# {% $frontmatter.title %}

> by {% $frontmatter.author %}

{%alert%} WIP {%/alert%}

## Intro

Data is generated, stored, and consumed in millions of different ways. We have millions of data sources, resulting in billions of rows of data. This data is stored because it has a use, a business use specifically.

Businesses need to use the data they collect to analyze, predict, and act based on their data. For example, what are consumption trends for our products in Q1-Q3? What items are popular, who is buying them? Which regions have stopped buying them? Is there a correlation between the trends in this data? Etc.

The point is, businesses need data, others need to analyze this data and generate reports (data scientists). But when we have such high volume and throughput of data, we must be able to build infrastructure that supports its collection, cleaning, normalization, storage, etc. We need to format the data in a manner that makes it easy for the person above us to do their job (as is with all kinds of engineering).

## Where did we come from, where are we now?

Let's examine the previous attempts to solve this problem, as well as the current solutions. We will specifically look at the solution, its flaws, its successes, and how the next iteration improved on the previous.

### Traditional DBs (1970s-1990s)

**Problem**: Businesses have data, too much data, too much paper. Paper records are error prone due to the human element. Data needs to be consistent and reliable, and allow multiple access.  
**Solution**: Relational Database Management System (RDBMS)

Key successes:

1. SQL (structured query language)
   - Standardized and declarative (what I want, not how will I get it) way to interface with data
2. ACID properties (atomicity, consistency, isolation, durability)
   - Atomicity: operations happen or they don't, no partial updates. If I want to update 40 rows, I expect all 40 rows to either be updated, or if it fails, for none of them to be updated. Anything different breaks the user's expectation and is non-deterministic.
   - Consistency: data invariants should hold true before and after transactions. The term "consistency" in ACID is not to be confused with the term "consistency" in distributed systems and the CAP theorem, though both ideas apply to databases.
   - Isolation: transactions should not interfere with one another. The intermediate state of a transaction must NEVER be visible to other concurrent transactions. 2 transactions hit a database at the same time, one updates rows, another reads rows. There are only 2 outcomes, I update and then read, or I read then update (strict isolation).
   - Durability: changes that are committed persist even if the system fails.
3. Structured data storage
   - Allowed for data modeling with tables and relationships between types

Oracle Database, Miscrosoft SQL Server, IBM DB2 are examples of some popular RDBMS systems. It's important to keep in mind that these RDBMSs were designed to run on centralized, powerful machines—so less users, less data. This makes sense, because tt the time, businesses generated a much lower volume of data, making single server or small clusters of RDBMSs suffice for data storage. Most business data was also structured, meaning it could fit neatly into the schemas defined in RDBMSs.

Key issues:

1. Vertical scaling
   - Machines can only have so much RAM and disk space (hardware constraints). A single server imposed physical limits on how much data we can store on the hardware the machine could support.
2. Queries slow down and block operational systems
3. Data types
   - Only supported structured data. How can we store images, media, other unstructured data? Schemas were immutable, how can we evolve our schema while maintaining performant queries?
4. Backup, recovery was challenging. Replication was complicated. Keeping the system available was expensive.

To summarize, traditional RDBMSs excelled with smaller volumes of data because business produced and stored less data. However, they were not able to struggly distributed workloads, large amounts of data, large scale analytics, etc.

Data warehouses solves some of these issues.

### Data warehouses (1990s-2000s)

**Problem**: Business start having more complex reporting requirements, different data formats, historical data analysis. Slow analytical queries didn't help either.

Why were queries slow? Because traditional RDBMSs are optimized for for transactional workloads, frequent but small R/W, not analytic workloads. Analytic workloads require large reads, complex joins, and aggregations.

**Solution**: Separation of concerns. Operational systems (OLTP - online transaction processing) and analytical systems (OLAP - online analytics processing).

### Big Data (2000s-2010s)

Distributed storage (scale out, not up). Use commodity hardware, replicate and shard your data across it and make the system function with failures.

### Data in the Cloud (2010s-Present)
