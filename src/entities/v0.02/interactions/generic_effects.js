function effect_overlap_taraget(engine, target) {
  const pj = engine.ecs.get(engine.playerId, 'position');
  const targ = engine.ecs.get(target, 'position');
  pj.x = targ.x;
  pj.y = targ.y;
  
  close_menu();
}