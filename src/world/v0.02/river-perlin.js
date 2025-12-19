class RiverPerlin {
  constructor() {
    this.perlin = new Perlin();
    this.warp_freq = 0.002;
    this.warp_amp = 40;
    this.scale = 0.02;

    this.offset = [0,0]
    this.ei = [1,0];
    this.ei = [0,1];
  }

  // fast_setup( 50, 40, 5) = basic
  // fast_setup( 10, 40, 5) = less longroads
  // fast_setup( 10,200, 5) = chunky

  fast_setup(warp_pow = 50, warp_amp = 40, zoom = 5) {
    this.warp_freq = 1/(warp_pow*10);
    this.warp_amp = warp_amp;
    this.scale = 1/(zoom * 10);
    return this;
  }

  rotate(angle_deg) {
    const angle = angle_deg * Math.PI / 180;
    this.ei = [ Math.sin(angle), Math.cos(angle)];
    this.ej = [-Math.cos(angle), Math.sin(angle)];
    return this;
  }
  
  deformate_space() {
    let angle = Math.random() *2 * Math.PI;
    this.ei = [ Math.sin(angle), Math.cos(angle)];
    
    angle += Math.random() * Math.PI/2 + Math.PI/4;
    this.ej = [-Math.cos(angle), Math.sin(angle)];
    return this;
  }

  river_offset(startpos, criteria) {
    const dir = Math.random() * Math.PI * 2;
    const dx = Math.cos(dir) * 2;
    const dy = Math.sin(dir) * 2;

    let rawx = startpos.x;
    let rawy = startpos.y;
    let x = Math.floor(rawx);
    let y = Math.floor(rawy);

    const check = (xx, yy) => {
      return criteria(this.noise(xx, yy));
    };

    let maxdist = 1000;
    while (maxdist--) {
      if (check(x, y) && check(x + 1, y) && check(x - 1, y) && check(x, y + 1) && check(x, y - 1)) {
        this.offset[0] = x;
        this.offset[1] = y;
        return this;
      }

      rawx += dx;
      rawy += dy;
      x = Math.floor(rawx);
      y = Math.floor(rawy);
    }
    
    return this;
  }


  noise(wx, wy) {
    const nwx = this.offset[0] + this.ei[0] * wx + this.ej[0] * wy;
    const nwy = this.offset[1] + this.ei[1] * wx + this.ej[1] * wy;
    
    const warp = this.perlin.noise(nwx, nwy, this.warp_freq) * this.warp_amp;
    const r = this.perlin.noise(nwx + warp, nwy + warp, this.scale);
    return Math.abs(r);
  }
}