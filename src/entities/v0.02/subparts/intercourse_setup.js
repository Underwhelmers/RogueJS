function generate_taste() {
  const vals = [[],[],[]];
  for (v in INTERCOURSE_OPTS.TOOLS)
    vals[0].push(v);
  for (v in INTERCOURSE_OPTS.DEPTH)
    vals[1].push(v);
  for (v in INTERCOURSE_OPTS.STYLE)
    vals[2].push(v);

  return new SecretGridVal(vals);
}


class SecretGridVal {
  constructor(vals) {
    this.values = [];
    for (let j = 0; j < vals.length; j++) {
      const offset = 4-vals[j].length; 
      // offset for the largest value to be 3.
      // for 5 -1,0,1,2,3;
      this.values[j] = _svg_prep_vals(vals[j], offset)
    }
  }

  evaluate(options) {
    let value = 0;
    for (let i =0; i < options.length; i++)
      value += this.values[i][options[i]];
    return value;
  }
}


function _svg_prep_vals(list, offset) {
  const dict = {};
  shuffle_array(list);
  for (let i = 0; i < list.length; i++)
      dict[list[i]] = i + offset;
  return dict;
}



const INTERCOURSE_OPTS = {
  TOOLS: {
    TOY:    {tag:'toy',    },
    DICK:   {tag:'dick',   },
    FIST:   {tag:'fist',   },
    FINGER: {tag:'finger', },
    TONGUE: {tag:'tongue', },
  },
  DEPTH: {
    RIMMING:     {tag:'rimming'    , val:0.01   },
    SHALLOW:     {tag:'shallow'    , val:0.20   },
    MEASURED:    {tag:'measured'   , val:0.95   },
    DEEP:        {tag:'deep'       , val:1.05   },
    BEYOND_DEEP: {tag:'beyond-deep', val:100000 },
  },
  STYLE: {
    FAST:     {tag:'fast'    , val:0.01  },
    ROUGH:    {tag:'rough'   , val:0.2   },
    EDGING:   {tag:'edging'  , val:0.95  },
    NON_STOP: {tag:'non-stop', val:1.05  },
    INTIMATE: {tag:'intimate', val:10000 },    
  }
}