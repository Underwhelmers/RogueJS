function setup_player_input(engine) {
  document.addEventListener('keydown', (e) => {
    if (player_skip_key(e.key)) {
      player_unhandled_keys(engine, e.key);
    }
    else if (menu_open) {
      player_menu_navigation_input(engine, e.key);
      e.preventDefault();
    }
    else {
      player_moveandact_input(engine, e.key);
      e.preventDefault();
    }
  });
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