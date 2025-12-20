function spawn_downLadder(engine, pos) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'L', fg: COLORS.BLACK, bg: COLORS.LIGHT_FLOOR });
  ecs.add(id, 'blocks', {});
  
  ecs.add(id, 'interactible', { 
    eff: () => interaction_next_level(engine,id)
  });

  return id;
}

function interaction_next_level(engine, target) {
  open_menu('There is a ladder in your way.');
  add_menu_option('w',' [W] Walk over.'       , () => effect_overlap_taraget(engine,target));
  add_menu_option('a',' [A] Ascend using it.' , () => effect_ascend_using_stair(engine));
  add_menu_option('r',' [R] Reverse.'         , () => close_menu());
}
  
function effect_ascend_using_stair(engine) {
  engine.generate_level();
  close_menu();
}