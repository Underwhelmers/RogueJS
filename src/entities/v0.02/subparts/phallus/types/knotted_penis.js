class KnottedPenis {
  constructor() {
    this.start = 0.7;
    this.end = 0.98;
    this.nouns = new ValueBag([
      "knotted dick",
      "swollen knot",
      "animalistic dick",
    ]);
  }
  
  compare_for_tags(cav, shaf, pen) {
    const tags = [];
    if (pen.progress > shaf.length * this.end)
      tags.push("knotted");
    else if (pen.progress > shaf.length * this.start)
      tags.push("knot-catching");
    
    // make cheks for width.
    return tags;
  }
}