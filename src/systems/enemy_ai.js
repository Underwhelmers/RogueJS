class SystemEnemyAI {
  process(engine) {
    const playerPos = engine.ecs.get(engine.playerId, 'position');
    for (let id of engine.ecs.query('ai', 'position')) {
      const pos = engine.ecs.get(id, 'position');
      if (engine.isVisible(playerPos.x, playerPos.y, pos.x, pos.y)) {
        this.act(engine, id, playerPos);
      }
    }
  }
  
  act(engine, id, playerPos) {
    const pos = engine.ecs.get(id, 'position');
    const dx = playerPos.x - pos.x;
    const dy = playerPos.y - pos.y;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    if (adx + ady === 1) {
      // Attack
      this.attack(engine, id, playerPos.x, playerPos.y);
    } else {
      // Move closer
      this.move(engine, id, pos, playerPos.x, playerPos.y, adx, ady);
    }
  }
  
  attack(engine, id, tx, ty) {
    const attacker = engine.ecs.get(id, 'fighter');
    let target = null;
    for (let tid of engine.ecs.query('position', 'fighter')) {
      const tpos = engine.ecs.get(tid, 'position');
      if (tpos.x === tx && tpos.y === ty) {
        target = tid;
        break;
      }
    }
    if (target) {
      const defender = engine.ecs.get(target, 'fighter');
      const damage = Math.max(0, attacker.atk - defender.def);
      defender.hp -= damage;
      if (defender.hp <= 0) {
        engine.ecs.remove(target);
        if (target === engine.playerId) {
          alert('Game Over! Refresh to restart.');
        }
      }
    }
  }
  
  move(engine, id, pos, px, py, adx, ady) {
    const dirs = [
      { dx: -1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 0, dy: -1 }, { dx: 0, dy: 1 },
      { dx: -1, dy: -1 }, { dx: 1, dy: -1 }, { dx: -1, dy: 1 }, { dx: 1, dy: 1 }
    ];
    let bestDirs = [];
    let bestDist = adx + ady;
    for (let dir of dirs) {
      const nx = pos.x + dir.dx, ny = pos.y + dir.dy;
      if (!engine.isBlocked(nx, ny)) {
        const dist = Math.abs(px - nx) + Math.abs(py - ny);
        if (dist < bestDist) {
          bestDist = dist;
          bestDirs = [dir];
        } else if (dist === bestDist) {
          bestDirs.push(dir);
        }
      }
    }
    if (bestDirs.length > 0) {
      const dir = bestDirs[Math.floor(Math.random() * bestDirs.length)];
      pos.x += dir.dx;
      pos.y += dir.dy;
    }
  }
}