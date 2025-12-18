function entities_files() {
  const REL_PATH = 'entities/v0.01/';
  const JS_FILES = [
    'down_ladder.js',
    'goblin.js',
    'player.js',
    'tree.js',

    'subparts/cavity.js',
    'subparts/shaft.js',

    'interactions/enemy.js',
    'interactions/environment.js',

    'descriptions/goblin_values_lists.js',

    'penetration/class.js',
    'penetration/tags.js',
    'penetration/descriptor.js',
  ];

  ScriptLibrary.files = JS_FILES
    .map((fil) => REL_PATH + fil)
    .concat(ScriptLibrary.files);
}

entities_files();