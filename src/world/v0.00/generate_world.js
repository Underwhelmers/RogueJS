function setup_world_generation(engine) {
  engine.world = {
    tiles: [],
    get_tile: (x,y) => _engine_get_tile(engine,x,y)
  };
}

function _engine_get_tile(engine, x, y) {
  if (x < 0 || y < 0) 
    return { blocked: true, char: '#', fg: COLORS.DARK_WALL, bg: COLORS.BLACK };
  if (engine.world.tiles.length <= y)
    return { blocked: true, char: '#', fg: COLORS.DARK_WALL, bg: COLORS.BLACK };
  if (engine.world.tiles[y].length <= x)
    return { blocked: true, char: '#', fg: COLORS.DARK_WALL, bg: COLORS.BLACK };
  
  return engine.world.tiles[y][x];
}

function generate_world(engine) {
  engine.world.tiles = [];
  _engine_generateMap(engine);
  _engine_spawnEntities(engine);
  
  log_text("There are "+engine.ecs.query('ai').length.toString()+" scentient creatures.");
}


function _engine_generateMap(engine) {
  // Init walls
  engine.world.tiles = Array.from(
    { length: MAP_H },
    () => Array(MAP_W).fill({
      blocked: true,
      char: '#',
      fg: COLORS.DARK_WALL,
      bg: COLORS.BLACK
    })
  );

  // Simple BSP
  const root = new BSPNode(1, 1, MAP_W - 2, MAP_H - 2);
  root.split(4);
  root.createRooms();
  root.carveRooms(engine.world.tiles);
}

function _engine_spawnEntities(engine) {
  // Find floors
  const floors = [];
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (!engine.get_tile(x,y).blocked)
        floors.push({ x, y });
    }
  }
  
  engine.playerId = spawn_player(engine, pull_random(floors));
  
  for (let i = 0; i < 8; i++)
    spawn_goblin(engine, pull_random(floors));
  
  spawn_downLadder(engine, pull_random(floors));
}