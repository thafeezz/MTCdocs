---
title: EECS 491 Notes
author: Talha Hafeez
---

# {%$frontmatter.title%}

> by {%$frontmatter.author%}

{% note %} These are the notes I took before the final to cover my understanding of all concepts. Use these notes as an intro to distributed systems or to go over content before your exams.{%/note%}

{%alert%} Below is a high level description of the problems of distributed systems, their solutions, and the intuitions behind the problems and solutions
do not use as a source of truth, rather use to understand basics of distributed systems. {%/alert%}

## overview

why do we distribute our system across multiple machines

1. if we have 1 machine in US, a client in china has higher latency than a client in US
   1. so put another machine in china, chinese clients read from chinese node, US clients read from US node
2. what if a node stores a video and that video goes viral
   1. every starts accessing that node, it will run out of memory and crash
      1. single point of failure, now no one can get the video
3. cheaper to have lot of commodity hardware that can fail, and then just design the system to be fault tolerant

ok, this sounds simple, but whats the catch?

how do 2 machines that are geographically separated stay in sync?

- reads dont matter, bc we arent changing the state, what makes a difference is a write
- the only way we can sync machines is thru msgs, which have a non-negligible delay
  - problem is we dont even know if our request to sync data reached the other machine
  - maybe it did and we didnt hear back
  - maybe our msg didnt even make it
  - lets say our msg made it, it couldve taken longer than we expected, and another msg arrived and was committed first
    - but we sent ours first, and another write was committed before us, so who is first?
    - we have no one in our system who can say A went before B, so we have to allow the system to order these events that arrive concurrently
- now who should send these sync msgs?
  - the client?
    - well if the client sent a sync msg, and it was committed but the response from the machine didnt make it back
      - the client would have to sit there and resend the msg until it is synced, which could take forever
      - we cant not sync, otherwise we risk the correctness of the system
    - we wouldnt want the client of our system to sit there and wait for our system to be synced, we should let the system handle it internally
  - the system?
    - this makes more sense, but how tf we do that?
    - we have a few kinds of replication schemes
      - primary/backup replication, with $n$ backups
      - consensus protocols
        - we focus on the paxos family of distributed consensus protocols

overall, to goal is to make sure we can keep our $n$ machines across the world in sync

- while allowing concurrent requests
- while knowing machines can fail at any time
- while having non-negligible network delay
- while maintaining a system wide ordering of events
  - without using time

## note on patterns

before continuing, we will notice some common patterns in distributed systems

- having a “leader/boss/master” server makes everything easier, bc we can use it as a point of reference
  - we can allow it to order concurrent events, and all “subordinate/slave” servers must ensure their state of the data is equal to the state after replaying all concurrent events in the order defined by the master
  - problem with this is its a single point of failure
    - how about we just replicate the master servers!!!
      - great idea we will see later that consensus protocols allow us to do this
        - leader paxos specifically uses this idea
      - we will also see that this leads to the issue of, within the cluster of master servers, how do we agree on an ordering of events across those servers
        - keep reading
- we cant use time to order events
  - unless we control everything about the network
    - Google Spanner’s TrueTime API
  - what is the definition of a second?
    - **"the scientific definition of a second, which is based on the specific frequency of radiation emitted by a cesium-133 atom”**
  - clocks have a drift
    - tf this mean?
      - look at the clock on ur computer and the clock on ur phone, they are most likely not synced to the EXACT same nano micro whatever second
      - they are off my some amount
- make NO ASSUMPTIONS about whether or not an event has been committed
  - the msg could have been received by the server, the msg could have not made it to the server, or the msg made it to the server, was committed, and the response didnt make it back to the client
    - we just assume it didnt fail, theres literally no way for us to tell what happened, so we assume the worst and try the request again
      - the only way we would know is if we were an omniscient observer, which we arent
- different systems have different requirements
  - some systems can get away with have a weaker consistency model, or using lamport clocks to order events because causality is all we care about
    - social media
  - others need strong consistency guarantees, and ordering must always be consistent and correct
    - imagine a bank

## ordering events

wait, why cant we use time to say that event A happened at 12:00 pm, event B happened at 12:02 pm, so event A happens-before event B

- consider the following
  - event A is sent from client A at 11:57 am
  - event B is sent from client B at 11:58 am
    - whats the problem here?
      - client B (which is an actual machine) uses its own sense of time as its reference
      - client A uses its own sense of time as its reference
    - why is this a problem
      - clock drift, see above
  - server receives event B at 12:02 pm and event A at 12:04 pm, but A was sent first
    - well A was sent first according to A’s sense of time (the clock on computer A)
    - B was sent second according to B’s sense of time (the clock on computer B)
    - but B was received first according to B’s sense of time, so it must happen before A
      - see what the issue is?
        - we are comparing the times of 3 different machines to each other, but those times themselves are not equivalent
          - why arent they equivalent? clock drift
  - according to the server, B happens before A, bc the server has no clue about when each client request was sent
    - why cant we just timestamp the client requests?
      - see the issue with this?
        - client A timestamps request A with the time on machine A
        - client B timestamps request B with the time on machine B
        - server receives request A and B eventually, but then server will compare request A timestamp and request B timestamp
          - again this is an invalid comparison, see clock drift explanation
  - lets assume A was ACTUALLY SENT before B, then why was B received first?
    - network delay
      - we cant control network delay unless we own the wires connecting the machines that are communicating
        - when can this ever be possible? in a data center
- what if syncd up our clocks?
  - use satellites, but that wont work indoors and its expensive
  - cristian’s algorithm
    ![image.png](/images/docs/lib/classes/491/cristian.png)
    - 1 central timeserver
    - client sends request to timeserver with its local time $T_1$, begins measuring round trip time
    - timeserver stamps request with its local time $T_2$
    - timeserver sends response with its local time $T_3$ and $T_2$
    - client timestamps response with $T_4$

### lamport and vector clocks

so we’ve established that we cant use time to order events, but do we even need it?

- as long as our events are ordered, and the server sets that order and sticks to it, we should be good
- if we can say that event $A$ happens-before event $B$
  - then we can order these events in this way
- intro the idea of Lamport clocks (logical clocks)
  ![image.png](/images/docs/lib/classes/491/lamport.png)
  - we have 3 processes $P1$, $P2$, $P3$
    - they all have their own local time $C$
    - the diagram above is pretty self explanatory
      - processes send their $C$ value to other processes
      - the receiving processes with take the max of their clock and the clock of the sender and add 1
        - this guarantees that msgs have some ordering
- lamport clocks dont capture time, they capture causality (happens-before relationships)
  - they only provide local ordering per process
    - notice how we can say $C(a)=1$ on $P1$ happens after $C(d) = 1$ on $P3$ in the above diagram
      - we can just see that event $a$ is drawn slightly after $d$, but the Lamport clock doesnt know that
      - in this sense, the clock fails to provide a total ordering of event across all nodes in the system
        - unless we break ties by PIDs (process IDs)
          - this wont address the concurrency issue
  - as described above, since lamport clocks assign scalar values to events
    - they cant distinguish between truly concurrent events, and events with the same $C$ value
      - $C(a) = C(d) = 1$ does not mean these events are concurrent, or even related, in the above pic
        - it just means that these were the first events on each individual process $P1$ and $P3$
  - what does accomplish this?
    - vector clocks
- vector clocks are a vector of lamport clocks
  - where $len(V) = \text{\# of processes}$ and $V[i]=P_i$, where $i$ is an index and $P$ is a process
    ![image.png](/images/docs/lib/classes/491/vector-clock.png)
  - a local event on for $P_i$ has its clock incremented
  - when a vector clock is received
    - take the element-wise max of the local vector clock and the one sent in the msg
    - then increment the local clock
  - vector clocks allow us to determine if events are causally concurrent
    ![image.png](/images/docs/lib/classes/491/gpt-vector-explanation.png)

can we use logical/vector clocks in a real system?

- yes, but problem occurs when a single node is down
  - since these clocks rely on communication between all other nodes in order to synchronize clocks
  - if one server is down, we are stuck
- consensus protocols used to agree on orderings of values are generally more robust

## linearizability

the idea of linearizability is simple

- the client should be oblivious to the fact that there are multiple copies of the data
  - example
    - if client A writes value “abc” to key “a”
    - then client A reads key “a”
      - they would expect to get back “abc”
  - this sounds trivial, but when you consider an unreliable network, it becomes more difficult than it seems
    - need to think carefully about what requests to serve
      - if there is a possibility that there is some stale data, need to reject the request and have the client retry
- there exists a total ordering of writes in the system, and any subsequent reads will reflect the latest committed write
- when thinking about linearizability
  - we must consider the exact point at which an event HAPPENS
    - bc of our unreliable network model, we dont know when that is
      - does the event happen when its sent? received?
    - so we assume the worst
  - consider a client request
    - the server receives the request, but we have no clue when the client will receive our response
      - namely, we cant guarantee a specific transmission time bc of unreliable network conditions
      - so we conservatively assume that the instant we send our response, the client has seen it
    - the point at which the server sends the response to a request is the point at which that event is **externalized**
  - the server has the ability to order **CONCURRENT** operations in whatever order it wants since it receives events concurrently
    - whats important is that once an write is externalized, all later reads must reflect that right in order for the system to be linearizable
  - events that are causally related, eg write A happens-before read B
    - must be ordered as such bc there is a happens-before relationship
      - in projects, we guarantee this order by serializing our operations
      - in the real world, systems use some combination of logical/vector clocks, or hybrid clocks

## consistency spectrum

- linearizability is the strongest kind of consistency, and is generally preferred by application programmers bc its easier to reason about
- if you weaken the consistency model, you push more logic out of the server and into the hands of the client
  - in eventual consistency, the client must resolve any reads that are stale, even if theyd expect the read to reflect the latest write
    - this will happen _eventually_, hence eventual consistency
- the tradeoff is as follows
  ![image.png](/images/docs/lib/classes/491/consistency-spectrum.png)
  - there is an inverse relationship btwn consistency and latency
    - takes more time for all servers to agree on their replicated state
  - and a direct relationship btwn consistency and programming model simplicity
    - stronger consistency, easier for application developer to reason about
      - bc when they read after a write, they get the value they would expect
        - remember, this may seem trivial, but your write might go to node A, and your read might go to node B
        - so a linearizability will not allow you to see the stale value, and will guarantee you see the correct value as you would expect
    - surprisingly, as seen in the reasoning as to why Google built Spanner, application programmer much prefer consistency over speed
      - theyd rather have some deterministic output that reflects their reasoning than a faster application

a quick note on safety vs liveness

- safety → the system will never reach an undesirable state
- liveness → the system will always make progress, eventually
- these are desirable properties of any system
  - FLP impossibility result
    - a system is either safe, or live, never both

## replication schemes

now we move on to the different schemes we can use to replicate state across multiple machines

### primary/backup

project 2

- $n$ backups means can tolerate $n$ failures
- this scheme uses view service that knows the state of the system at all times
  - it sends pings to the primary and backup server(s) to see if theyre alive
  - if a ping is missed, then the view will advance and the current backup is promoted to primary and an idle server is made the backup
    - when a new backup is promoted it should receive a copy of the data from the primary
    - any writes to the data on the primary are pushed to the backup
- P/B shortcomings
  - primary is the only machine that serves read and write requests
    - and the primary is in one spot, so it cant be close to everyone
    - so we have the issue of geographic separation
      - we want servers to be close to ppl so that latency is lower
  - low availability
    - if primary is down, or backup is being bootstrapped, our requests cant be processed in order to maintain linearizability
  - view service single point of failure
    - lets just replicate the view service!
      - how? by using primary backup replication for the view service!
        - but then we need a viewservice for the viewservice
      - now we are going in circles, how do we synchronize all copies of the view service?
        - intro paxos consensus

### paxos

project 3

- we have a cluster of nodes that agree on events and the order in which they happen using a log (multi-paxos)
- we are $f$-fault tolerant if we have $2f+1$ replicas in our paxos cluster
- can make progresses with any majority subset of the nodes in the paxos cluster, can tolerate $f$ failures
- algorithm
  - paxos works via a 2-phase protocol with majority consensus in each round
    - each node plays the role of proposer, acceptor, and learner at the same time
    - nodes are not set on only THEIR value being the one who wins the vote, but they still compete to pick a value to commit
    - a node can vote on its own value
  - prepare phase
    - consider nodes $A, B, C$
    - node $A$ in the cluster proposes a value with a unique ballot # $n$ to all other nodes
    - nodes $B,C$ receive the prepare msg (maybe — msg might have dropped), and update their highest known ballot # $n_p$ if $n >n_p$
      - this means the nodes $B,C$ have promised to only listen to ballots with a higher ballot #
        - $B$ and $C$ might reply with a proposal theyve accepted $(n_a,v_a)$
      - if a node receives a prepare with a ballot # $n$ that is lower than that nodes $n_p$, the will reject it
    - if a majority of nodes accept he prepare msg from the node that is proposing, the node will move to the accept phase
      - otherwise it will repropose with a more competitive ballot # $n$
  - accept phase
    - node $A$ will now choose a value to vote on
      - if node $A$ received $(n_a,v_a)$ pairs from both $B$ and $C$
        - it will choose the pair with the highest $n_a$ and then propose this value to other nodes
      - otherwise it will propose its own value $v$
    - if the majority accept this proposal, the value is accepted and becomes immutable (the value is considered committed and cant change)
      - then that value is propagated to learners
  - learn phase
    - send the committed value to all nodes
      - this phase is an optimization, paxos will naturally learn about accepted values thru the 2 phase protocol
- paxos is safe but not live, but it is probabilistically live
  ![image.png](/images/docs/lib/classes/491/paxos-liveness.png)
  - use binary exponential backoff to make livelock astronomically improbable
  - paxos prefers safety over liveness
- multi-shot paxos uses paxos to agree on an event for multiple instances in a log
  - so consider a log, the $i$th index is the value that was voted on thru paxos
    - each element of the log is voted on using paxos
  - use an RSM (replicated state machine) to handle the logic of creating the paxos log (project 3)
- leader paxos
  - another optimization where the leader is the only node that proposes values
    - this decreases the # of msgs exchanged, as only one server proposes, the rest accept
  - use paxos to elect the leader
    - grant the leader a lease within which it is the leader (leaders discussed later)
  - the leader may be geographically distant

## so far

![image.png](/images/docs/lib/classes/491/sofar1.png)

![image.png](/images/docs/lib/classes/491/sofar2.png)

![image.png](/images/docs/lib/classes/491/sofar3.png)

## safety vs liveness

now we want to consider the possibility of guaranteeing both safety and liveness

- which we cant do under our current asynchronous failure model
  - meaning there is no bound on how long failures take and how long messages take to be delivered
- to get safety and liveness we need synchrony
  - some bounded time on msg delivery
    - this is impossible to get, but we can use timeouts to approximate it
    - which could still be wrong, we say something has failed and we retry, even tho it didnt fail, its just taking longer than the timeout range
- so fundamentally we can only build a system that is safe, or live, not both

so if we want linearizability, we have to wait for responses to our messages, bc we prefer waiting longer to get a safe and set answer

- we cant move forward until hearing from a majority (paxos) or until hearing the response to our backup bootstrap (P/B)
- so in general, we can see how the stronger our consistency model, we have to wait longer (increased latency)

### CAP theorem

this idea of being guaranteed only safety or liveness but not both is related to the idea of the CAP theorem

![image.png](/images/docs/lib/classes/491/cap-consistency-spectrum.png)

- CAP theorem says we can either have consistency and partition-tolerance, or availability and partition-tolerance, but not both C and A
- in principle we can have CA, CP, or AP
  - but in practice we cant ignore partition tolerance, the only way to do that is make failures impossible, which is impossible
- faster, better, cheaper → pick 2
- similarly think 281, where we trade space for time
  - recomputing previously seen subproblem in dfs? memoize
- in a distributed systems context, in practice, we are choosing btwn 2 things
  - a consistent, fault tolerant system
  - or an available, fault tolerant system

### PACELC

PACELC combines the ideas mentioned above

- if theres a partition, you trade availability for consistency
- if theres no failures, you trade latency for consistency

understanding these ideas overall gives us a better understanding of what we trade when we desire some quality for our system

- now we can decide what to prefer based on the requirements of our system

if linearizability is CP, and allowing a replica to always respond is AP, does having availability mean we cant provide any consistency?

- no, we still can provide consistency, but we will provide eventual consistency

an important point overall, consistency requires synchrony

## eventual consistency

what is eventual consistency? its consistency that is eventual

- meaning that all replicas in a system will not be fully consistent when the client receives a response to a request
  - ie, after a write, there is some time later $T$ at which all future reads will reflect the latest write
  - $T$ is unbounded but definitive, that time $T$ WILL come
- we saw in a strongly consistent system, there is no possibility of getting stale data, as to the client it appears that all the data is on one machine
  - with eventual consistency, it is possible that we get back stale data after a read, if the system has not reached convergence
- why would we want eventual consistency?
  - if we prefer our system to be more available and consistency isnt important (eg instagram), we use eventual consistency
    - comments that are read from the server may not be fully up to date, but eventually, they will be once all replicas have converged
- now theres a couple things we need to figure out
  1. how do we replicate our data across nodes with ordering of events?
  2. how do we ensure eventual convergence of our system?
     - meaning how do we make sure that all nodes eventually have the same state (all copies of data are the same)

### eventual vs strong consistency (linearizability)

quickly, what are some differences between a linearizable system, and an eventually consistent system?

- linearizable systems trade latency for consistency, and will only respond once all replicas have the same state
- eventually consistent systems trade consistency for lower latency, and any given replica can respond even if there is a network partition
  - and that node does not have a consistent copy of the most up-to-date data

### event ordering in eventually consistent systems

below is discussed the Bayou model of eventual consistency

how does eventual consistency provide an ordering of events?

- by using vector clocks
  - we dont need to use distributed consensus protocols bc those are used when we want our system to be linearizable (strong consistency)
  - below will explain why use prefer vector clocks over logical clocks (similar to the explanation above)
- updates are stored in a log
  - updates are applied locally by peers as soon as they are known
  - updates can be rolled back and reapplied
  - merges will resolve any conflicting updates
    - whether it be by undoing and reapplying to maintain clock order
      ![image.png](/images/docs/lib/classes/491/ec-merges.png)
    - or presenting the conflict the the application user
      - think a git merge conflict
- how do we synchronize logs between two peers?
  - $A$ pulls updates from $B$
    ![image.png](/images/docs/lib/classes/491/peer-sync.png)
    - $A$ tells $B$
      - it knows all updates on $X$ up to and including time 40
      - it knows all updates on $Y$ up to and including time 20
    - $B$ tells $A$ that is knows a later update $U5$ on $Y$ at time 40, so $A$ will learn this update
      - $B$ doesnt send any other updates bc $A$ has implied that it knows $X$’s events ≤ 40 and all of $Y$’s events ≤ 20
  - $B$ pulls updates from $A$
    ![image.png](/images/docs/lib/classes/491/peer-sync2.png)
    - $B$ tells $A$
      - it knows all updates on $X$ up to and including time 30
      - it knows all updates on $Y$ up to and including time 40
    - $A$ tells $B$ that it knows about a later update $U4$ on $X$ that occured at time 40, so $B$ will learn this update
- the reason we didnt use logical clocks for systems with linearizability guarantees is that we couldnt make progress unless all replicas were present
  - this is less of a problem with eventual consistency
    - bc updates are always accepted and we will always make progress
  - but we cant finalize updates to the entire system or truncate the log in case of a network partition
    - since all nodes need to talk to each other in order to synchronize
    - the problem is that say peer $A$ wants to synchronize w $B$, but the owner or peer $B$ turned off the device
      - then $A$ cant sync until $B$ is on, but we cant control that
  - so make a primary server that is managed somewhere (minimize machine faults)
    - have that primary server make final decisions about the ordering of events
    - and inform replicas of which updates are finalized
- however, a problem is that logical clocks will arbitrarily order concurrent events, bc they do not track concurrency as mentioned earlier
  - so use vector clocks instead, which will track if events are concurrent
    - in the case they are, they cant be ordered
      - so either let the application handle the merge conflict
      - or let the primary order them
- this might be a better explanation
  ![image.png](/images/docs/lib/classes/491/gpt-ec-expl.png)
- and heres an example that might make a little more sense as to how vector clocks work

  ```markdown
  ## **Initial Setup**

  Consider a system with three nodes: N1, N2, and N3, each storing key-value pairs and using vector clocks for versioning.

  ## **Sequential Operations Example**

  1. **Write Operation (Normal Case)**
     - Client A writes **`key1:value1`** to N1
     - N1 increments its vector clock to [1,0,0]
     - N1 asynchronously propagates the update to N2 and N3
     - N2 and N3 receive update, apply it, and update their vector clocks
     - System eventually reaches state where all nodes have **`key1:value1`** with vector clock [1,0,0]
  2. **Read Operation (After Convergence)**
     - Client B reads **`key1`** from any node
     - Gets consistent **`value1`** since system has converged

  ## **Concurrent Operations Example**

  1. **Concurrent Writes**
     - Client A writes **`key1:valueA`** to N1 (vector clock [1,0,0])
     - Simultaneously, Client B writes **`key1:valueB`** to N2 (vector clock [0,1,0])
     - N1 and N2 attempt to propagate their updates asynchronously
  2. **Conflict Detection**
     - When N3 receives both updates, it detects concurrent modifications using vector clocks
     - System must resolve conflict using predefined strategy (e.g., last-write-wins based on timestamp)
     - Eventually all nodes converge to the winning value

  ## **Network Partition Scenario**

  1. **Network Split**
     - Network partitions: {N1, N2} and {N3}
     - Client A writes **`key2:valueX`** to N1
     - N1 propagates to N2 successfully
     - Cannot reach N3 due to partition
  2. **Divergent States**
     - N1 and N2 have **`key2:valueX`**
     - N3 has old state
     - System continues operating in split state
  3. **Partition Healing**
     - When network heals, N3 receives missed updates
     - Anti-entropy mechanism detects and reconciles differences
     - System eventually converges to consistent state

  ## **Failure Scenarios**

  1. **Node Failure During Propagation**
     - Client writes to N1
     - N1 crashes before propagating to all nodes
     - When N1 recovers, it catches up using anti-entropy or gossip protocol
  2. **Message Loss**
     - Update message from N1 to N2 is lost
     - Background anti-entropy process eventually detects and repairs inconsistency
     - System converges to consistent state over time

  ## **Key Consistency Mechanisms**

  1. **Read Repair**
     - During reads, if stale data is detected, the reading node initiates repair
     - Updates are propagated to nodes with outdated values
  2. **Anti-Entropy**
     - Periodic background process compares node states
     - Detects and repairs inconsistencies
     - Ensures convergence even with message losses or partitions

  ## **Understanding Stale Reads**

  When reading from a replica, several scenarios can occur:

  1. **Stale Data Detection**: There's no direct way to know if a read is stale in an eventually consistent system. The read might return data that hasn't yet been updated from the primary, especially during:
     - Network partitions
     - Node failures
     - Replication lag
  2. **Replication Lag Impact**: When querying a read replica immediately after a write:
     - The replica might not have received the latest updates
     - Subsequent reads might return older data than what was just written
     - The lag can vary from milliseconds to minutes depending on system conditions
  ```

### guaranteeing eventual consistency

how do we make sure the system eventually converges?

- the more partitions we have while our data is stale, the more divergent our replica state will be over time
  - this idea is known as entropy
  - so we employ some kind of anti-entropy mechanism to make sure our replicated state converges eventually
- heres an explanation

  ```markdown
  ## **Entropy in Eventual Consistency**

  Entropy in distributed systems refers to the state of disorder or inconsistency between replicas:

  1. **Definition**: In distributed systems, entropy represents the divergence of data across different replicas over time
  2. **Causes of Entropy**:
     - Network delays
     - Node failures
     - Conflicting updates at different locations
     - Asynchronous replication

  ## **Without Anti-Entropy**

  Without anti-entropy mechanisms, several problems can arise:

  1. **Data Divergence**: Replicas may permanently diverge from each other without a mechanism to detect and repair inconsistencies
  2. **Inconsistency Growth**: The system's entropy (disorder) naturally increases over time without active measures to combat it
  3. **No Convergence Guarantee**: Without anti-entropy protocols, the system cannot guarantee that replicas will eventually reach a consistent state

  ## **Anti-Entropy Solutions**

  To combat these issues, systems implement anti-entropy mechanisms:

  1. **Synchronization Methods**:
     - Push: Nodes actively send updates to other nodes
     - Pull: Nodes request updates from others
     - Push-Pull: Combination of both approaches
  2. **Benefits**:
     - Detects and repairs inconsistencies
     - Ensures eventual convergence of replicas
     - Maintains system reliability despite failures
  ```

example use case of eventual consistency

- Amazon S3 (pre 2020)
  - creating new objects is strongly consistent
  - updating objects is eventually consistent
  - application can store bulk data that they write once in S3
    - upload a file, images, documents, etc
  - and the meta data which will be updated more frequently can go in a consistent store that it more expensive
    - but the meta data is small so the cost balances out
- git source control
  - P2P model that uses logged commits
    - 2 peers can sync directly, using a central repo is just convention
  - we achieve eventual consistency by doing a push and pull (sync)
  - conflicts are merged if possible, otherwise pushed to the user

at this point we have achieved a system that is fault tolerant and consistent (to whichever degree we choose)

- now we want to partition our state across multiple clusters
  - shard for performance, replicate for fault tolerance
- the more servers we have in our cluster, the more fault tolerant we are, the more available we are (bc theres are more servers our requests can go to)
  - but more if not always better, the more replicas, the more time it takes for us to replicate state across all of them
  - the more shards, the more clusters per shard, which is an inefficient use of resources
- so essentially we have this combination for a linearizable system that uses paxos for fault tolerance (project 4)
  - $n$ clusters, each cluster consists of $2f+1$ machines, each cluster is $f$ fault tolerant
  - each cluster is responsible for some # of shards, the data is split up per shard
    - so data per shard is replicated within each cluster, the data across all shards makes up the data across the whole system
- example
  - clusters $A,B,C$ with 3 servers in each cluster, 12 shards, 4 per cluster
    - cluster $A$ owns shard 0-3, data within these shards is replicated across servers
    - cluster $B$ owns shard 4-8, data within these shards is replicated across servers
    - cluster $C$ owns shard 9-12, data within these shards is replicated across servers
  - bc our data is replicated, if any server with in a cluster fails, we are good bc we have $2f+1$ servers so we can withstand $f=1$ faults
    - in reality when a server gets an update, it should persist the data so that if it fails, its not starting from scratch
      - this is especially important if the paxos log is truncated and i fail after its truncated
      - if my data wasnt on disk and i restarted, i would lose the operations that occurred in the truncated part of the log


i will use multiple terms to describe the same idea below

cluster = server = nodes = group

these all refer to some sort of replicated set of servers that is fault tolerant

whether it be thru P/B, paxos, or some other replication scheme

## sharding

now the question is how do we decide how to split keys across shards?

- problem is that most data has a skew/pattern embedded
  - like birthdays, most ppl are born at a certain time of year than others, statistically
- use consistent hashing, and represent the hash space as a circle (project 4 - each red dot is a paxos cluster)
  - partition keys across servers, servers will be responsible for the keys between itself and its predecessor
  - nodes are keys are assigned to the ring using the same hashing function
    ![image.png](/images/docs/lib/classes/491/hash-circle.png)
- but we have to consider the possibility that a server that is assigned a set of shards leaves/rejoins the system
  - server fails, and restarts
    - while its down, another server has to pick up the shards
    - when its back up, it gets rehashed on the circle, and it picks up some shards again
- using one node per replicated cluster on the ring will lead to some nodes handling more keys than others
  - and when clusters join and leave, some clusters will have more keys than others
  - we use virtual nodes to solve this
- virtual nodes basically split a single clusters work into $v$ different nodes
  ![image.png](/images/docs/lib/classes/491/vnodes.png)
  - now keys are more distributed across physical nodes on the ring
    - this also allows certain nodes that can tolerate more load to have more virtual nodes
    - and nodes will less capacity to have less nodes

### consistent hashing

now we need someone to track which shards belong to which servers

- can use a centralized shard master that is itself is a paxos cluster (project 4)
  - this approach works if we control all servers, if we dont, we might opt for a non-centralized P2P method
- or can avoid a centralized service by using a distributed hash table (DHT)
  - we can have every node in the system know where everything else is
    - this is $O(1)$ lookup, but each node has $O(n)$ state, and if we scale to thousands or millions of nodes, this wont work
  - given a node in the service and a key, would like to be able to find the node that is responsible for the key
- one way to achieve this P2P lookup is that each node knows who comes after it
  - if im looking for a key, i ask my successor if they have it, they ask their successor, and so on
    - however, this is a worst case $O(n)$ lookup, but $O(1)$ space
      - can we do better? well the keys and nodes on the ring are sorted bc of the hashing function
        - binary search!
- root a balanced binary tree at every node in the ring
  - this allows every node to half its search space
    - every node maintains $log(n)$ pointers to over nodes in the system
  - stored in **finger tables**
    ![image.png](/images/docs/lib/classes/491/ft1.png)
    ![image.png](/images/docs/lib/classes/491/ft2.png)
  - the lookup algorithm is as follows
    ![image.png](/images/docs/lib/classes/491/gpt-finger-table.png)
  - issue here now is if a server joins or leaves, we now need to update the entire finger table
    - because our finger table entry might not point to the correct node for certain key ranges anymore
    - periodically update finger tables by running lookup algorithm to find a node responsible for a key
      - theres a chance we are right, meaning the node is still responsible for the key
      - if we are wrong, update our finger table entry
    - nodes periodically update who their successor and predecessor is so that they maintain an idea of what the ring looks like
    - these mechanisms described above are called anti-entropy mechanisms, and they help maintain the accuracy of the system
      - the more that servers joins and leave, the more inaccurate our finger tables and ring will become
        - so this is nodes periodically check their successor and predecessor and update their finger tables
  - summary
    - basic idea is → i know $log(n)$ nodes, i know where they live on the hash circle, and i know the hash value of the key im looking for
      - so i know which two nodes the key is between

## case studies

now lets look at what we’ve discussed so far in practice with some case studies

### Amazon Dynamo

Dynamo is rumored to be the system on which S3 was built

- goals (consider goals in context of an Amazon shopping cart)
  1. high availability
     - it doesnt matter if the cart is slightly wrong, but if the cart takes long to load
       - user will give up
  2. low latency
     - same reason as above, user will abandon system if there is a noticeable delay
  3. eventual consistency with “good” convergence
     - we want it to be consistent quickly
       - its ok if there is divergence, but it should resolve quickly
- Dynamo’s main contribution to the field of distributed systems is the idea of tail latency
  - tail latency is the most important latency when we consider user experience
  - distributed systems researchers previously reported median latency as a metric of performance of the system
    - however, we dont really care if the middle point of all response times is fast (50th %tile)
    - what we care about is the few response times that are really slow (95, 99, 99.9th %tiles), because that becomes our bottleneck
      - this is what the users see
      - so for example, if we have 100 request-response cycles that go on when a user requests their shopping cart
        - but the longest request-response cycle is 3 seconds
        - the fact that 99% of of request-response times were fast doesnt matter bc we see the longest of all requests
        - this latency is the tail latency
      - in a distributed system with multiple components, slow requests can cascade and lead to higher overall latency
        - a small percentage of slow requests can affect thousands or millions of users depending on the size of the user base
        - in a revenue sense, thats a lot of lost money and a lot of unhappy customers
- consistent hashing

  - traditional DHTs have a key weakness
    - each key is owned by only one server in the hash space
      - if that server fails, the data is lost
  - Dynamo improves this through replication
    ![image.png](/images/docs/lib/classes/491/dynamo-repl.png)
    - each piece of data is replicated across $n$ successor nodes on the hash ring
      - $n$ is a configurable parameter that you can adjust
    - the system skips duplicate nodes (when a single physical server has multiple virtual nodes)
  - durability refers to the probability of not losing data updates
    - a larger $n$ value means data is replicated on more nodes
    - this increases durability because there are more copies of the data
    - however, increasing $n$ doesn't automatically guarantee better availability
      - availability is about being able to access the data when needed
      - more replicas (larger $n$) might help with availability but other factors are involved
  - example below for clarity

    ```markdown
    ## **Read Scenario with Node Failure**

    Using the same setup:

    - Hash ring with 6 nodes (A, B, C, D, E, F)
    - N = 3 replicas
    - Key "user_profile_123" is stored on nodes B, C, and D

    ## **When Node C Fails**

    If a client wants to read "user_profile_123" and node C is down:

    1. **Initial Request**:
       - Client hashes "user_profile_123" and finds it should be on node B
       - Client contacts node B for the data
    2. **Failover Process**:
       - If B is responsive, it returns the data
       - If B fails to respond, the request automatically moves to the next replica
       - The system can get the data from node D (the third copy)

    ## **Read Consistency**

    Even with node C down:

    - The system maintains durability because 2 copies are still available
    - Reads can still succeed by accessing either B or D
    - When C comes back online, it will catch up through a process called "read repair" or "anti-entropy"
    ```

- each write will have a coordinating node
  - say key 5 is owned by node $A,B,C$
    - we will always try ship the write to node $A$
    - if we cant, we try $B$
  - say node $A$ is the coordinator for a write
    - $A$ processes the write, and now has to forward the update to the rest of the replicas that have that data
    - $A$ will ship the write to all other replicas that store key 5 in parallel
  - example of divergence
    ![image.png](/images/docs/lib/classes/491/dynamo-div.png)
    - a write to $K21$ goes to $N32$, while a different write to $K21$ goes to $N60$
      - there is no ordering between these writes, bc we dont know which happened when
        - vector clocks used to provide ordering
      - we have divergence, we need a way to resolve these
        - anti-entropy protocols
- reaching eventual convergence
  - Dynamo disallows the idea that there are special nodes that know the state of all other servers
    - instead, clients can talk to any nodes in the ring
    - which means we need a decentralized, P2P way for nodes to have the up to date state of which nodes are in the system
  - whatever server the client talks to, it should be able to find the node that owns the key the client is writing to
    - to get this data in $O(1)$ time we need to store the $O(n)$ state of all other nodes in each node
  - when servers join/leave, we need all nodes to update their knowledge of the ring
    - for this we use the gossip protocol
  - gossip protocol is an anti-entropy mechanism
    - servers exchange node information on some interval $T$ in parallel and pairwise
    - this allows each node to update their knowledge of all other nodes
      - meaning knowledge of joins/leaves
      - data syncing between replicas
      - state of the ring
- synchronizing data between replicas
  - every key is replicated on $n$ replicas
    - $w$ is the # of writes we wait for before getting response
      - if we have synchronous, $w=n$
    - $r$ is the # of reads we wait for before getting response
  - we have 2 options when replicating
    - fully synchronous
      - node $A$ receives write, updates itself, then waits for nodes $B,C$ to update their key with the write, then respond to client
    - asynchronous
      - node $A$ receives write, updates itself, sends a request to $B,C$ to update, then responds to client, doesnt wait for $B,C$ to update
  - we want to pick values for $w, r$ such that we maximize availability/minimize latency while ensuring reads reflect the latest write
    - find the sweet spot such that we are as consistent as possible but also as available and fast as possible
    - $r+w>n$
      - assume $n=3$
      - if we have $r=3$ and $w=1$
        - write can go to any node, and will return as soon as it writes to one of them
        - the read has to go to all 3, so it is guaranteed to see the last write
      - if we have $r=1$ and $w=3$
        - write has to go to all 3 nodes before returning response to client
        - if read goes to any node, it will see the last write
      - if $r=2$ and $w=2$
        - write has to go to 2 of 3 node synchronously
        - read can go to either
          - both of the nodes that received the right, in that case, we see last write
          - or sees write in one node, and not in other node, but it still saw the last write
      - in the case where $r=3 ,w=1$ and $r=2,w=2$
        - how do we tell which read is latest?
          - variant on vector clocks
            - $[(A,1),(B,3)]$
            - (coordinator node, write count)
          - track nodes with nonzero values
    - example
      ![image.png](/images/docs/lib/classes/491/dynamo-rw.png)
      - client 1 sends $put(k,x)$ to node $A$
        - $w$ -= 1
      - node $A$ forwards write and vector clock to node $C$
        - $w$ -= 1
      - client 2 sends $get(k)$ to node $A$
        - response from $A,C$
          - $r$ -= 2
      - client 2 sends $put(k,y,V)$, where $V$ is the vector clock it learned of
        - $B$ receives request, updates its vector clock and compares its clock to request clock
        - $B$ forwards request to $C$, which compares the clocks [A,1] and ([A,1], [B,1])
          - it accepts $B$’s update bc its vector clock is more up to date
- resolving divergences
  - some diverged values are concurrent, we need a policy to resolve and decide what to do with multiple concurrent events
    ![image.png](/images/docs/lib/classes/491/resolving-div.png)
    - return all copies of existing versions
    - push to the application, which must apply some merge resolution strategy
- replicas catching up on missed updates
  - nodes exchange info about shards they have in common, periodically
    - they compare all data, which is slow
      - Bayou compares prefixes of the logs, see section on eventual consistency
      - but Dynamo doesnt have a log, it just has values
    - so we need a way of speeding it up
      - Merkel trees and cryptographic hashes
  - use hashes to compare large data sets quickly
    ![image.png](/images/docs/lib/classes/491/hash-comp.png)
  - an important note is that the differences between two nodes is not huge
    - the kv stores in common shards is large and most dont change most of the time
    - and bc outages are not common and failures are short-lived, we wont have to catch up a huge # of events
  - can take advantage of this by using a balanced binary tree again
    ![image.png](/images/docs/lib/classes/491/dynamo-hash-tree.png)
    - example
      ![image.png](/images/docs/lib/classes/491/dynamo-hash-tree-prune.png)
      - bc there is a difference in the trees, the root hashes are different
        - look at the left subtrees, the subtrees are the same, so the hashes are the same, so prune that branch
        - look at the right subtree, they subtrees are different, so the hashed are different, so explore more
          - continue until you find the update that is missing
- fixing expensive join/leaves
  - when a new node joins, we have to scan the entire kv store in the successor and transfer to the new node
    - virtual nodes have to do this transfer as well
  - and we have to recompute the Merkel tree
  - the cause of this complexity is that we use the hash value of the servers to both
    - partition the key space (partitions are defined by placement of servers)
    - and place assign keys to servers
  - so now every addition/removal of a server will modify the placement of keys, and modifies the partition of servers
    - theres nothing we can do about placement, bc a node join/leave will always result in keys moving from one node to another
    - but we can change how we partition the key space (place our nodes)
  - Dynamo looked at the possibilities of decoupling and found the fastest was statically partitioning the ring
    - ring is partitioned into equal sized shards
    - shard is placed on the first $n$ virtual nodes after the end of the key
      ![image.png](/images/docs/lib/classes/491/static-ring.png)
    - shards and Merkel trees are stored separately
    - when a new shard joins, just hand off the shards and the Merkel trees

overall, Dynamo makes the programming model harder, bc the application programmer now has to reason about the possibility of getting inconsistent results

must add application logic to resolve the inconsistencies

## distributed transactions

now that weve sharded our data cross multiple replica groups, we need to be able to guarantee atomic operations across multiple shards

- why? because in reality, most operations will need data from multiple shards, and those operations should be atomic
  - the transaction must be distributed, hence distributed transaction
  - an application cannot be written using a system whose interface is only atomic read and write
    - we require an atomic test and set (atomic read-modify-write)
- we can accomplish this with a 2 phase lock mechanism

### important properties

- a transaction must be atomic
  - either it happens or it doesnt
- transaction must be isolated
  - no other operation can see intermediate state while a transaction is occuring
  - the other operation either sees the state before or after the transaction

### serializable vs linearizable

- linearizable
  - external observer sees all operations as if they executed on one machine based on the observer’s sense of order
  - property of individual operations
- serializable
  - groups of transactions having a serial order
    - transaction $A$ consists of 4 $get$s, transaction $B$ consists of 5 $put$s
    - transaction $A$ → transaction $B$ or transaction $B$ → transaction $A$
  - groups can be serialized in some order
- strict serializability
  - groups of transactions have some serial order that matches the external observer’s sense of order

### 2PL (two-phase locking)

how do we use fine grained locking to maintain serializability and isolation?

- transaction coordinator (either client or some designated server)
  - sends lock requests to all nodes that contain the data we want
  - one TC receives success responses from all servers, those servers now have the lock
    - if any node rejects the lock, TC will send abort msgs to the rest of the servers who accepted
      - those servers will undo any changes
  - TC will commit changes to those nodes
- cant forget if we received a lock
  - this would happen if the server holding the lock crashed
    ![image.png](/images/docs/lib/classes/491/tx1.png)
    - this example violates isolation because we have two transactions touching the same state on $P2$
  - to solve this just store the fact that we have the lock on disk
- if all locks were granted and the TC dies, can we just commit or abort anyways?
  - no bc the nodes dont know if the TC is dead, the msg didnt make it, or the response is delayed
    ![image.png](/images/docs/lib/classes/491/tx2.png)
    - so TC also has to persist some state about who has been granted a lock, so that TC knows who to send either a commit or abort msg to
- we log our intent to deal with failures
  - before we do anything, TC logs that its starting transaction
    - fail before this, no problem, it never happened
  - it sends the lock requests to the nodes
    - fail during this, just assume failure immediately after disk write
    - restart whole thing
      - either grants the ungranted lock
      - or responds saying lock was already granted
  - when it receives the responses it logs that it has the locks
    - can resume or retry commit phase
    - but need duplicate detection in case original commit went thru and we just didnt get the response from the node
- transaction done once we get an ack from nodes that changes were committed
- can truncate log once we receive the last of the commit ACKs

## Google Spanner

so far we have seen how we cant really use time to order events

unless we throw money at the problem, buy really expensive clocks, bound unknowns, and control the network between our machines

which is what Google did

- Spanner provides strict serializability
- global replication
- a SQL like interface
- good performance
- negligible downtime

how did Google put a bound on time?

- Google put atomic clocks in every datacenter, servers in the datacenter synchronize their time with those atomic clocks
- CPU clocks have a maximum drift rate, so just assume our clocks drift by that much
  - every 30 seconds, the clock will have a 6ms drift, so we just resync with the atomic clocks in the datacenters (time masters)
- so when we ask for the time, we get a range $T \pm \epsilon$, where $\epsilon$ is small
  - the event MUST have occurred in this range
- using these ideas, Google provides us with the TrueTime API

### TrueTime

- `tt.now()` returns a range from [earliest, latest]
  - the real time at which an event occurred is no earlier than earliest and no later than latest, it is guaranteed to be in this range
  - so when we use these intervals to order events, we just order conservatively
    ![image.png](/images/docs/lib/classes/491/truetime.png)
    - $t1$ and $t2$ COULD be distinct, but we dont know that, so just conservatively assume they are concurrent
    - $t3$ and $t4$ are fully distinct bc there is no overlap in their time “smears”, so $t3$ happens before $t4$
- why is this so important?
  - these timestamps fully capture linearizability without needing to communicate between nodes
  - Spanner builds their system and ensures linearizability using this idea

### Spanner hows

Spanner uses:

- 2PL across shards
- each shard stored in a paxos group
- phases are added to the paxos logs
- groups are replicated across global data centers

optimizations:

- leader-based paxos to eliminate global round trips
- use consensus to elect leaders
- leaders given leases to guarantee system safety

### leases

- spanner uses leader based paxos to optimize round trip times
  - uses leases to grant a node leadership of the round
  - what if one node thinks it is the leader and the other one thinks its also the leader?
    - TrueTime guarantees this cant happen
- lease is granted at `t1 = TT.now().earliest` , expires at `t1 + 10`
  ![image.png](/images/docs/lib/classes/491/lease1.png)
  ![image.png](/images/docs/lib/classes/491/lease2.png)
  - the period the lease is valid is guaranteed to be less than 10 seconds
- leader believes it has the lease for 10 seconds
  - voter believes it has the least for more than 10 seconds
  - so its impossible for 2 nodes to be leader at once
    - basically earliest of one event happens after the latest of another, so events must have an order and couldnt have happened at the same time

### lock-free (snapshot) reads

Spanner also enables lock-free reads, which reduce some round trips and make reads faster overall

this is especially important given that most applications are read heavy, and global round trips for every read would be very slow

- we couldnt do lock free reads earlier because of this issue
  ![image.png](/images/docs/lib/classes/491/snap-read.png)
  - the read happens before the write, but the read response is showing the result of the write
  - we had no way of knowing that the read from TC1 happens before the write from TC2
    - vector clocks would detect that there is a concurrent operation, but would not be able to establish a happens before relationship
      - bc TC1 and TC2 have different clocks
  - however, with TrueTime, we can guarantee strictly monotonic operations across multiple machines
    - without sending multiple msgs
      - the whole point was to avoid round trip msgs with locks, if we need msgs to communicate happens-before relationships, just use a lock at that point
    - meaning node TC1 can use TrueTime to universally tell if it happens before some other operation from another server
  - this means we need versioned data
    - transaction coordinator will choose the commit timestamp for operations
- we can get strict monotonicity by waiting out the uncertainty period before committing/releasing locks
  ![image.png](/images/docs/lib/classes/491/tt-monotonicity.png)

### schema changes

how can the schema be updated with huge amounts of data in the database?

- schema change must be atomic and isolated
  - database can be potentially huge
  - probably will touch most if not all shards
- perform snapshot reads and extend the table to have the new columns
  - then there is a point in time $T$ where transactions with a timestamp $\geq T$ use the new one schema, and timestamps $<T$ use the old schema
    - transactions $\geq T$ may have to stall briefly, but no where near as long as if we paused and migrated

## scaling beyond shards

so far we have replicated for fault tolerance, and sharded for performance, but there is a limit to how much we can scale horizontally before we have a counterbalancing force that increases latency

how does sharding impact user latency?

- if a transaction touches multiple shards, transactions will run at the speed of the shard that takes longest to respond
- the more shards we have, the more likely we have low-probability events
  - meaning theres a higher chance we have 1 request that takes a long time (tail-latency)
  - this also means that we will touch more shards when we do a transaction bc our data is split up more
    - so overall latency increases

so what can we do about this?

- one solution is to send reads to all replicas and take the first answer you get
  - this way the response isnt long just bc we happened to send the read to a slow replica
  - problem with this is that it will increase load on system, and if the source of the increased latency is already a workload related incident
    - we just made it worse
- another option is to set a timeout for requests (acting on absence)
  - if no response before timeout, send request to the other replicas
    - this will increase load only when something is slow
    - but now we will have to trade responsiveness for load
      - meaning the longer out timeout, the lower the load but slower response times
      - the shorter the timeout, the higher the load but potentially more missed responses
  - this solution uses the absence of a response to infer that the latency of a node is high
    - which is more difficult
- can also issue staggered requests (acting on presence)
  - meaning we send one request to one replica, then wait for some time $T$ before issuing duplicate requests to the other replicas
  - if the first replica received the msg, it will send a cancel msg to the other replicas that got the duplicate requests
    - cancellation almost always arrives before the duplicate request
  - the other replicas will either reject the request bc its been serviced, or respond to it
    - now we only add extra load on the system when the first node actually did not respond to the request
  - this solution uses the presence of a cancel message to know that the latency of the node receiving the original request is low

these solution use the idea of acting on presence rather than absence

- asking “is anyone not here?” is a useless question
  - think about heartbeats
    - its easier to know if something is alive rather than guessing if something is dead
      - just bc u dont get a response doesnt mean the server is dead, the response couldve gotten dropped, or maybe the server is dead
      - but you know for a fact that, if you get a response, that node is alive
- acting on the absence of something is hard
- acting on the presence of something is much easier

back to the discussion about how to address the issue of shards

- we can complement sharding with caching
  - example is facebook’s memcache, which uses a look-aside cache
    ![image.png](/images/docs/lib/classes/491/fb-memcache1.png)
    ![image.png](/images/docs/lib/classes/491/fb-memcache2.png)
