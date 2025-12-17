function spawn_goblin(engine, pos) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'g', fg: '#00ff00', bg: null });
  ecs.add(id, 'fighter', { hp: 10, maxHp: 10, atk: 3, def: 0 });
  ecs.add(id, 'interactible', { type:'attack' })
  ecs.add(id, 'ai', {});
  ecs.add(id, 'blocks', {});
  ecs.add(id, 'aspect', {
    uniqueness: goblin_uniqueness.pull(),
    skin: {
      hue: goblin_skin_hue.pull(),
      detail: goblin_skin_detail.pull()
    }
  });
  ecs.add(id,'body', {
    
  });
  return id
}

const goblin_uniqueness = new ValueBag([
  'wearing rings in their ears',
  'wearing a nose ring made from bent copper wire',
  'that has a broken tusk',
  'showing overgrown lower canines',
  'that is missing an ear tip',
  'that has a scarred face',
  'showing burn marks on one arm',
  'that has a crooked spine',
  'that limps slightly',
  'showing one milky blind eye',
  'that has oversized hands',
  'showing patchy body hair',

  // Style / self-expression
  'flaunting tattooed tribal markings',
  'showing crudely carved runes on skin',
  'wearing war paint across their face',
  'flaunting charms braided into their hair',
  'wearing tiny bells tied to their belt',
  'wearing a necklace of teeth',
  'that has a bone earrings',
  'wearing fetish charms dangling from loincloth',
  'flaunting obsessively polished piercings',
  'wearing gaudy scavenged jewelry',

  // Behavioral tells
  'that is constantly licking their lips',
  'that sniffs the air aggressively',
  'that laughs at all times',
  'whom avoids eye contact',
  'that stares uncomfortably long',
  'who is twitchy and jittery',
  'who moves with predatory grace',
  'that holds an overconfident swagger',
  'holding a nervous submissive posture',
  'who is excessively territorial',

  // Erotic / unsettling flavor (optional spice)
  'showing lewd carvings etched into their armor',
  'showing visible bite marks from past encounters',
  'who wears only an intentionally revealing loincloth',
  'that uses body language with heavy sexual menace',
  'that clearly enjoys close combat a bit too much',
  'that looks at you with thirst in their eyes'
]);
const goblin_skin_hue = new ValueBag([
  // Greens (baseline)
  'pale green',
  'muddy green',
  'olive green',
  'sickly yellow-green',
  'dark forest green',
  'bluish green',
  'gray-green',
  'moss green',

  // Off-greens / mutations
  'ashen green',
  'brownish green',
  'teal-tinged green',
  'almost black green',
  'chalky green',
  'slimy green sheen',

  // Nonstandard / cursed
  'yellowed',
  'dusky gray',
  'purple-veined green',
  'bruised green'
]);
const goblin_skin_detail = new ValueBag([
  // Natural markings
  'dark freckles',
  'mottled patches',
  'veiny patterns',
  'uneven pigmentation',
  'sun-spotts',
  'birthmark across their shoulder',
  'patches of tougher hide',

  // Damage / wear
  'old claw scars',
  'fresh bite marks',
  'burn scars',
  'healed whip marks',
  'callouses',
  'cracked dry patches',
  'flaks',

  // Texture / biology
  'a slightly scaled texture',
  'an oily sheen',
  'a rough sandpaper-like texture',
  'a rubbery elasticity',
  'a leathery firmness',
  'clammy dampness',

  // Corruption / weirdness
  'glowing veins',
  'faintly pulsing marks',
  'rune-shaped discolorations',
  'patches of missing pigment'
]);