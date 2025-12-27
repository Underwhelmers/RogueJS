const BODY_PHYSONOMY = {
  STRETCHY: {
    modify: (body) => {
      if (body.anus) body.anus.limit *= 4;
      if (body.vagina) body.vagina.limit *= 4;
    }
  },
  VIRGIN_VAGINA: {
    modify: (body) => {
      if (body.vagina) body.vagina.give = 0;
    }
  },
  VIRGIN_ANUS: {
    modify: (body) => {
      if (body.anus) body.anus.give = 0;
    }
  },
  CAN_DEEPTHROAT: {
    modify: (body) => {
      if(body.mouth) {
        body.mouth.limit *= 0.5;
        body.mouth.depth *= 0.5;
      }
    }
  },
  MONSTER_DICK: {
    modify: (body) => {
      if (body.dick) {
        body.dick.length *= 2;
        body.dick.girth *= 2;
      }
    }
  },
  RIDICULOUS_DICK: {
    modify: (body) => {
      if (body.dick) {
        body.dick.length *= 4;
        body.dick.girth *= 4;
      }
    }
  },
  PREHENSILE_TONGUE: {
    modify: (body) => {
      if (body.tongue) body.tongue.length = body.dick.length * 4.0;
    }
  },
  
  HAS_TAIL: {
    modify: (body) => {
      if (body.toy) {
        body.toy.length = body.dick.length * 3.0;
        body.toy.girth = body.dick.girth * 1.5;
        body.toy.nouns = new ValueBag([
          "long tail",
          "strong tail",
          "slick tail",
          "tail",
          "squirming tail",
          "wiggling tail",
          "curious tail"
        ]);
      }
    }
  },
}
