class Penetration {
  constructor() {
    this.progress = 0.0;
    this.friction = 1.0;
    this.numbness = 0.0;
    this.speed = 0.0;
    this.tags = [];
  }
  
  interpret_tags(cav, shaf, tags) {
    for (const tag of this.tags)
      tags.push(tag);
    
    return penetration_interpret_tags(cav,shaf,this,tags);
  }
}