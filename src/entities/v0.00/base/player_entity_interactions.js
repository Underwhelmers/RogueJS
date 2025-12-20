function player_entity_interaction(engine, id) {
  const inter = engine.ecs.get(id,'interactible');
  switch (inter.type) {
    case 'attack'    : interaction_attack(engine, id);        break;
    case 'next_level': interaction_next_level(engine, id);    break;
  }
}