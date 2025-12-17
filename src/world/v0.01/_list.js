function world_files() {
  const REL_PATH = 'world/v0.01/';
  const JS_FILES = [
    'generate_world.js',
    'world_generator.js',
  ];

  ScriptLibrary.files = JS_FILES
    .map((fil) => REL_PATH + fil)
    .concat(ScriptLibrary.files);
}

world_files();