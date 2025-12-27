class Vagina {
  constructor() {
    this.replaces = {
      "deepest-kiss":"cervix-kiss",
      "pushing-thought":"cervix-penetration",
    };
    
    this.nouns = new ValueBag([
      "vagina",
      "pussy",
      "coochie",
      "kitty",
      "slit",
      "birth-hole",
      "cunt",
      "snatch",
      "hoo-ha"
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