function spawn_player(engine, pos) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: '@', fg: '#ff0000', bg: null });
  ecs.add(id, 'fighter', { hp: 30, maxHp: 30, atk: 5, def: 2 });
  ecs.add(id, 'player', {});
  ecs.add(id, 'blocks', {});
  return id
}