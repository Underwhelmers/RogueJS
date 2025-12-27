class CavityBuilder {
  constructor() {
    this.rnd_amp = 0.00;
    this.size_scale = 1.00;
    this.physonomies = [];
  }

  static make_body() {
    return new CavityBuilder();
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
      vagina: _CavityBuilder_make_for(new Vagina()),
      mouth: _CavityBuilder_make_for(new Mouth()),
      anus: _CavityBuilder_make_for(new Rectum()),
    };

    body.vagina.quick_setup(1.00 * this.scale, 1.00 * this.scale, 0.2, 1.125 * this.scale);
    body.anus  .quick_setup(2.00 * this.scale, 0.50 * this.scale, 0.1, 1.125 * this.scale);
    body.mouth .quick_setup(0.50 * this.scale, 1.25 * this.scale, 0.9, 0.750 * this.scale);
    
    for (const phys of this.physonomies)
      phys.modify(body);
    
    body.vagina.randomize(this.rnd_amp);
    body.anus  .randomize(this.rnd_amp);
    body.mouth .randomize(this.rnd_amp);
    
    return body;
  }
}

function _CavityBuilder_make_for(type) {
  const inst = new Cavity();
  inst.type = type;
  inst.taste = generate_taste();
  return inst;
}