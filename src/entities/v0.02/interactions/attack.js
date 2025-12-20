function interaction_attack(engine, target) {
  const aspect = engine.ecs.get(target, 'aspect');
  const desc = `A goblin with ${aspect.skin.detail} in ${aspect.skin.hue} skin. And ${aspect.uniqueness}.`;
  
  open_menu(desc);
  add_menu_option('v',' [V] Piston vagina.'    , () => effect_attack(engine,target,'vagi'));
  add_menu_option('f',' [F] Facefuck.'         , () => effect_attack(engine,target,'face'));
  add_menu_option('a',' [A] Anal destruction.' , () => effect_attack(engine,target,'anal'));
  add_menu_option('r',' [R] Run.'              , () => close_menu());
}
  
function effect_attack(engine, target, orifice) {
  const attacker = engine.ecs.get(engine.playerId, 'shaft').shaft;
  const defender = engine.ecs.get(target, 'body');

  const cavity = effect_attack_get_cavity(defender, orifice);

  const pen = new Penetration();
  pen.speed = attacker.length;
  pen.progress = attacker.length;

  const result = build_penetration_tags(cavity, attacker, pen);
  
  const narrative = pen.interpret_tags(cavity, attacker, result);

  log_text('----------------');
  for (const it of narrative)
    log_text(it);
  log_text('');
  log_text('And aftar that they fall satisfied.');
  engine.ecs.remove(target);

  close_menu();
}

function effect_attack_get_cavity(body, orifice) {
  switch (orifice) {
    case 'vagi': return body.vagina;
    case 'anal': return body.anus;
    case 'face': return body.mouth;
  }
  return undefined;
}