class Phallus {
  constructor() {
    this.length = 1.0; 
    this.girth  = 1.0;
    this.smooth = 1.0;
    this.rigid  = 1.0;
    this.type  = undefined;
  }

  randomize(scale) {
    this.length *= (1 - scale + Math.random() * scale * 2);
    this.girth  *= (1 - scale + Math.random() * scale * 2);
    this.smooth *= (1 - scale + Math.random() * scale * 2);
  }

  quick_setup(l,g,s,r) {
    this.length = l;
    this.girth = g;
    this.smooth = s;
    this.rigid = r;
  }
  
  compare_for_tags(cav, pen) {
    return this.type.compare_for_tags(cav, this, pen);
  }
}
