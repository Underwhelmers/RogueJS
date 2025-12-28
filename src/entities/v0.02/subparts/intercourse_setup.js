function generate_taste() {
  const vals = [[],[],[]];
  for (v in INTERCOURSE_OPTS.TOOLS)
    vals[0].push(INTERCOURSE_OPTS.TOOLS[v].tag);
  for (v in INTERCOURSE_OPTS.DEPTH)
    vals[1].push(INTERCOURSE_OPTS.DEPTH[v].tag);
  for (v in INTERCOURSE_OPTS.STYLE)
    vals[2].push(INTERCOURSE_OPTS.STYLE[v].tag);

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
