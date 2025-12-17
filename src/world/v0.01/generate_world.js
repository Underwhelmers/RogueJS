function setup_world_generation(engine) {
  engine.world = new SystemWorldGenerator();
}

function generate_world(engine) {
  _engine_generateMap(engine);
  _engine_spawnEntities(engine);
}

function _engine_generateMap(engine) {
  engine.world.for_new_chunk = function (chunk) {
    const floors = [];
    for (let y = 0; y < CHUNK_H; y++) {
      for (let x = 0; x < CHUNK_W; x++) {
        if (!chunk.tiles[y][x].blocked)
          floors.push({ x:x+chunk.xoff, y:y+chunk.yoff });
      }
    }
    
    for (let i = 0; i < 8; i++)
      spawn_tree(engine, _pullRandomFloor(floors));
    
    for (let i = 0; i < 3; i++)
      spawn_goblin(engine, _pullRandomFloor(floors));
  }
}

function _engine_spawnEntities(engine) {
  engine.playerId = spawn_player(engine, {x:0, y:0});
}

function _pullRandomFloor(floors) {
  return floors.splice(Math.floor(Math.random() * floors.length), 1)[0];
}