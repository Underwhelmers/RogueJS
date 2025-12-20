function tile_interaction(engine,x,y) {
  const tile = engine.get_tile(x,y);
  switch (tile.char) {
    case 'T': 
      const id = spawn_tree(engine, {x:x, y:y});
      player_entity_interaction(engine, id);
      break;

    default:
      return;
  }
}