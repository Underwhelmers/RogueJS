function spawn_loot(engine, pos, content = {}) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'l', fg: COLORS.GOLD, bg: null });
  ecs.add(id, 'content', content)
  ecs.add(id, 'blocks', {});
  
  ecs.add(id, 'interactible', { 
    eff:() => interaction_loot(engine,id) 
  });

  return id;
}

function interaction_loot(engine, target) {
  const content = engine.ecs.get(target,'content');
  open_menu(`You find ${content.desc}.`);
  
  add_menu_option('p',' [P] Pick up.' , () => effect_pick_up_loot(engine,target));
  add_menu_option('l',' [L] Leave it be.' , () => close_menu());
}

function effect_pick_up_loot(engine, target) {
  const content = engine.ecs.get(target,'content');
  engine.ecs.remove(target);

  const inventory = engine.ecs.get(engine.playerId, 'inventory');
  for (const key in content.vals) {
    inventory[key] = content.vals[key];
  }
  
  close_menu();
}