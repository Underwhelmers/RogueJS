function interaction_cut_down_tree(engine, target) {
  open_menu('There is a tree in your way.');
  
  add_menu_option('c',' [C] Cut it down.' , () => effect_cut_down_tree(engine,target));
  add_menu_option('l',' [L] Leave it be.' , () => close_menu());
}

function effect_cut_down_tree(engine, target) {
  const pos = engine.ecs.get(target,'position');
  engine.ecs.remove(target);
  engine.set_tile(pos.x,pos.y,WorldTiles.FLOOR);
  close_menu();
}