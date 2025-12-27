const tagPuller = new VariedTagPuller({
  memorySize: 4,
  maxTries: 8
});

function penetration_interpret_tags(cav, shaf, pen, tags) {
  const narratives = [];
  const params = {
    '{cav}': cav.type.nouns,
    '{shaf}': shaf.type.nouns
  };
  
  // === All active tags ===
  const chosentags = tagPuller.multipull(
    2, tags, tag => PENETRATION_LINES[tag]
  );

  if (chosentags.length === 0) 
    return ["It slides in and out... somehow."];

  for (const tag of chosentags) {
    let line = PENETRATION_LINES[tag].pull();
    for (const parm in params) {
      while (line.includes(parm))
        line = line.replace(parm, params[parm].pull());
    }
    narratives.push(line);
  }
  return narratives;
}
