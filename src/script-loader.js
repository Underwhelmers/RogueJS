const ScriptLibrary = {
  async loadFrom(relPath) {
    for (const src of this.files) {
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
  'core/BSPNode.js',
  'core/ecs.js',
  
  'systems/enemy_ai.js',
  'systems/render.js',
  
  'entities/goblin.js',
  'entities/player.js',
  'entities/down_ladder.js',
  
  'player/input.js',
  'player/debugging.js',
  'player/base_actions.js',
  'player/text_display.js',
  'player/interactions/enemy.js',
  'player/interactions/environment.js',
  
  'setup/entities.js',
  'setup/map.js',
  
  'engine/asks.js',
  'engine/base.js',
  
  'init.js',
];