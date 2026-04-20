/**
 * DRL — Deterministic Resolution Layer
 * Author: Alexander Shalymenov
 *
 * Core idea:
 * Multiple candidate states or outputs must be resolved
 * into exactly one committed result.
 */

class DRL {
  /**
   * Resolve by score.
   * Returns exactly one committed candidate.
   *
   * @template T
   * @param {T[]} candidates
   * @param {(candidate: T) => number} scoreFn
   * @returns {T}
   */
  static resolve(candidates, scoreFn) {
    if (!Array.isArray(candidates) || candidates.length === 0) {
      throw new Error("DRL.resolve: candidates must be a non-empty array.");
    }

    if (typeof scoreFn !== "function") {
      throw new Error("DRL.resolve: scoreFn must be a function.");
    }

    let best = candidates[0];
    let bestScore = scoreFn(best);

    for (let i = 1; i < candidates.length; i++) {
      const score = scoreFn(candidates[i]);
      if (score > bestScore) {
        best = candidates[i];
        bestScore = score;
      }
    }

    return best;
  }

  /**
   * Resolve using a custom comparator.
   * Comparator should return > 0 when a is better than b.
   *
   * @template T
   * @param {T[]} candidates
   * @param {(a: T, b: T) => number} compareFn
   * @returns {T}
   */
  static compare(candidates, compareFn) {
    if (!Array.isArray(candidates) || candidates.length === 0) {
      throw new Error("DRL.compare: candidates must be a non-empty array.");
    }

    if (typeof compareFn !== "function") {
      throw new Error("DRL.compare: compareFn must be a function.");
    }

    let best = candidates[0];

    for (let i = 1; i < candidates.length; i++) {
      if (compareFn(candidates[i], best) > 0) {
        best = candidates[i];
      }
    }

    return best;
  }

  /**
   * Resolve by latest value of a field.
   *
   * @template T
   * @param {T[]} candidates
   * @param {keyof T} key
   * @returns {T}
   */
  static latest(candidates, key = "timestamp") {
    return DRL.compare(candidates, (a, b) => {
      if (a[key] === b[key]) return 0;
      return a[key] > b[key] ? 1 : -1;
    });
  }

  /**
   * Resolve by weighted random sampling.
   * Each candidate must contain a numeric probability field.
   *
   * @template T
   * @param {T[]} candidates
   * @param {keyof T} probKey
   * @returns {T}
   */
  static sample(candidates, probKey = "prob") {
    if (!Array.isArray(candidates) || candidates.length === 0) {
      throw new Error("DRL.sample: candidates must be a non-empty array.");
    }

    const total = candidates.reduce((sum, candidate) => {
      const value = Number(candidate[probKey]);
      if (!Number.isFinite(value) || value < 0) {
        throw new Error("DRL.sample: invalid probability value.");
      }
      return sum + value;
    }, 0);

    if (total <= 0) {
      throw new Error("DRL.sample: total probability must be greater than zero.");
    }

    const threshold = Math.random() * total;
    let running = 0;

    for (const candidate of candidates) {
      running += Number(candidate[probKey]);
      if (running >= threshold) {
        return candidate;
      }
    }

    return candidates[candidates.length - 1];
  }
}

module.exports = DRL;