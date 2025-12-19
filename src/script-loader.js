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
  'core/engine-asks.js',
  'core/utilities.js',
  
  'core/classes/ecs.js',
  'core/classes/value-bag.js',
  'core/classes/varied-tag-puller.js',
  'world/world-tiles.js', // Almost core
  
  'systems/enemy-ai.js',
  'systems/render.js',

  'player/input.js',
  'player/debugging.js',
  'player/base-actions.js',
  'player/text-display.js',
  
  'entities/v0.01/_list.js',
  'world/v0.00/_list.js',
  
  'core/classes/engine.js',
  'init.js',
];