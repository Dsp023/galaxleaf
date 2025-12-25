---
title: CAP Theorem
description: The impossible triangle of distributed systems.
category: Core Concepts (Backend)
---

# CAP Theorem: You Can't Have It All

## The Theorem

In a distributed system, you can only guarantee **2 out of 3**:

- **C**onsistency: All nodes see the same data at the same time
- **A**vailability: Every request gets a response (success or failure)
- **P**artition Tolerance: System continues despite network failures

**Proof:** During a network partition, you must choose between consistency and availability.

## The Scenario

```
Database with 2 nodes: Node A (US) and Node B (EU)
Value: balance = $100

Network partition occurs (nodes can't communicate)

User 1 → Node A: "Withdraw $80"
User 2 → Node B: "Withdraw $80"

What happens?
```

## CP (Consistency + Partition Tolerance)

**Sacrifice:** Availability

```
Node A receives: Withdraw $80
Node A: "I can't reach Node B. I can't guarantee consistency."
Node A: Returns ERROR (unavailable) ❌

Node B receives: Withdraw $80  
Node B: "I can't reach Node A. I can't guarantee consistency."
Node B: Returns ERROR (unavailable) ❌

Result: System unavailable during partition
But: When network heals, balance is correct ($20 or $20, not $20 and -$60)
```

**Examples:** MongoDB (with majority writes), HBase, Redis Cluster

**Use Cases:** Financial systems, inventory management

## AP (Availability + Partition Tolerance)

**Sacrifice:** Consistency

```
Node A receives: Withdraw $80
Node A: "Network partition, but I'll accept anyway"
Node A: balance = $100 - $80 = $20 ✅

Node B receives: Withdraw $80
Node B: "Network partition, but I'll accept anyway"  
Node B: balance = $100 - $80 = $20 ✅

Result: Both withdrawals succeed
Problem: Actual balance = -$60 ❌ (Inconsistent!)
```

**Examples:** Cassandra, DynamoDB, Couchbase

**Use Cases:** Social media feeds, shopping carts, session storage

## CA (Consistency + Availability)

**Sacrifice:** Partition Tolerance

```
Single node database (PostgreSQL, MySQL on one server)

No network partition possible (only one node!)
Always consistent ✅
Always available ✅

BUT: If server crashes = total outage
Not partition tolerant ❌
```

**Reality:** Not truly distributed. CA doesn't exist in distributed systems because **network partitions WILL happen**.

## Real-World Trade-offs

### MongoDB (CP)
```javascript
// Default: Writes require majority acknowledgment
await db.collection.insertOne(doc, {
    writeConcern: { w: 'majority' }
});

// During partition:
// - Primary can't reach majority → Write fails
// - System unavailable
// - But: No inconsistent data
```

### Cassandra (AP)
```javascript
// Writes succeed even if nodes are partitioned
await client.execute(
    'INSERT INTO users (id, name) VALUES (?, ?)',
    [1, 'Alice'],
    { consistency: cassandra.types.consistencies.one }
);

// During partition:
// - Write succeeds on available node
// - System available ✅
// - But: Reads might see stale data temporarily
```

## Tunable Consistency

Modern databases let you **tune** the trade-off per query:

### DynamoDB
```python
# Strong consistency (sacrifice availability)
response = table.get_item(
    Key={'id': '123'},
    ConsistentRead=True  # CP mode
)

# Eventual consistency (prioritize availability)
response = table.get_item(
    Key={'id': '123'},
    ConsistentRead=False  # AP mode (default)
)
```

### Cassandra Quorum Reads
```javascript
// Read from majority (more consistent, less available)
await client.execute(query, [], {
    consistency: cassandra.types.consistencies.quorum
});

// Read from any node (more available, less consistent)
await client.execute(query, [], {
    consistency: cassandra.types.consistencies.one
});
```

## Eventual Consistency

The **AP** compromise:

```
Time 0:  Node A writes X=1
Time 1:  Node B reads X → Gets X=0 (stale!) ❌
Time 5:  Replication catches up
Time 6:  Node B reads X → Gets X=1 ✅
```

**Guarantees:**
- Eventually all nodes converge
- No guarantee on "when"

**Examples:**
- DNS (eventual)
- Amazon shopping cart
- Social media likes/views

## Beyond CAP: PACELC

**PACELC** extends CAP:

**If Partition (P):**
- Choose Availability (A) or Consistency (C)

**Else (E):**
- Choose Latency (L) or Consistency (C)

Even without partitions, you trade consistency for speed.

### Example: MongoDB
```
P: Consistency (CP)
E: Latency (EL)

During partition: Unavailable (prioritizes C)
Normal operation: Fast writes to primary, eventual replication (prioritizes L)
```

## Handling Partitions

### 1. Retry with Backoff
```javascript
async function writeWithRetry(data, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await db.write(data);
        } catch (err) {
            if (err.code === 'NETWORK_PARTITION') {
                await sleep(2 ** i * 1000);  // Exponential backoff
                continue;
            }
            throw err;
        }
    }
    throw new Error('Max retries exceeded');
}
```

### 2. Read Repair
```javascript
// Cassandra: On read, detect inconsistency and fix
// Read from 3 nodes:
// Node A: balance=100
// Node B: balance=100  
// Node C: balance=80 (stale!)

// Return 100 (majority)
// Background: Update Node C to 100
```

### 3. Anti-Entropy (Merkle Trees)
```
Periodically compare hashes of data ranges
If mismatch: Sync the divergent data
```

### 4. Vector Clocks / CRDTs
```javascript
// Detect concurrent writes
Write 1: {value: 'A', vector: [1, 0]}
Write 2: {value: 'B', vector: [0, 1]}

// Conflict! Application must resolve:
// - Last-write-wins (LWW)
// - Merge (for CRDT types)
// - Manual resolution
```

## Common Misconceptions

### "NoSQL = AP, SQL = CP"
❌ **Wrong!**

- PostgreSQL with replication: Can be tuned
- CockroachDB (SQL): Strongly consistent (CP)
- Cassandra (NoSQL): AP
- MongoDB (NoSQL): CP by default

### "CAP means pick 2 features"
❌ **Wrong!**

Partitions are rare but inevitable. The theorem is really:

**"When partition happens, pick A or C. Otherwise, you get both."**

### "Consistency = ACID"
❌ **Wrong!**

- CAP Consistency: All replicas agree
- ACID Consistency: Data satisfies constraints

Different concepts!

## Real-World Decisions

### Banking (CP)
```
Correctness > Availability
Better to show error than wrong balance
Use: PostgreSQL, CockroachDB, Spanner
```

### Social Media (AP)
```
Availability > Strict Consistency
Okay if like count is off by a few seconds
Use: Cassandra, DynamoDB, Riak
```

### E-Commerce (Depends)
```
Product catalog: AP (eventual is fine)
Checkout/Payment: CP (must be correct)
Use: Hybrid (multiple databases)
```

## Testing for Partitions

```bash
# Simulate partition with iptables (Linux)
iptables -A INPUT -s 192.168.1.10 -j DROP
iptables -A OUTPUT -d 192.168.1.10 -j DROP

# Tool: Jepsen (partition testing framework)
# Tests databases under network faults
# Discovered bugs in MongoDB, Cassandra, etc.
```

## Distributed Consensus (Raft/Paxos)

Algorithms to achieve CP in distributed systems:

```
1. Leader election
2. All writes go through leader
3. Leader replicates to majority (quorum)
4. If leader fails, elect new leader
5. Ensures consistency (but temporarily unavailable during election)
```

**Used in:**
- etcd (Kubernetes)
- CockroachDB
- Consul

## Further Reading

- [CAP Twelve Years Later (Brewer)](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/)
- [Jepsen: Testing Distributed Systems](https://jepsen.io/)
- [Designing Data-Intensive Applications](https://dataintensive.net/)

## Conclusion

CAP isn't about choosing 2 features permanently—it's about choosing how to behave **during network partitions** (which are rare but inevitable). Modern systems often allow tuning consistency levels per-operation, letting you make different trade-offs for different workloads. Understanding CAP helps you:
1. Choose the right database
2. Configure it correctly
3. Handle edge cases (partitions, conflicts)  
4. Set realistic expectations with stakeholders ("eventual consistency" isn't a bug, it's a design choice!)
