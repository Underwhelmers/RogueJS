class PhallusBuilder {
  constructor() {
    this.rnd_amp = 0.00;
    this.size_scale = 1.00;
    this.physonomies = [];
  }

  static make_body() {
    return new PhallusBuilder();
  }

  with_size(size) {
    this.size_scale = size.scale;
    return this;
  }
  with_parameter_variation(amplitude) { 
    this.rnd_amp = amplitude;
    return this;
  }
  with_physonomy(phys) {
    this.physonomies.push(phys);
    return this;
  }


  build() {
    const body = {
      toy:    _PhallusBuilder_make_for(new PhallicToy()),
      dick:   _PhallusBuilder_make_for(new KnottedPenis()),
      fist:   _PhallusBuilder_make_for(new Fist()),
      finger: _PhallusBuilder_make_for(new Fingers()),
      tongue: _PhallusBuilder_make_for(new Tongue()),
    };
    body.toy   .quick_setup(1.00, 1.00, 2.00, 0.80);
    body.dick  .quick_setup(1.00 * this.scale, 1.00 * this.scale, 1.00, 1.00);
    body.fist  .quick_setup(1.00 * this.scale, 4.00 * this.scale, 0.25, 1.00);
    body.finger.quick_setup(0.75 * this.scale, 0.50 * this.scale, 0.75, 1.00);
    body.tongue.quick_setup(0.50 * this.scale, 1.20 * this.scale, 6.00, 0.40);
    
    for (const phys of this.physonomies)
      phys.modify(body);
    
    body.toy   .randomize(this.rnd_amp);
    body.dick  .randomize(this.rnd_amp);
    body.fist  .randomize(this.rnd_amp);
    body.finger.randomize(this.rnd_amp);
    body.tongue.randomize(this.rnd_amp);    
    return body;
  }
}

function _PhallusBuilder_make_for(type) {
  const inst = new Phallus();
  inst.type = type;
  return inst;
}