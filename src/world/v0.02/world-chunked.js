class WorldChunked {
  constructor() {
    this.chunks = {};
  }

  get_tile(x,y) {
    const chunk = this._get_chunk_for(x,y);
    return chunk.get(x,y);
  }
  set_tile(x,y,data) {
    const chunk = this._get_chunk_for(x,y);
    return chunk.set(x,y,data);
  }

  _get_chunk_for(x,y) {
    x = Math.floor(x/CHUNK_W);
    y = Math.floor(y/CHUNK_H);
    const chnkkey = `${x};${y}`;
    
    const chnk = this.chunks[chnkkey] ?? {};
    if (!chnk.tiles) {
      create_chunk(chnkkey, chnk);
      this.chunks[chnkkey] = chnk;
      
      // instance specific initialization
      if (this.for_new_chunk)
        this.for_new_chunk(chnk);

    }
    return chnk;
  }
}

function create_chunk(key, chnk) {
  const xy = key.split(';').map(Number);
  chnk.xoff = xy[0]*CHUNK_W;
  chnk.yoff = xy[1]*CHUNK_H;
  
  chnk.tiles = Array.from(
    { length: CHUNK_H }, 
    () => Array(MAP_W).fill(
      WorldTiles.TREE // WORLD FILLED WITH TREES
    ));
  
  chnk.get = (x,y) => {
    return chnk.tiles[y-chnk.yoff][x-chnk.xoff];
  };
  chnk.set = (x,y,data) => {
    chnk.tiles[y-chnk.yoff][x-chnk.xoff] = data;
  };
}
