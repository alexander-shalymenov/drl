# DRL — Deterministic Resolution Layer

A simple but fundamental pattern:

> Any system that produces multiple outputs must resolve them into exactly one.

**Author: Alexander Shalymenov**

---

## What is DRL?

DRL (Deterministic Resolution Layer) is a system-level pattern that makes the final decision step explicit.

Every system that produces multiple outputs already contains this step. DRL formalizes it.

Examples:
- AI models generate multiple candidates → pick one
- Search returns many results → rank and show one first
- Distributed systems see conflicting states → agree on one

---

## Quick Example

```js
const DRL = require("./drl");

const candidates = [
  { value: "A", score: 0.7 },
  { value: "B", score: 0.9 },
  { value: "C", score: 0.4 }
];

const result = DRL.resolve(candidates, c => c.score);

console.log(result); // { value: "B", score: 0.9 }
```

---

## The Core Idea

Any system can be split into two stages:

```
Ω = T(S)
ω* = F(Ω, C)
```

- **Ω** — candidate states
- **T(S)** — generator
- **F** — resolution function
- **C** — selection criteria
- **ω*** — final committed state

Interpretation:
- generate possibilities
- resolve exactly one

---

## Why It Matters

Without an explicit resolution step:

- outputs remain ambiguous
- behavior becomes inconsistent
- systems are harder to test

With DRL:

- decision logic is isolated
- systems become predictable
- behavior becomes testable

---

## Where It Applies

### AI
- LLM token selection
- ranking model outputs
- recommendation systems

### Distributed Systems
- consensus (leader election)
- state reconciliation

### Applications
- routing decisions
- matching systems
- scoring pipelines

---

## Minimal Interface

```
Resolve(Candidates, Criteria) -> CommittedState
```

Constraint:
- exactly one result must be returned

---

## Common Patterns

**Argmax**
```
F(Ω) = argmax(score(ω))
```

**Sampling**
```
F(Ω) = sample(Ω, P, temperature)
```

**Consensus**
```
F(Ω) = resolve_consensus(Ω, rules)
```

**Lazy Resolution**
```
F(Ω) = resolve_on_demand(Ω, context)
```

---

## Example (AI)

LLM next-token selection:

1. Model produces probabilities → Ω
2. Resolution layer selects one token → ω*

Without DRL:
- output is a distribution

With DRL:
- output is a concrete result

---

## What DRL Is Not

DRL does not invent:
- ranking algorithms
- sampling methods
- consensus protocols

It formalizes the resolution step across all of them.

---

## Repository Structure

- `SPEC.md` — full specification
- `drl.js` — implementation
- `examples.js` — usage

---

## Status

Version: v1.1.0

---

## Attribution

This concept is introduced by **Alexander Shalymenov**.

If you use or extend DRL, reference this repository.

