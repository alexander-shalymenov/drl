const DRL = require("./drl");

console.log("=== Example 1: AI token selection by score ===");

const tokenCandidates = [
  { token: "Yes", score: 0.62 },
  { token: "No", score: 0.21 },
  { token: "Maybe", score: 0.17 }
];

const chosenToken = DRL.resolve(tokenCandidates, c => c.score);
console.log("Chosen token:", chosenToken);

console.log("\n=== Example 2: Recommendation selection ===");

const recommendations = [
  { id: "A", relevance: 0.74, freshness: 0.60 },
  { id: "B", relevance: 0.68, freshness: 0.95 },
  { id: "C", relevance: 0.80, freshness: 0.40 }
];

const bestRecommendation = DRL.resolve(
  recommendations,
  r => r.relevance * 0.7 + r.freshness * 0.3
);
console.log("Best recommendation:", bestRecommendation);

console.log("\n=== Example 3: Distributed state conflict ===");

const states = [
  { value: "old", timestamp: 1713200000 },
  { value: "new", timestamp: 1713200500 }
];

const latestState = DRL.latest(states, "timestamp");
console.log("Committed state:", latestState);

console.log("\n=== Example 4: Probabilistic sampling ===");

const nextTokens = [
  { token: "the", prob: 0.5 },
  { token: "a", prob: 0.3 },
  { token: "one", prob: 0.2 }
];

const sampled = DRL.sample(nextTokens, "prob");
console.log("Sampled token:", sampled);