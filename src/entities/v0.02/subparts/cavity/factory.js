class CavityTypeFactory {
  static make_body() {
    return {
      vagina: this._make_for(new Vagina()),
      anus: this._make_for(new Rectum()),
      mouth: this._make_for(new Mouth()),
    }
  }
  static _make_for(type) {
    const inst = new Cavity();
    inst.type = type;
    inst.taste = generate_taste();
    return inst;
  }
}