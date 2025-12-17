function spawn_goblin(engine, pos) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'g', fg: '#00ff00', bg: null });
  ecs.add(id, 'fighter', { hp: 10, maxHp: 10, atk: 3, def: 0 });
  ecs.add(id, 'interactible', { type:'attack' })
  ecs.add(id, 'ai', {});
  ecs.add(id, 'blocks', {});
  return id
}