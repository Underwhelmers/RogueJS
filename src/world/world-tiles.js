const WorldTiles = {
  new_tree: function() {
    return {
      blocked: true, char: 'T',
      fg: COLORS.TREE_FRONT,
      bg: COLORS.TREE_BACK
    }
  },
  new_floor: function() {
    return {
      blocked: false, char: '.',
      fg: COLORS.LIGHT_FLOOR,
      bg: COLORS.BLACK
    };
  },
  new_wall: function() {
    return {
      blocked: true, char: '#',
      fg: COLORS.DARK_WALL,
      bg: COLORS.BLACK
    }
  }
}

WorldTiles.TREE = WorldTiles.new_tree();
WorldTiles.FLOOR = WorldTiles.new_floor();
WorldTiles.WALL = WorldTiles.new_wall();