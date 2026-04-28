# [Run Live Simulation Here](https://alexander-shalymenov.github.io/drl/examples/actualization-demo.html)

# DRL — Deterministic Resolution Layer

A simple but fundamental pattern for turning multiple possible outputs into one committed result.

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
  { value: "A", prob: 0.33 },
  { value: "ComplexAlternativeValue", prob: 0.34 },
  { value: "BBBBBBBBBBBBBBBBBBBBBBBB", prob: 0.33 }
];

const result = DRL.actualize(candidates, "prob", c => c.value);

console.log(result); // { value: "A", prob: 0.33 }
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

## Informational Actualism Resolution

DRL can implement the informational actualism principle:

```
ω* = arg min (K(ω) - log2(p(ω)))
```

This defines a deterministic actualization rule based on information cost.

Where:
- **K(ω)** is the complexity of a candidate state
- **p(ω)** is the probability of that candidate state
- **K(ω)** is approximated in this implementation by zlib compressed byte length
- the candidate with the lowest cost becomes the committed state

In code:

```js
const result = DRL.actualize(candidates, "prob", c => c.value);
```

This is different from simple argmax. A candidate with slightly lower probability can still be selected if its description complexity is lower enough.

---

## Interactive Demo

An interactive browser demo is included:

examples/actualization-demo.html

You can open this file directly in your browser to experiment with different values and probabilities.

It shows in real time:

- what argmax would choose
- what DRL actualization chooses
- how the cost is calculated

---

## Note on Complexity Approximation

The browser demo uses string length as a simple approximation of K(ω).

The main Node.js implementation can use compression-based complexity (e.g., zlib).

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
- the transition from candidate states to one committed state becomes explicit

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

**Informational actualism**
```
F(Ω) = argmin(K(ω) - log2(p(ω)))
```

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
2. DRL applies a resolution rule → ω*
3. With informational actualism, the rule is `arg min (K(ω) - log2(p(ω)))`

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
- `examples/actualization-demo.html` — interactive demo

---

## Status

Version: v1.1.0

---

## Attribution

This concept is introduced by **Alexander Shalymenov**.

If you use or extend DRL, reference this repository.
