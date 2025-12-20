function spawn_tree(engine, pos) {
  engine.set_tile(pos.x,pos.y,  WorldTiles.TREE);
  
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'T', fg: '#00aa00', bg: '#895129' });
  ecs.add(id, 'blocks', {});
  
  ecs.add(id, 'interactible', { 
    eff:() => interaction_cut_down_tree(engine,id)
  });

  return id
}


function interaction_cut_down_tree(engine, target) {
  open_menu('There is a tree in your way.');
  
  const inventory = engine.ecs.get(engine.playerId, 'inventory')
  if (inventory.axe && inventory.axe.durability > 0) {
    add_menu_option('c',' [C] Cut it down.' , () => effect_cut_down_tree(engine,target));
  }
  add_menu_option('l',' [L] Leave it be.' , () => close_menu());
}

function effect_cut_down_tree(engine, target) {
  const pos = engine.ecs.get(target,'position');
  engine.ecs.remove(target);
  engine.set_tile(pos.x,pos.y,WorldTiles.FLOOR);
  
  const inventory = engine.ecs.get(engine.playerId, 'inventory')
  inventory.axe.durability -= 1;
  close_menu();
}