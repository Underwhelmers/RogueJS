const ScriptLibrary = {
  async loadFrom(relPath) {
    while(this.files.length > 0) {
      const src = this.files.splice(0, 1)[0];
      await this.addScript(relPath+src);
    }
    console.log('All scripts loaded.');
  },

  addScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
};

// Sensible al orden.
// Mantener dependencias cargadas en orden correcto.
ScriptLibrary.files = [
  'core/consts.js',
  'core/ecs.js',
  'core/engine_asks.js',
  'core/utilities.js',
  'core/value-bag.js',
  
  'systems/enemy_ai.js',
  'systems/render.js',
  
  'entities/goblin.js',
  'entities/player.js',
  'entities/tree.js',
  'entities/down_ladder.js',
  
  'player/input.js',
  'player/debugging.js',
  'player/base_actions.js',
  'player/text_display.js',

  'player/interactions/v0.00/_list.js',
  
  'world/v0.01/generate_world.js',
  'world/v0.01/world_generator.js',
  
  'core/engine.js',
  'init.js',
];