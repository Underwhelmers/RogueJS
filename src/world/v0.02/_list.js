function world_files() {
  const REL_PATH = 'world/v0.02/';
  const JS_FILES = [
    'setup-engine.js',
    'river-perlin.js',
    'world-chunked.js',
  ];

  ScriptLibrary.files = JS_FILES
    .map((fil) => REL_PATH + fil)
    .concat(ScriptLibrary.files);
}

world_files();