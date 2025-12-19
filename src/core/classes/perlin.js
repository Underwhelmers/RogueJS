class Perlin {
  constructor() {
    const PERM = new Uint8Array(512);
    for (let i = 0; i < 256; i++) PERM[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.random() * (i + 1) | 0;
      [PERM[i], PERM[j]] = [PERM[j], PERM[i]];
    }
    for (let i = 0; i < 256; i++) PERM[i + 256] = PERM[i];

    this.perms = PERM;
  }

  noise(x,y,scale) {
    x *= scale;
    y *= scale;

    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const PERM = this.perms;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = _perlin_fade(x);
    const v = _perlin_fade(y);

    const aa = PERM[X + PERM[Y]];
    const ab = PERM[X + PERM[Y + 1]];
    const ba = PERM[X + 1 + PERM[Y]];
    const bb = PERM[X + 1 + PERM[Y + 1]];

    return lerp(
      lerp(_perlin_grad(aa, x, y), _perlin_grad(ba, x - 1, y), u),
      lerp(_perlin_grad(ab, x, y - 1), _perlin_grad(bb, x - 1, y - 1), u),
      v
    );
  }
}

function _perlin_fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function _perlin_grad(hash, x, y) {
  const h = hash & 3;
  return (h === 0 ? x : h === 1 ? -x : h === 2 ? y : -y);
}