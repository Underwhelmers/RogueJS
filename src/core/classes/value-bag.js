class ValueBag {
  constructor(rawvalues) {
    this.raw = rawvalues;
    this.prev = undefined;
    this.unused = [];
  }

  pull() {
    if (this.raw.length === 0)
      return undefined;
    if (this.raw.length === 1)
      return this.raw[0];

    if (this.unused.length === 0)
      this.refresh_unused();

    let val = pull_random(this.unused);
    if (val === this.prev) 
      val = pull_random(this.unused);
    this.prev = val;
    return this.raw[val];
  }

  refresh_unused() {
    const size = this.raw.length;
    this.unused.length = size;
    for (let i = 0; i < size; i++)
      this.unused[i] = i;
    shuffle_array(this.unused);
  }
}