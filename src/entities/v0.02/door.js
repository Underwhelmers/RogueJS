function spawn_door(engine, pos) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'D', fg: COLORS.TREE_BACK, bg: COLORS.DARK_FLOOR });
  ecs.add(id, 'blocks', {});
  ecs.add(id, 'state', { 
    isopen: Math.random() < 0.5, 
    islocked: !isopen && Math.random() < 0.5,
  });
  
  ecs.add(id, 'interactible', { 
    eff: () => interaction_open_door(engine,id)
  });

  return id;
}

function interaction_open_door(engine, target) {
  open_menu('There is a dor in your way.');
  const state = engine.ecs.get(target, 'state');

  if (state.isopen)
    add_menu_option('w',' [W] Walk over.', () => effect_overlap_taraget(engine,target));
  if (!state.isopen)
    add_menu_option('o',' [O] Open it.'  , () => effect_open_door(state));
  add_menu_option('r',' [R] Reverse.'    , () => close_menu());
}
  
function effect_open_door(state) {
  if (state.islocked) {    
    log_text("Is locked.");
  } else {
    state.isopen = true;
    log_text("Is open.");
  }
  close_menu();
}