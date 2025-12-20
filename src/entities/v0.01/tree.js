function spawn_tree(engine, pos) {
  engine.set_tile(pos.x,pos.y,  WorldTiles.TREE);
  
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'T', fg: '#00aa00', bg: '#895129' });
  ecs.add(id, 'interactible', { type:'cut_down' })
  ecs.add(id, 'blocks', {});
  
  return id
}