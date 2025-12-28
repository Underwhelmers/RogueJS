const heldKeys = new Map();
const unhandled = new Set([
  'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','Enter'
]);
const KEY_HELD_FIRST_DELAY = 300;
const KEY_HELD_RE_TRIGGER = 100;

function setup_player_input(engine) {
  document.addEventListener('keydown', (e) => {
    if (unhandled.has(e.key)) {
      player_unhandled_keys(engine, e.key);
      return;
    }
    if (heldKeys.has(e.key)) return; // ignore OS auto-repeat

    heldKeys.set(e.key, true);

    handleKey(engine, e.key);

    // start delayed repeat
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        handleKey(engine, e.key);
      }, KEY_HELD_RE_TRIGGER);

      heldKeys.set(e.key, { interval });
    }, KEY_HELD_FIRST_DELAY);

    heldKeys.set(e.key, { delay });
    e.preventDefault();
  });

  document.addEventListener('keyup', (e) => {
    clearKey(e.key);
  });
}

function handleKey(engine, key) {
  if (menu_open) {
    player_menu_navigation_input(engine, key);
  }
  else {
    player_moveandact_input(engine, key);
  }
}

function clearKeys() {
  for (const k of heldKeys)
    clearKey(k[0]);
}
function clearKey(key) {
  const data = heldKeys.get(key);
  if (!data) return;

  if (data.delay) clearTimeout(data.delay);
  if (data.interval) clearInterval(data.interval);

  heldKeys.delete(key);
}

function player_menu_navigation_input(engine, key) {
  menu_check(key);
  
  if (!menu_open)
    engine.progress();
}

function player_moveandact_input(engine, key) {
  const dirs = {
    ArrowUp: { dx: 0, dy: -1 },
    ArrowDown: { dx: 0, dy: 1 },
    ArrowLeft: { dx: -1, dy: 0 },
    ArrowRight: { dx: 1, dy: 0 }
  };
  
  const dir = dirs[key];
  if (dir) {
    playerTryMove(engine, dir.dx, dir.dy);
    engine.progress();
  }
}

function player_unhandled_keys(engine, key) {
  switch(key) {
    case 'Enter':
      const pos = engine.ecs.get(engine.playerId,'position');
      log_text(`  DEBUG: X(${pos.x}) Y(${pos.y})`);
  }
}