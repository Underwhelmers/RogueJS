function interaction_intercourse(engine, target, hole) {
  const aspect = engine.ecs.get(target, 'aspect');
  const desc = `A goblin with ${aspect.uniqueness}. Stops and presents their ${hole} for you to use.`;

  open_menu(desc);
  add_menu_option('u',` [U] Use their ${hole}`, () => effect_intercourse_option1(engine,target,hole))
  add_menu_option('r',' [R] Reject the offer.', () => close_menu());
  log_info('Fucked');
}

const chosenvals = [];
function effect_intercourse_option1(engine, target, hole) {
  open_menu(`Her ${hole} is asking for your:`);
  add_menu_option('h',' [H] Hand.'  , () => effect_intercourse_store_opt1(engine, target, hole,INTERCOURSE_OPTS.TOOLS.FINGER));
  add_menu_option('d',' [D] Dick.'  , () => effect_intercourse_store_opt1(engine, target, hole,INTERCOURSE_OPTS.TOOLS.DICK));
  add_menu_option('t',' [T] Tongue.', () => effect_intercourse_store_opt1(engine, target, hole,INTERCOURSE_OPTS.TOOLS.TONGUE));
  add_menu_option('f',' [F] Fist.'  , () => effect_intercourse_store_opt1(engine, target, hole,INTERCOURSE_OPTS.TOOLS.FIST));
  add_menu_option('o',' [O] Object.', () => effect_intercourse_store_opt1(engine, target, hole,INTERCOURSE_OPTS.TOOLS.TOY));
  add_menu_option('c',' [C] CLOSE.' , () => close_menu());
}
function effect_intercourse_store_opt1(engine, target, hole, opt1) {
  chosenvals[0] = opt1;
  effect_intercourse_option2(engine, target, hole);
}

function effect_intercourse_option2(engine, target, hole) {
  open_menu(`How far wil you take it?:`);
  add_menu_option('r',' [R] Rimming'    , () => effect_intercourse_store_opt2(engine, target, hole, INTERCOURSE_OPTS.DEPTH.RIMMING));
  add_menu_option('s',' [S] Shallow'    , () => effect_intercourse_store_opt2(engine, target, hole, INTERCOURSE_OPTS.DEPTH.SHALLOW));
  add_menu_option('m',' [M] Measured'   , () => effect_intercourse_store_opt2(engine, target, hole, INTERCOURSE_OPTS.DEPTH.MEASURED));
  add_menu_option('d',' [D] Deep'       , () => effect_intercourse_store_opt2(engine, target, hole, INTERCOURSE_OPTS.DEPTH.DEEP));
  add_menu_option('b',' [B] Beyond deep', () => effect_intercourse_store_opt2(engine, target, hole, INTERCOURSE_OPTS.DEPTH.BEYOND_DEEP));
  add_menu_option('c',' [C] CLOSE.' , () => close_menu());
}
function effect_intercourse_store_opt2(engine, target, hole, opt) {
  chosenvals[1] = opt;
  effect_intercourse_option3(engine, target, hole);
}

function effect_intercourse_option3(engine, target, hole) {
  open_menu(`What style will you use on them?:`);
  add_menu_option('f',' [F] Fast.'    , () => effect_intercourse_store_opt3(engine, target, hole, INTERCOURSE_OPTS.STYLE.FAST));
  add_menu_option('r',' [R] Rough.'   , () => effect_intercourse_store_opt3(engine, target, hole, INTERCOURSE_OPTS.STYLE.ROUGH));
  add_menu_option('e',' [E] Edging.'  , () => effect_intercourse_store_opt3(engine, target, hole, INTERCOURSE_OPTS.STYLE.EDGING));
  add_menu_option('n',' [N] Non-stop.', () => effect_intercourse_store_opt3(engine, target, hole, INTERCOURSE_OPTS.STYLE.NON_STOP));
  add_menu_option('i',' [I] Intimate.', () => effect_intercourse_store_opt3(engine, target, hole, INTERCOURSE_OPTS.STYLE.INTIMATE));
  add_menu_option('c',' [C] CLOSE.' , () => close_menu());
}
function effect_intercourse_store_opt3(engine, target, hole, opt) {
  chosenvals[2] = opt;
  apply_effect_intercourse(engine, target, hole);
}

function apply_effect_intercourse(engine, target, hole) {
  const bodyPJ = engine.ecs.get(engine.playerId, 'body');
  const bodyTARG = engine.ecs.get(target, 'body');

  const tool = effect_intercourse_get_tool(bodyPJ);
  const cavity = effect_intercourse_get_cavity(bodyTARG, hole);

  const pen = setup_penetration(tool,cavity);
  const result = build_penetration_tags(cavity, tool, pen);
  const narrative = pen.interpret_tags(cavity, tool, result);

  log_text('----------------');
  for (const it of narrative)
    log_text(it);
  log_text('');
  const to_evaluate = [chosenvals[0].tag,chosenvals[1].tag,chosenvals[2].tag];
  log_text(`They scored you ${cavity.taste.evaluate(to_evaluate)}/9 when using: ${to_evaluate[0]}, ${to_evaluate[1]}, ${to_evaluate[2]}.`);

  close_menu();  
}

function effect_intercourse_get_cavity(body, hole) {
  return body[hole];
}
function effect_intercourse_get_tool(body) {
  return body[chosenvals[0].tag];
}

function setup_penetration(phallus, cavity) {
  const pen = new Penetration();
  pen.progress = Math.max(cavity.depth * chosenvals[1].val, phallus .length);
  pen.speed = pen.progress * 0.5;
  pen.friction = 0.2;

  const style = chosenvals[2];

  if (style == INTERCOURSE_OPTS.STYLE.FAST) {
    pen.speed = pen.progress;
  }
  else if (style == INTERCOURSE_OPTS.STYLE.ROUGH) {
    pen.friction = 1.1;
  }
  else if (style == INTERCOURSE_OPTS.STYLE.EDGING) {
    pen.tags.push('edging');
  }
  else if (style == INTERCOURSE_OPTS.STYLE.NON_STOP) {
    pen.numbness = 0.6;
  }
  else if (style == INTERCOURSE_OPTS.STYLE.INTIMATE) {
    pen.tags.push('intimate');
  }
  return pen;
}