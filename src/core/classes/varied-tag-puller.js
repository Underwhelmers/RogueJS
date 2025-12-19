class VariedTagPuller {
  constructor({
    memorySize = 5,
    maxTries = 6
  } = {}) {
    this.memorySize = memorySize;
    this.maxTries = maxTries;
    this.memory = [];
  }

  pull(tags, isValid = null) {
    const result = this.multipull(1, tags, isValid);
    return result.length ? result[0] : null;
  }

  multipull(count, tags, isValid = null) {
    if (!tags || tags.length === 0 || count <= 0) return [];

    const results = [];
    const usedThisPull = new Set();

    for (let n = 0; n < count; n++) {
      let chosen = null;
      let fallback = null;

      for (let i = 0; i < this.maxTries; i++) {
        const tag = tags[Math.floor(Math.random() * tags.length)];

        if (isValid && !isValid(tag)) continue;
        if (usedThisPull.has(tag)) continue;

        if (!fallback) fallback = tag;

        // Best case: new to memory and new to this pull
        if (!this.memory.includes(tag)) {
          chosen = tag;
          break;
        }
      }

      // Desperation: allow repeats within memory
      if (!chosen) {
        for (let i = 0; i < this.maxTries; i++) {
          const tag = tags[Math.floor(Math.random() * tags.length)];

          if (isValid && !isValid(tag)) continue;
          if (usedThisPull.has(tag)) continue;

          chosen = tag;
          break;
        }
      }

      // Absolute fallback: reuse something if forced
      if (!chosen) chosen = fallback;

      if (!chosen) break;

      results.push(chosen);
      usedThisPull.add(chosen);
      this._remember(chosen);
    }

    return results;
  }

  _remember(tag) {
    this.memory.push(tag);
    if (this.memory.length > this.memorySize)
      this.memory.shift();
  }

  clearMemory() {
    this.memory.length = 0;
  }
}
