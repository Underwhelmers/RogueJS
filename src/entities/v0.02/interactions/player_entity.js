function player_entity_interaction(engine, id) {
  const inter = engine.ecs.get(id,'interactible');
  if (inter.eff)
    inter.eff();
}