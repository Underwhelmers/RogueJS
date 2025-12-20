class Penetration {
  constructor() {
    this.progress = 0.0;
    this.friction = 1.0;
    this.numbness = 0.0;
    this.speed = 0.0;   
  }
  
  interpret_tags(cav, shaf, tags) {
    return penetration_interpret_tags(cav,shaf,this,tags);
  }
}