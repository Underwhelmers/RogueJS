class SystemWorldGenerator {
  constructor() {
    this.chunks = {};
  }

  get_tile(x,y) {
    const chunk = this.get_chunk_for(x,y);
    return chunk.get(x,y);
  }
  set_tile(x,y,data) {
    const chunk = this.get_chunk_for(x,y);
    return chunk.set(x,y,data);
  }

  get_chunk_for(x,y) {
    const chnkpos = chunk_pos(x,y);
    const chnkkey = chunk_key(chnkpos);
    
    return this.get_chunk(chnkkey);
  }

  get_chunk(key) {
    const chnk = this.chunks[key] ?? {};
    if (!chnk.tiles) {
      create_chunk(key, chnk);
      this.chunks[key] = chnk;
      if (this.for_new_chunk)
        this.for_new_chunk(chnk);
    }
    return chnk;
  }

  get_tiles_in_rect(xfrom, yfrom, width, height, centered = true) {
    if (centered) {
      xfrom = Math.floor(xfrom - width/2);
      yfrom = Math.floor(yfrom - height/2);
      return get_tiles_in_rect(xfrom,yfrom,width,height, false);
    }

    let cw = Math.ceil(width/CHUNK_W)+1;
    let ch = Math.ceil(height/CHUNK_H)+1;

    let posini = to_chunk(xfrom,yfrom);
    let result = {
      tiles: Array.from({ length: height }, () => Array.from({ length: width })),
      xoff: xform,
      yoff: yfrom,
      width: width,
      height: height,
      get: function(x,y) {
        return this.tiles[y-this.yoff][x-this.xoff];
      }
    }

    for (let cy = posini.y; cy < posini.y+ch; cy++) {
      for (let cx = posini.x; cx < posini.x+cw; cx++) {
        const chunk = this.chunks[to_key({x:cx,y:cy})];

        const xini = Math.max(xfrom, chunk.xoff) - chunk.yoff;
        const yini = Math.max(yfrom, chunk.yoff) - chunk.xoff;

        const xfin = Math.min(xfrom+width , chunk.xoff + CHUNK_W) - chunk.xoff;
        const yfin = Math.min(yfrom+height, chunk.yoff + CHUNK_H) - chunk.yoff;

        for (let y = yini; y < yfin; y++) {
          for (let x = xini; x < xfin; x++) {
            const relx = x + chunk.xoff - xfrom;
            const rely = y + chunk.yoff - yfrom;
            result.tiles[rely][relx] = chunk.tiles[y][x];
          }
        }
      }
    }

    return result;
  }
}

function chunk_pos(x,y) {
  return {
    x:Math.floor(x/CHUNK_W),
    y:Math.floor(y/CHUNK_H)
  };
}

function chunk_key(pos) {
  return `${pos.x};${pos.y}`
}

function create_chunk(key, chnk) {
  const xy = key.split(';').map(Number);
  chnk.xoff = xy[0]*CHUNK_W;
  chnk.yoff = xy[1]*CHUNK_H;
  
  chnk.tiles = Array.from({ length: CHUNK_H }, () => Array.from({ length: CHUNK_W }));
  
  for (let y = 0; y < CHUNK_H; y++) {
    for (let x = 0; x < CHUNK_W; x++) {
      chnk.tiles[y][x] = WorldTiles.FLOOR;
    }
  }
  
  chnk.get = (x,y) => {
    return chnk.tiles[y-chnk.yoff][x-chnk.xoff];
  };
  chnk.set = (x,y,data) => {
    chnk.tiles[y-chnk.yoff][x-chnk.xoff] = data;
  };
}
