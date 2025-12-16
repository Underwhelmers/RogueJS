function _engine_spawnEntities(engine) {
  // Find floors
  const floors = [];
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (!engine.get_tile(x,y).blocked)
        floors.push({ x, y });
    }
  }
  
  engine.playerId = spawn_player(engine.ecs, _pullRandomFloor(floors));
  
  for (let i = 0; i < 8; i++)
    spawn_goblin(engine.ecs, _pullRandomFloor(floors));
  
  spawn_downLadder(engine.ecs, _pullRandomFloor(floors));
}

function _pullRandomFloor(floors) {
  return floors.splice(Math.floor(Math.random() * floors.length), 1)[0];
}