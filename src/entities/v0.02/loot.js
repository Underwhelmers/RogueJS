function spawn_loot(engine, pos, key, val) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'l', fg: COLORS.GOLD, bg: null });
  ecs.add(id, 'content', {key, val})
  ecs.add(id, 'blocks', {});
  
  ecs.add(id, 'interactible', { 
    eff:() => interaction_loot(engine,id) 
  });

  return id;
}