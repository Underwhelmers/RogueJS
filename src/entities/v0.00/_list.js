const ENTITIES_REL_PATH = 'entities/v0.00/';
const ENTITIES_JS_FILES = [
  'down_ladder.js',
  'goblin.js',
  'player.js',
  'tree.js',

  'base/tile_interactions.js',
  'base/player_entity_interactions.js',

  'interactions/enemy.js',
  'interactions/environment.js',
  'descriptions/goblin_values_lists.js',
];

ScriptLibrary.files = ENTITIES_JS_FILES
  .map((fil) => ENTITIES_REL_PATH + fil)
  .concat(ScriptLibrary.files);