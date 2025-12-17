class Cavity {
  constructor() {
    this.depth = 0.4;
    this.width = 0.5;
    this.give = 0.6;
    this.limit = 2.1;
    this.type = new Vagina();
  }

  randomize(scale) {
    this.depth *= (1 - scale + Math.random() * scale * 2);
    this.width *= (1 - scale + Math.random() * scale * 2);
    this.give  *= (1 - scale + Math.random() * scale * 2);
    this.limit *= (1 - scale + Math.random() * scale * 2);
  }
  
  quick_setup(d,w,g,l,t) {
    this.depth = d;
    this.width = w;
    this.give = g;
    this.limit = l;
    this.type = CavityTypeFactory.make(t);

    return this;
  }

  replace_tags(tags) {
    return this.type.replace_tags(tags);
  }
}

class CavityTypeFactory {
  static make(type) {
    switch(type) {
      case 'vagina': return new Vagina();
      case 'vag': return new Vagina();

      case 'anus': return new Rectum();
      case 'rectum': return new Rectum();
      case 'asshole': return new Rectum();

      case 'mouth': return new Mouth();
      case 'throat': return new Mouth();
    }
    return undefined;
  }
}


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
