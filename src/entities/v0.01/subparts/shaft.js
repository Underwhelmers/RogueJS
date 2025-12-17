class Shaft {
  constructor() {
    this.length = 1.0; 
    this.girth  = 1.0;
    this.smooth = 1.0;
    this.rigid  = 1.0;
    this.shape  = new Knot();
  }
  randomize(scale) {
    this.length *= (1 - scale + Math.random() * scale * 2);
    this.girth  *= (1 - scale + Math.random() * scale * 2);
    this.smooth *= (1 - scale + Math.random() * scale * 2);
  }
  
  compare_for_tags(cav, pen) {
    return this.shape.compare_for_tags(cav, this, pen);
  }
}

class Penis {
  constructor() {
    this.nouns = new ValueBag([
      "dick",
      "shaft",
      "manhood",
      "rod",
      "penis",
    ]);
  }
  compare_for_tags(cav, shaf, pen) {
    return [];
  }
}

class Knot {
  constructor() {
    this.start = 0.7;
    this.end = 0.98;
    this.nouns = new ValueBag([
      "knotted dick",
      "swollen knot",
      "dog-like dick",
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