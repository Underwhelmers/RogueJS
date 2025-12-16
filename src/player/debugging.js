const unhandled = new Set([
  'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','Enter'
]);

function player_skip_key(key) {
  return unhandled.has(key);
}

function player_unhandled_keys(engine, key) {
  switch(key) {
    case 'Enter':
      const pos = engine.ecs.get(engine.playerId,'position');
      log_text(`  DEBUG: X(${pos.x}) Y(${pos.y})`);
  }
}