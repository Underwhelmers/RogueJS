function entities_files() {
  const REL_PATH = 'entities/v0.02/';
  const JS_FILES = [
    'consts/sizes.js',
    'consts/physonomies.js',
    'consts/penetration_lines.js',
    'consts/intercourse_options.js',
    'consts/goblin_values_lists.js',

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
    'interactions/intercourse.js',

    'subparts/intercourse_setup.js',

    'subparts/phallus/class.js',
    'subparts/phallus/builder.js',
    'subparts/phallus/types/fist.js',
    'subparts/phallus/types/fingers.js',
    'subparts/phallus/types/knotted_penis.js',
    'subparts/phallus/types/penis.js',
    'subparts/phallus/types/tongue.js',
    'subparts/phallus/types/phallic_toy.js',

    'subparts/cavity/class.js',
    'subparts/cavity/factory.js',
    'subparts/cavity/builder.js',
    'subparts/cavity/types/mouth.js',
    'subparts/cavity/types/rectum.js',
    'subparts/cavity/types/vagina.js',


    'subparts/penetration/class.js',
    'subparts/penetration/tags.js',
    'subparts/penetration/descriptor.js',
  ];

  ScriptLibrary.files = JS_FILES
    .map((fil) => REL_PATH + fil)
    .concat(ScriptLibrary.files);
}

entities_files();