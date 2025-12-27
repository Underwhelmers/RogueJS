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
  }
}
