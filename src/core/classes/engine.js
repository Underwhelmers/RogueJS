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
    
    setup_world_generation(this);
    setup_player_input(this);
    
    this.generate_level();
  }
  
  generate_level() {
    this.ecs = new ECS();
    this.fov = new Set();
    this.explored = new Set();
    this.camera = { x: 0, y: 0 };
    this.playerId = null;
    
    generate_world(this);
    
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
  
  get_tile(x,y) {
    return this.world.get_tile(x,y);
  }
  set_tile(x,y,data) {
    return this.world.set_tile(x,y,data);
  }
}