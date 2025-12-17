function generate_map(engine) {
  engine.tiles = [];
  _engine_generateMap(engine);
  _engine_spawnEntities(engine);
}

function _engine_generateMap(engine) {
  // Init walls
  engine.tiles = Array.from(
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
  root.carveRooms(engine.tiles);
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
  
  engine.playerId = spawn_player(engine.ecs, _pullRandomFloor(floors));
  
  for (let i = 0; i < 8; i++)
    spawn_goblin(engine.ecs, _pullRandomFloor(floors));
  
  spawn_downLadder(engine.ecs, _pullRandomFloor(floors));
}

function _pullRandomFloor(floors) {
  return floors.splice(Math.floor(Math.random() * floors.length), 1)[0];
}

function _engine_isVisible(engine, px, py, x, y) {
  const dx = x - px;
  const dy = y - py;
  const dist = Math.max(Math.abs(dx), Math.abs(dy));
  if (dist <= 0) return true;
  if (dist > FOV_RADIUS) return false;
  for (let i = 0; i <= dist; i++) {
    const cx = px + Math.round((dx * i) / dist);
    const cy = py + Math.round((dy * i) / dist);
    if (cx < 0 || cx >= MAP_W || cy < 0 || cy >= MAP_H) return false;
    if (engine.get_tile(cx,cy).blocked) return false;
  }
  return true;
}

function _engine_isBlocked(engine, x, y) {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return true;
  if (engine.get_tile(x,y).blocked) return true;
  for (let id of engine.ecs.query('position', 'blocks')) {
    const epos = engine.ecs.get(id, 'position');
    if (epos.x === x && epos.y === y) return true;
  }
  return false;
}