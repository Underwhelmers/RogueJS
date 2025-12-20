function player_entity_interaction(engine, id) {
  const inter = engine.ecs.get(id,'interactible');
  inter.eff();
}