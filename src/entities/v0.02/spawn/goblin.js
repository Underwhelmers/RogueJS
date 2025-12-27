function spawn_goblin(engine, pos) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'g', fg: '#00ff00', bg: null });
  ecs.add(id, 'fighter', { hp: 10, maxHp: 10, atk: 3, def: 0 });
  
  const targethole = choose_random(['vagina','anus','mouth']);
  ecs.add(id, 'interactible', { 
    eff:() => interaction_intercourse(engine,id, targethole)
  });

  ecs.add(id, 'held_loot', {
    desc: "an axe on the floor",
    vals: {
      axe: { durability: Math.floor(Math.random()*10)+1 }
    }
  });

  ecs.add(id, 'ai', {});
  ecs.add(id, 'blocks', {});
  ecs.add(id, 'aspect', {
    uniqueness: goblin_uniqueness.pull(),
    skin: {
      hue: goblin_skin_hue.pull(),
      detail: goblin_skin_detail.pull()
    }
  });

  const  body = make_goblin_body();
  ecs.add(id,'body', body);

  return id
}
function make_goblin_body() {
  const bodyBuilder = CavityBuilder
    .make_body()
    .with_size(BODY_SIZE.SMALL)
    .with_physonomy(BODY_PHYSONOMY.STRETCHY)
    .with_parameter_variation(0.2)
  ;
  
  if (success(0.5)) bodyBuilder.with_physonomy(BODY_PHYSONOMY.VIRGIN_ANUS);
  if (success(0.5)) bodyBuilder.with_physonomy(BODY_PHYSONOMY.VIRGIN_VAGINA);
  if (success(0.5)) bodyBuilder.with_physonomy(BODY_PHYSONOMY.CAN_DEEPTHROAT);

  return bodyBuilder.build();
}