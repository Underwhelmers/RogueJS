class Mouth {
  constructor() {
    this.replaces = {
      "deepest-kiss":"chocking",
      "pushing-thought":"throat-fucking",
      "tearing":"suffocating",
      "stuck":"jaw-locking",
    };
    
    this.nouns = new ValueBag([
      "mouth",
      "throat",
      "face-pussy",
      "maw",
      "yapper"
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
