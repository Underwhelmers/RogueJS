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
