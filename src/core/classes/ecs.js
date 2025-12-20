class ECS {
  constructor() {
    this.nextId = 0;
    this.entities = new Set();
    this.components = new Map(); // type -> Map(id -> data)
  }

  create() {
    const id = this.nextId++;
    this.entities.add(id);
    return id;
  }

  add(id, type, data) {
    if (!this.components.has(type)) this.components.set(type, new Map());
    this.components.get(type).set(id, { ...data });
  }

  get(id, type) {
    return this.components.get(type)?.get(id);
  }

  has(id, type) {
    return this.components.has(type) && this.components.get(type).has(id);
  }

  remove_comp(id, type) {
    if (!this.components.has(type)) return false;
    return this.components.get(type).delete(id);
  }

  remove(id) {
    this.entities.delete(id);
    for (let map of this.components.values()) {
      map.delete(id);
    }
  }

  query(...types) {
    return Array.from(this.entities).filter(id => types.every(t => this.has(id, t)));
  }
  
  get_at(x, y) {
    let target = [];
    for (let id of this.query('position', 'interactible')) {
      const pos = this.get(id, 'position');
      if (pos.x === x && pos.y === y) {
        target.push(id);
      }
    }
    return target;
  }
}