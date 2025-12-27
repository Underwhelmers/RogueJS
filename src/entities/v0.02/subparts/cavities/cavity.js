class Cavity {
  constructor() {
    this.depth = 0.4;
    this.width = 0.5;
    this.give = 0.6;
    this.limit = 2.1;
    this.type = undefined;
    this.taste = undefined;
  }

  randomize(scale) {
    this.depth *= (1 - scale + Math.random() * scale * 2);
    this.width *= (1 - scale + Math.random() * scale * 2);
    this.give  *= (1 - scale + Math.random() * scale * 2);
    this.limit *= (1 - scale + Math.random() * scale * 2);
  }
  
  quick_setup(d,w,g,l) {
    this.depth = d;
    this.width = w;
    this.give = g;
    this.limit = l;

    return this;
  }

  replace_tags(tags) {
    return this.type.replace_tags(tags);
  }
}