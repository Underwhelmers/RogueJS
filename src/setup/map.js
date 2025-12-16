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