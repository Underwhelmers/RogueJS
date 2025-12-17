function generate_map(engine) {
  engine.tiles = [];
  _engine_generateMap(engine);
  _engine_spawnEntities(engine);
}

function _engine_generateMap(engine) {
  
}

function _engine_spawnEntities(engine) {
  // Find floors
  const floors = [];
  for (let y = 1; y < MAP_H; y++) {
    for (let x = 1; x < MAP_W; x++) {
      floors.push({ x, y });
    }
  }

  engine.playerId = spawn_player(engine.ecs, {x:0, y:0});

  for (let i = 0; i < 8; i++)
    spawn_goblin(engine.ecs, _pullRandomFloor(floors));
  
  spawn_downLadder(engine.ecs, _pullRandomFloor(floors));
}

function _pullRandomFloor(floors) {
  return floors.splice(Math.floor(Math.random() * floors.length), 1)[0];
}