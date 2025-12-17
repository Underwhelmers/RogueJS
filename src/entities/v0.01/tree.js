function spawn_tree(engine, pos) {
  const tile = engine.get_tile(pos.x,pos.y);
  tile.blocked = true;
  tile.char = 'T';
  
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'T', fg: '#00aa00', bg: '#895129' });
  ecs.add(id, 'blocks', {});
  
  return id
}