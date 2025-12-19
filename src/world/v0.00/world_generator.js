class BSPNode {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.children = null;
    this.room = null;
  }

  split(depth = 4) {
    if (this.w < 15 || this.h < 15 || depth < 1) return;
    
    const horizontal = Math.random() < 0.5;
    if (horizontal) {
      const split = this.y + Math.floor(this.h / 2);
      this.children = [
        new BSPNode(this.x, this.y, this.w, split - this.y),
        new BSPNode(this.x, split, this.w, this.y + this.h - split)
      ];
    } else {
      const split = this.x + Math.floor(this.w / 2);
      this.children = [
        new BSPNode(this.x, this.y, split - this.x, this.h),
        new BSPNode(split, this.y, this.x + this.w - split, this.h)
      ];
    }
    this.children[0].split(depth - 1);
    this.children[1].split(depth - 1);
  }

  createRooms() {
    if (this.children) {
      this.children.forEach(c => c.createRooms());

      this.roomA = this.children[0].getRoom();
      this.roomB = this.children[1].getRoom();

      return;
    }

    // Leaf
    const rw = 6 + Math.floor(Math.random() * 6);
    const rh = 6 + Math.floor(Math.random() * 6);

    const maxX = Math.max(1, this.w - rw - 2);
    const maxY = Math.max(1, this.h - rh - 2);

    this.room = {
      x: this.x + 1 + Math.floor(Math.random() * maxX),
      y: this.y + 1 + Math.floor(Math.random() * maxY),
      w: rw,
      h: rh
    };
  }

  carveRooms(tiles) {
    if (this.room) {
      carveRoom(tiles, this.room);
    }

    if (this.roomA && this.roomB) {
      carveCorridor(tiles, this.roomA, this.roomB);
    }

    if (this.children) {
      this.children.forEach(c => c.carveRooms(tiles));
    }
  }
  
  getRoom() {
    if (this.room) return this.room;
    if (!this.children) return null;

    const rooms = this.children
      .map(c => c.getRoom())
      .filter(r => r);

    if (rooms.length === 0) return null;
    return rooms[Math.floor(Math.random() * rooms.length)];
  }
}


function carveRoom(tiles, room) {
  let maxy = tiles.length-1;
  if (room.y + room.h < maxy)
    maxy = room.y + room.h;
  
  let maxx = tiles[0].length-1;
  if (room.x + room.w < maxx)
    maxx = room.x + room.w;
  
  for (let y = room.y; y < maxy; y++) {
    for (let x = room.x; x < maxx; x++) {
      tiles[y][x] = WorldTiles.FLOOR;
    }
  }
}

function roomCenter(room) {
  return {
    x: Math.floor(room.x + room.w / 2),
    y: Math.floor(room.y + room.h / 2)
  };
}

function carveCorridor(tiles, roomA, roomB) {
  const a = roomCenter(roomA);
  const b = roomCenter(roomB);

  if (Math.random() < 0.5) {
    carveHorizontal(tiles, a.x, b.x, a.y);
    carveVertical(tiles, a.y, b.y, b.x);
  } else {
    carveVertical(tiles, a.y, b.y, a.x);
    carveHorizontal(tiles, a.x, b.x, b.y);
  }
}

function carveHorizontal(tiles, x1, x2, y) {
  for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
    tiles[y][x] = WorldTiles.FLOOR;
  }
}

function carveVertical(tiles, y1, y2, x) {
  for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
    tiles[y][x] = WorldTiles.FLOOR;
  }
}