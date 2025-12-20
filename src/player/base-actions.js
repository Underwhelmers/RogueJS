function playerTryMove(engine, dx, dy) {
  const pos = engine.ecs.get(engine.playerId, 'position');
  const nx = pos.x + dx, ny = pos.y + dy;
  if (engine.isBlocked(nx, ny)) {
    player_interact(engine, nx, ny);
  } else {
    pos.x = nx;
    pos.y = ny;
  }
}

function player_interact(engine, x, y) {
  let target = engine.ecs.get_at(x, y);
  if (target.length == 0) {
    tile_interaction(engine, x,y);
    return;
  }
  
  for (const id of target) {
    player_entity_interaction(engine, id);
  }
}