function interaction_attack(engine, target) {
  const aspect = engine.ecs.get(target, 'aspect');
  const desc = `A goblin with ${aspect.skin.detail} in ${aspect.skin.hue} skin. And ${aspect.uniqueness}.`;
  
  open_menu(desc);
  add_menu_option('f',' [F] Lick their face.'   , () => effect_attack(engine,target));
  add_menu_option('c',' [C] Lick their crotch.' , () => effect_attack(engine,target));
  add_menu_option('a',' [A] Lick their anus.'   , () => effect_attack(engine,target));
  add_menu_option('r',' [R] Run.'               , () => close_menu());
}
  
function effect_attack(engine, target) {
  const attacker = engine.ecs.get(engine.playerId, 'fighter');
  const defender = engine.ecs.get(target, 'fighter');
  const damage = Math.max(0, attacker.atk - defender.def);
  defender.hp -= damage;
  if (defender.hp <= 0) {
    log_text('They fall uncontious.');
    engine.ecs.remove(target);
  } else {
    log_text('Your actions affected them.');
  }
  
  close_menu();
}