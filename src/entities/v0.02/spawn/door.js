function spawn_door(engine, pos) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'D', fg: COLORS.TREE_BACK, bg: COLORS.DARK_FLOOR });
  
  const state = { 
    isopen: Math.random() < 0.5, 
    islocked: Math.random() < 0.5,
  };
  state['islocked'] &= !state['isopen'];
  ecs.add(id, 'state', state);
  
  if (!state['isopen'])
    ecs.add(id, 'blocks', {});
  
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
  else
    add_menu_option('o',' [O] Open it.'  , () => effect_open_door(engine,target,state));

  add_menu_option('r',' [R] Reverse.'    , () => close_menu());
}
  
function effect_open_door(engine,target,state) {
  if (state.islocked) {    
    log_text("Is locked.");
  } else {
    state.isopen = true;
    engine.ecs.remove_comp(target,'blocks');
    log_text("Is open.");
  }
  close_menu();
}