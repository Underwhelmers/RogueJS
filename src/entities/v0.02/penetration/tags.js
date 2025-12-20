function build_penetration_tags(cav, shaf, pen) {
  let tags = [];

  tags = tags
    .concat(compare_cavity_shaft_width(cav, shaf, pen))
    .concat(compare_cavity_shaft_depth(cav, shaf, pen))
    .concat(get_penetration_tags(cav, shaf, pen))
    .concat(shaf.compare_for_tags(cav, pen));
  
  tags = remove_overshadowed(tags);
  
  return cav.replace_tags(tags);
}

function remove_overshadowed(tags) {
  const TAGS_OVERSHADOW = [
    ['tearing','stuck','tight-fit','spreaded'],
    ['inflated','bulging'],
    ['inflated','tip-bulging'],
    ['pushing-thought','deepest-kiss','shallow'],
    ['desensitized','numb'],
    ['rapid-thrusting','steady-thrusting','teasing'],
    ['forced-rub','dry-rub','rough-rub','wet-rub','sloppy-rub']
  ];
  
  const tagSet = new Set(tags);
  const toRemove = new Set();

  for (const group of TAGS_OVERSHADOW) {
    let strongestPresent = null;

    for (const tag of group) {
      if (tagSet.has(tag)) {
        strongestPresent = tag;
        break;
      }
    }

    if (strongestPresent) {
      let removeRest = false;
      for (const tag of group) {
        if (removeRest) {
          toRemove.add(tag);
        }
        if (tag === strongestPresent) {
          removeRest = true;
        }
      }
    }
  }

  return tags.filter(tag => !toRemove.has(tag));
}

function compare_cavity_shaft_width(cav, shaf, pen) {
  if (pen.progress <= 0) return [];
  
  const tags = [];
  
  if (cav.width * cav.give < shaf.girth)
    tags.push("spreaded");
  
  if (cav.width * cav.give < shaf.girth * shaf.rigid)
    tags.push("tight-fit");
  
  if (cav.width * cav.limit < shaf.girth)
    tags.push("stuck");  
    
  if (cav.width * cav.limit < shaf.girth * shaf.rigid)
    tags.push("tearing");  
  
  if (cav.width < shaf.girth * shaf.rigid && cav.limit > 1.5)
    tags.push("bulging");
  
  return tags;
}

function compare_cavity_shaft_depth(cav, shaf, pen) {
  if (pen.progress <= 0) return [];
  const tags = [];
  
  if (cav.depth * 1.75 < shaf.length)
    tags.push('size-difference-small');
  
  if (cav.depth * cav.give > pen.progress)
    tags.push("shallow");
  
  if (cav.depth * cav.limit < pen.progress * shaf.rigid)
    tags.push("pushing-thought");
  
  if (cav.depth < pen.progress)
    tags.push("deepest-kiss");
  
  if (cav.depth < pen.progress && cav.limit > 1.5)
    tags.push("tip-bulging");
  
  if (cav.depth < pen.progress * shaf.rigid)
    tags.push("cavity-filled");
  
  return tags;
}

function get_penetration_tags(cav, shaf, pen) {
  const tags = [];

   // Friction-based
  if (pen.friction > 1.1) tags.push('forced-rub');
  if (pen.friction > 0.9) tags.push('dry-rub');
  if (pen.friction > 0.6) tags.push('rough-rub');
  if (pen.friction > 0.3) tags.push('wet-rub');
  tags.push('sloppy-rub');

  // Numbness modifies experience
  if (pen.numbness > 1.0) tags.push("desensitized");
  if (pen.numbness > 0.5) tags.push("numb");
  
  // Rhythm-based sensations
  if (pen.speeds/cav.depth > 0.7) tags.push("rapid-thrusting");
  if (pen.speeds/cav.depth > 0.3) tags.push("steady-thrusting");
  if (pen.speeds/cav.depth < 0.1) tags.push("teasing");

  return tags;
}