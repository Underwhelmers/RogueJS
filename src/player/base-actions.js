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
  if (target.length == 0) return;
  
  for (const id of target) {
    const inter = engine.ecs.get(id,'interactible');
    switch (inter.type) {
      case 'attack'    : interaction_attack(engine, id);     break;
      case 'next_level': interaction_next_level(engine, id); break;
    }
  }
}