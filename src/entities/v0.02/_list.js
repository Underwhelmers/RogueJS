function entities_files() {
  const REL_PATH = 'entities/v0.02/';
  const JS_FILES = [
    'spawn/down_ladder.js',
    'spawn/goblin.js',
    'spawn/player.js',
    'spawn/tree.js',
    'spawn/loot.js',
    'spawn/door.js',

    'interactions/for_tiles.js',
    'interactions/player_entity.js',
    'interactions/attack.js',
    'interactions/generic_effects.js',

    'subparts/shaft.js',
    'subparts/cavities/cavity.js',
    'subparts/cavities/factory.js',
    'subparts/cavities/mouth.js',
    'subparts/cavities/rectum.js',
    'subparts/cavities/vagina.js',

    'descriptions/goblin_values_lists.js',
    'subparts/intercourse_setup.js',

    'penetration/class.js',
    'penetration/tags.js',
    'penetration/descriptor.js',
  ];

  ScriptLibrary.files = JS_FILES
    .map((fil) => REL_PATH + fil)
    .concat(ScriptLibrary.files);
}

entities_files();