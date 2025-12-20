function setup_world_generation(engine) {
  engine.world = new WorldChunked();
  engine.world.perlin = new RiverPerlin()
    .fast_setup(10,200,10)
    .rotate(Math.random()*360)
    .river_offset({x:0,y:0}, val => val < 0.05);
}

function generate_world(engine) {
  engine.world.for_new_chunk = function (chunk) {
    const floors = generate_river_path(engine, chunk);
    if (Math.random() < 0.25) {
      const pos = pull_random(floors);
      if (pos) spawn_goblin(engine, pos);
    }
  }
  
  engine.playerId = spawn_player(engine, {x:0, y:0});
}

function generate_river_path(engine, chunk) {
  const river = engine.world.perlin;
  const floors = [];
  for (let y = 0; y < CHUNK_H; y++) {
    for (let x = 0; x < CHUNK_W; x++) {
      const wx = x+chunk.xoff;
      const wy = y+chunk.yoff;
      if (river.noise(wx, wy) < 0.05) {
        engine.world.set_tile(wx,wy,WorldTiles.FLOOR);
        floors.push({ x:wx, y:wy });
      }
    }
  }
  return floors;
}