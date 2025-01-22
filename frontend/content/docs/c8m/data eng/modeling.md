---
title: Data Modeling
author: Talha Hafeez
---

# {% $frontmatter.title %}

> by {% $frontmatter.author %}

{%alert%} WIP {%/alert%}

Consider a transactions table, if we store all data in a transaction in a single table, we call this a denormalized table.
What are the problems with this? Image if one customer makes multiple transactions, as is often the case. This means we will have data repeated for a customer.

We would prefer our data to be normalized, and our customer information to stored in a separate table with PK/FK relationships to avoid data duplication.

So for example, we have a table of customers with `customer_id`s, a table of items with `item_id`s, and a transactions table that contains both the `customer_id` and `item_id` as references.
Now we don't store multiple records of customer or item info in the `transactions` table, we just store 1 record of the IDs.

In this example, the `transactions` table is a FACT table, where the other tables that explain the transaction, such as `customers` and `items`, are called DIMENSIONS.

Dimension tables often don't change at the same frequency as the fact table. Think about in the above example, more transactions occur than changes to a specific product.

Dimension tables can also have dimension tables, this is referred to a snowflake schema.
