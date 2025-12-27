function spawn_player(engine, pos) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: '@', fg: '#ff0000', bg: null });
  ecs.add(id, 'fighter', { hp: 30, maxHp: 30, atk: 5, def: 2 });
  ecs.add(id, 'player', {});
  ecs.add(id, 'blocks', {});
  ecs.add(id, 'inventory', {});

  ecs.add(id, 'body', make_player_body());

  return id;
}

function make_player_body() {
  const builder = new PhallusBuilder()
    .with_size(BODY_SIZE.MEDIUM)
    .with_parameter_variation(0.5)
    .with_physonomy(BODY_PHYSONOMY.MONSTER_DICK)
  ;

  return builder.build();
}