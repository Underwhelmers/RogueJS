function spawn_goblin(engine, pos) {
  const ecs = engine.ecs;
  const id = ecs.create();
  ecs.add(id, 'position', { x: pos.x, y: pos.y });
  ecs.add(id, 'renderable', { char: 'g', fg: '#00ff00', bg: null });
  ecs.add(id, 'fighter', { hp: 10, maxHp: 10, atk: 3, def: 0 });
  
  ecs.add(id, 'interactible', { 
    targethole: choose_random(['vagina','anus','mouth']),
    eff:() => interaction_attack(engine,id)
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

  const body = generate_goblin_body(ecs,id);
  ecs.add(id,'body', body);

  

  return id
}

function generate_goblin_body(ecs, id) {
  const body = CavityTypeFactory.make_body();
  
  body.vagina.quick_setup(0.4,0.5,0.1,2.1).randomize(0.2);
  body.vagina.taste = generate_taste();
  body.anus.quick_setup(0.8,0.2,0.1,2.1).randomize(0.2);
  body.anus.taste = generate_taste();
  body.mouth.quick_setup(0.2,0.7,0.9,2.0).randomize(0.2);
  body.mouth.taste = generate_taste();

  return body;
}