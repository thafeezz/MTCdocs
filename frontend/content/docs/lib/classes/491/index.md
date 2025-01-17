---
title: EECS 491
author: Talha Hafeez
---

# {%$frontmatter.title%}

> by {%$frontmatter.author%}

## Intro

Distributed systems, what are they, why are they important, and how they work.

### Course logistics

I took 491 FA24 with B. Noble, class was taught fully in Go. 491 takes a lot of resources from other Dist. Sys. classes from UIUC, UCB, and other schools. 491 was graded on a straight scale (no curve). 482 was a pre-req for this class up until FA24, later semesters will not require 482 unless Noble decides otherwise. I would however recommend taking 482, this class becomes much easier if you have seen and become familiar with ideas of concurrency.

**Exams**  
Midterm (10%)  
Final (15%)

Noble has a very different style for exams. You probably will not write any code, you will only write explanations to problems that test critical concepts in the class, like linearizability, CAP theorem, PACELC, TrueTime, etc. DO NOT expect exams to be like previous classes.

**Projects (4)**  
P1 is a project dedicated to help you get familiar with Golang (all projects are in Go).
P2-4 build on top of each other, its important to understand the fundamentals and the problems you solve with each.

{%alert %}Noble also played with the idea of changing P4 to a project about eventual consistency, so that may or may not change in the future.{%/alert%}

A quick summary:

P1: MapReduce (similar to [485](/docs/lib/classes/485) P4 but in Go)  
P2: Distributed, replicated KV store with primary-backup replication (1 fault tolerant)  
P3: Distributed, replicated KV store with Paxos consensus (`n` fault tolerant)  
P4: Distributed, replicated, shared KV store with Paxos consensus (`n` fault tolerant)

The tip for projects is to start early and spend more time thinking instead of coding. DO NOT START CODING UNTIL YOU UNDERSTAND WHAT YOU ARE DOING. You will usually write less than 100 lines of code (excluding starter code). I found some parts of the spec to be a little confusing, and spent a lot of time writing the wrong functionality for Paxos, for example. It's fairly easy to get an 80% on the projects, the last few test cases are really time consuming and tough to get, but they are worth at least 10% of the project grade. I would highly recommend getting an 80% ASAP, then spending your remaining time working on the last test cases. If you get a 100 on all projects, you already have a 75%, which is a C/C+. So even if you do poorly on both exams, you will get a B if you do really well on the projects.

Noble uses what he calls projects "mastery", which means you can get full credit on projects up until the deadline. After the deadline, you can continue to work on the project to reach an 80% max score.

## Content

I took notes on the entire class and core concepts starting from the fundamentals for the final. You can find my notes [here](/docs/lib/classes/491/notes).
