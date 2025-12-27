class Rectum {
  constructor() {
    this.replaces = {
      "deepest-kiss":"reaching-fold",
      "pushing-thought":"rearanging-guts",
    };
    this.nouns = new ValueBag([
      "asshole",
      "anus",
      "backdoor",
      "chocolate starfish",
      "brown eye",
      "ass-pussy",
      "rosebud",
      "shithole",
    ]);
  }
  
  replace_tags(tags) {
    tags = new Set(tags);
    
    for (const k in this.replaces) {
      if (tags.has(k)) {
        tags.delete(k);
        tags.add(this.replaces[k]);
      }
    }
    
    return Array.from(tags);
  }
}