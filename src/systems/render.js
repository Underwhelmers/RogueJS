const DARKVISIBLE = new Set([
  WorldTiles.WALL.char,
  WorldTiles.TREE.char,
]);


class SystemRender {
  process(engine) {
    this.computeFov(engine);
    this.updateCamera(engine);
    this.render(engine);
  }
  
  computeFov(engine) {
    engine.fov.clear();
    const pos = engine.ecs.get(engine.playerId, 'position');
    
    const xini = Math.floor(pos.x-SCR_W/2);
    const yini = Math.floor(pos.y-SCR_H/2);
    const xfin = Math.ceil(pos.x+SCR_W/2);
    const yfin = Math.ceil(pos.y+SCR_H/2);
    
    for (let y = yini; y < yfin; y++) {
      for (let x = xini; x < xfin; x++) {
        if (engine.isVisible(pos.x, pos.y, x, y)) {
          engine.fov.add(`${x};${y}`);
          engine.explored.add(`${x};${y}`);
        }
      }
    }
  }

  updateCamera(engine) {
    const pos = engine.ecs.get(engine.playerId, 'position');
    engine.camera.x = pos.x - Math.floor(SCR_W / 2);
    engine.camera.y = pos.y - Math.floor(SCR_H / 2);
  }

  render(engine) {
    engine.ctx.fillStyle = COLORS.BLACK;
    engine.ctx.fillRect(0, 0, engine.canvas.width, engine.canvas.height);

    for (let sy = 0; sy < SCR_H; sy++) {
      for (let sx = 0; sx < SCR_W; sx++) {
        this.renderTile(engine, sx, sy)
      }
    }
    
    for (let key of engine.explored) {
      this.darkenExplored(engine,key);
    }

    const entities = engine.ecs.query('position', 'renderable').sort((a, b) => {
      const pa = engine.ecs.get(a, 'position'), pb = engine.ecs.get(b, 'position');
      return pa.y !== pb.y ? pa.y - pb.y : pa.x - pb.x;
    });
    for (let id of entities) {
      this.renderEntity(engine, id);
    }
  }
  
  renderTile(engine, sx, sy) {
    const wx = engine.camera.x + sx;
    const wy = engine.camera.y + sy;
    
    const tile = engine.get_tile(wx,wy);
    const key = `${wx};${wy}`;
    let visible = engine.fov.has(key);
    let char = tile.char;
    let fg = visible ? tile.fg.replace('DARK', 'LIGHT') : COLORS.DARK_FLOOR;
    let bg = visible ? COLORS.LIGHT_FLOOR : COLORS.DARK_FLOOR;

    engine.ctx.fillStyle = bg;
    engine.ctx.fillRect(sx * CELL_W, sy * CELL_H, CELL_W, CELL_H);
    engine.ctx.fillStyle = fg;
    engine.ctx.fillText(char, sx * CELL_W + CELL_W / 2, sy * CELL_H + CELL_H / 2);
  }
  
  darkenExplored(engine, key) {
    const [wx, wy] = key.split(';').map(Number);
    const sx = wx - engine.camera.x;
    const sy = wy - engine.camera.y;
    if (engine.fov.has(key)) return;
    const tile = engine.get_tile(wx,wy);
    engine.ctx.fillStyle = COLORS.DARK_FLOOR;
    engine.ctx.fillRect(sx * CELL_W, sy * CELL_H, CELL_W, CELL_H);
    
    engine.ctx.fillStyle = COLORS.DARK_FLOOR;
    
    if (DARKVISIBLE.has(tile.char))
      engine.ctx.fillStyle = COLORS.DARK_WALL;
    
    engine.ctx.fillText(tile.char, sx * CELL_W + CELL_W / 2, sy * CELL_H + CELL_H / 2);
  }
  
  renderEntity(engine, id) {
    const pos = engine.ecs.get(id, 'position');
    const ren = engine.ecs.get(id, 'renderable');
    const sx = pos.x - engine.camera.x;
    const sy = pos.y - engine.camera.y;
    
    if (sx < 0 || sy < 0) return;
    if (sx >= SCR_W || sy >= SCR_H) return;
    
    const key = `${pos.x};${pos.y}`;
    if (!engine.fov.has(key)) return;

    if (ren.bg) {
      engine.ctx.fillStyle = ren.bg;
      engine.ctx.fillRect(sx * CELL_W, sy * CELL_H, CELL_W, CELL_H);
    }
    engine.ctx.fillStyle = ren.fg;
    engine.ctx.fillText(ren.char, sx * CELL_W + CELL_W / 2, sy * CELL_H + CELL_H / 2);
  }
}
