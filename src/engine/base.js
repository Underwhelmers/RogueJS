class Engine {
  initialize() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = SCR_W * CELL_W;
    this.canvas.height = SCR_H * CELL_H;
    this.ctx.font = `${CELL_H}px "Courier New", monospace`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.systems = [
      new SystemEnemyAI(),
      new SystemRender()
    ];
        
    setup_player_input(this);   
    this.generate_level();
  }
  
  generate_level() {
    this.ecs = new ECS();
    this.tiles = [];
    this.fov = new Set();
    this.explored = new Set();
    this.camera = { x: 0, y: 0 };
    this.playerId = null;
    
    _engine_generateMap(this);
    _engine_spawnEntities(this);
    
    log_text("There are "+this.ecs.query('ai').length.toString()+" scentient creatures.");
    
    this.render();
  }
  
  progress() {
    for (const sys of this.systems) {
      sys.process(this);
    }
  }
  
  isBlocked(x, y) {
    return _engine_isBlocked(this, x, y);
  }
  isVisible(px, py, x, y) {
    return _engine_isVisible(this, px, py, x, y);
  }
  
  render() {
    this.systems[1].process(this);
  }
  
  get_tile(x, y) {
    if (x < 0 || y < 0) 
      return { blocked: true, char: '#', fg: COLORS.DARK_WALL, bg: COLORS.BLACK };
    if (this.tiles.length <= y)
      return { blocked: true, char: '#', fg: COLORS.DARK_WALL, bg: COLORS.BLACK };
    if (this.tiles[y].length <= x)
      return { blocked: true, char: '#', fg: COLORS.DARK_WALL, bg: COLORS.BLACK };
    
    return this.tiles[y][x];
  }
}