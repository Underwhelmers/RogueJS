function generate_taste() {
  const vals = [[],[],[]];
  for (v in INTERCOURSE_OPTS.TOOLS)
    vals[0].push(INTERCOURSE_OPTS.TOOLS[v]);
  for (v in INTERCOURSE_OPTS.DEPTH)
    vals[1].push(INTERCOURSE_OPTS.DEPTH[v]);
  for (v in INTERCOURSE_OPTS.STYLE)
    vals[2].push(INTERCOURSE_OPTS.STYLE[v]);

  return new SecretGridVal(vals);
}


class SecretGridVal {
  constructor(vals) {
    this.values = [];
    for (let j = 0; j < vals.length; j++) {
      const offset = -1;
      this.values[j] = _svg_prep_vals(vals[j], offset)
    }

    const cat = irandom(vals.length);
    const best = vals[cat][vals[cat].length-1];
    this.hint = best.indicators.pull();
  }

  evaluate(options) {
    let value = 0;
    for (let i = 0; i < options.length; i++)
      value += this.values[i][options[i]];
    return value;
  }
}


function _svg_prep_vals(list, offset) {
  const dict = {};
  shuffle_array(list);
  for (let i = 0; i < list.length; i++)
    dict[list[i].tag] = i + offset;
  return dict;
}
