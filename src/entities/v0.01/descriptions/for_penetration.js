function build_penetration_tags(cav, shaf, pen) {
  let tags = [];

  tags = tags
    .concat(compare_cavity_shaft_width(cav, shaf, pen))
    .concat(compare_cavity_shaft_depth(cav, shaf, pen))
    .concat(get_penetration_tags(cav, shaf, pen))
    .concat(shaf.compare_for_tags(cav, pen));
  
  return cav.replace_tags(tags);
}

function compare_cavity_shaft_width(cav, shaf, pen) {
  if (pen.progress <= 0) return [];
  
  const tags = [];
  
  if (cav.width * cav.give < shaf.girth)
    tags.push("spreaded");
  
  if (cav.width * cav.limit < shaf.girth)
    tags.push("tearing");
  
  if (cav.width * cav.give < shaf.girth * shaf.rigid)
    tags.push("tight-fit");
    
  if (cav.width * cav.limit < shaf.girth * shaf.rigid)
    tags.push("stuck");
  
  return tags;
}

function compare_cavity_shaft_depth(cav, shaf, pen) {
  if (pen.progress <= 0) return [];
  
  if (cav.length * cav.give > pen.progress)
    return ["shallow"];
  
  if (cav.length * cav.limit < pen.progress * shaf.rigid)
    return ["pushing-thought"];
  
  const tags = [];
  if (cav.length < pen.progress)
    tags.push("deepest-kiss");
  if (cav.length < pen.progress * shaf.rigid)
    tags.push("cavity-filled");
  
  return tags;
}

function get_penetration_tags(cav, shaf, pen) {
  const tags = [];

   // Friction-based
  if (pen.friction > 1.3) tags.push("raw-rubbing");
  if (pen.friction < 0.6) tags.push("gliding");

  // Numbness modifies experience
  if (pen.numbness > 0.5) tags.push("numb");
  if (pen.numbness > 1.0) tags.push("desensitized");
  
  // Rhythm-based sensations
  if (pen.speed > 0.7) tags.push("rapid-thrusting");
  else if (pen.speed > 0.3) tags.push("steady-thrusting");
  else if (pen.speed > 0.1) tags.push("teasing");

  return tags;
}