function _engine_isVisible(engine, px, py, x, y) {
  const dx = x - px;
  const dy = y - py;
  const dist = Math.max(Math.abs(dx), Math.abs(dy));
  if (dist <= 0) return true;
  if (dist > FOV_RADIUS) return false;
  
  let obscured = 0;
  for (let i = 1; i <= dist; i++) {
    const cx = px + Math.round((dx * i) / dist);
    const cy = py + Math.round((dy * i) / dist);
    const tile = engine.get_tile(cx, cy);
    
    if (tile.opacity) {
      obscured += tile.opacity;
    } else if (obscured) {
      return false;
    }
    
    if (obscured > 1)
      return false;
  }
  return true;
}

function _engine_isBlocked(engine, x, y) {
  const tile = engine.get_tile(x, y);
  if (tile.blocked) return true;
  for (let id of engine.ecs.query('position', 'blocks')) {
    const epos = engine.ecs.get(id, 'position');
    if (epos.x === x && epos.y === y) return true;
  }
  return false;
}