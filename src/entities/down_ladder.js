function spawn_downLadder(ecs, pos) {
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'L', fg: COLORS.BLACK, bg: COLORS.LIGHT_FLOOR });
  ecs.add(id, 'interactible', { type:'next_level' });
  ecs.add(id, 'blocks', {});
  return id;
}