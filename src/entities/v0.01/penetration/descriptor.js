function penetration_interpret_tags(cav, shaf, pen, tags) {
  const narratives = [];
  const params = {
    '{cav}': cav.type.nouns,
    '{shaf}': shaf.shape.nouns
  };
  
  // === All active tags ===
  for (const tag of tags) {
    if (!PENETRATION_LINES[tag]) continue;
    let line = PENETRATION_LINES[tag].pull();
    
    for (const parm in params) {
      while (line.includes(parm)) 
        line = line.replace(parm, params[parm].pull());
    }
    
    narratives.push(line);
  }
  
  return narratives.length ? narratives : ["It slides in and out... somehow."];
}

const PENETRATION_LINES = {
  'spreaded': new ValueBag([
    "Their {cav} stretches wide, greedily spread around the invading girth of your {shaf}.",
    "The rim of their {cav} is pulled taut, blooming open like a hungry flower around your {shaf}.",
    "Their {cav} gapes obscenely, lips splayed and trembling as they swallow your thick {shaf}.",
    "Spread so wide you can see every quiver inside their {cav} as your {shaf} claims it.",
    "Their entrance is forced into a perfect O, stretched thin around the relentless girth of your {shaf}."
  ]),

  'tight-fit': new ValueBag([
    "It's a viciously tight fit. Forcing your way in feels like it's splitting their {cav} apart.",
    "Their {cav} clamps down desperately, making every inch a brutal conquest.",
    "So goddamn tight. Their {cav} fights you every millimeter, hot walls strangling your {shaf}.",
    "A punishing, vise-like grip. Their {cav} refuses to yield without making you earn it.",
    "Their {cav} is a mercilessly snug sheath, squeezing your {shaf} like it wants to break it off inside.",
    "Every thrust has to battle the crushing pressure of their too-small {cav}.",
    "Tight enough to hurt them both. Raw friction and resistance at every burning inch."
  ]),

  'stuck': new ValueBag([
    "You're lodged halfway. Stuck in their impossibly tight {cav}, neither in nor out.",
    "Buried halfway and trapped. Their {cav} has locked down, refusing to release or take more.",
    "Your {shaf} is wedged firm, caught in the crushing heat of their unyielding {cav}.",
    "Stuck fast. The swollen head trapped just inside, pulsing uselessly against their clenched walls."
  ]),

  'jaw-locking': new ValueBag([
    "Their jaw locks open as your {shaf} bulges their throat into a perfect sleeve.",
    "Jaw aching and forced wide, their throat distends visibly around the invading {shaf}.",
    "Their mouth stretched to its limit, jaw trembling as your {shaf} turns their throat into a bulging tunnel."
  ]),

  'suffocating': new ValueBag([
    "Your {shaf} plugs their throat completely. no air, just desperate gagging pleasure.",
    "Completely sealed off. Their airway blocked by throbbing meat, eyes bulging in panic and lust.",
    "They can't breathe around the thick {shaf} buried balls-deep in their throat.",
    "Suffocating on cock, throat convulsing helplessly as oxygen runs out."
  ]),

  'tearing': new ValueBag([
    "The stretch burns like tearing flesh, pain blooming hot and sharp in their {cav}.",
    "It feels like their {cav} is ripping open around you. raw, searing agony with every push.",
    "A white-hot tear of pain as their {cav} is forced beyond its limits.",
    "They're being torn from the inside, the stretch too brutal for flesh to endure quietly."
  ]),

  'throat-fucking': new ValueBag([
    "Face-fucking them mercilessly, balls slapping their chin as your {shaf} bullies their throat.",
    "Throat-fucking until drool pours out and their eyes water in overwhelmed bliss.",
    "Turning their throat into a pulsing, obedient fleshlight with every savage thrust.",
    "Pounding their face like a cheap toy, gagging noises filling the air with each hilt-deep slam.",
    "Relentless throat abuse. Forcing past their gag reflex again and again until they break.",
    "Brutal, wet skull-fucking. Your {shaf} reshaping their throat with every violent plunge.",
    "Using their mouth like a cunt, hips snapping forward to bury yourself in choking heat.",
    "They choke and sputter as you ram down their throat, tears streaming from the sheer force."
  ]),

  'cervix-penetration': new ValueBag([
    "Slamming against their cervix until it finally gives, letting your {shaf} breach their womb.",
    "Battering their cervix relentlessly until it opens. your {shaf} forcing entry into sacred depths.",
    "The barrier yields with a pop, your {shaf} sliding into their womb like it was always meant to.",
    "Punishing their deepest barrier until it surrenders, claiming their womb completely."
  ]),

  'rearranging-guts': new ValueBag([
    "Every violent thrust rearranges their guts. Your {shaf} reshaping everything inside.",
    "Deep enough to bulge their belly, visibly shifting organs with each ruthless stroke.",
    "You're stirring their insides, {shaf} bulldozing through their abdomen like a piston.",
    "Gut-deep pounding. They can feel you moving things around that shouldn't move."
  ]),

  'cervix-kiss': new ValueBag([
    "Your {shaf} kisses their cervix, ready to flood their womb with hot seed.",
    "Nestled right against their cervix, tip pulsing as it prepares to breed deep.",
    "Grinding gently your {shaf} against the entrance to their womb, making out with their cervix.",
    "A tender, threatening kiss at their deepest gate, promising to fill what lies beyond."
  ]),

  'knotted': new ValueBag([
    "The fat knot swells inside, tying you together. forced to take every pulsing spurt deep.",
    "Locked in place by the throbbing knot, pumping load after load straight into them.",
    "Knot fully inflated, sealing your seed inside as their {cav} milks you helplessly.",
    "Tied tight. no escape until the knot deflates and they've been thoroughly bred."
  ]),

  'knot-catching': new ValueBag([
    "The knot catches at their rim, then pops in with a wet, obscene stretch that locks you in.",
    "Your {shaf} snags at the entrance of their {cav}. Then forces past with a lewd pop, tying you instantly.",
    "The swollen base stretches them impossibly before slamming home, sealing the tie."
  ]),

  'rapid-thrusting': new ValueBag([
    "The pace is frantic. Rapid, punishing thrusts that jolt their entire body.",
    "Jackhammering into them without mercy, hips a blur of brutal speed.",
    "Fast, savage strokes. Turning their {cav} into a sloppy, abused mess in seconds.",
    "Pounding them at breakneck pace, each impact sending shockwaves through their frame.",
    "Relentless high-speed fucking. No time to recover between devastating thrusts.",
    "They're utterly impaled—nothing but throbbing heat filling them completely."
  ]),

  'steady-thrusting': new ValueBag([
    "Your move is steady, and relentless. Each stroke deliberate, letting them feel every inch.",
    "Your movement is measured and powerful. Deep and unhurried, savoring their surrender.",
    "You grind in with controlled force, making sure they register every veiny ridge.",
    "With patience, inch by inch goes in and out, over and over, until they're ruined."
  ]),

  'teasing': new ValueBag([
    "You are just teasing their {cav}. Shallow dips, circling the entrance, and denying the depth they crave or dread.",
    "You barely breach into them, tracing the rim of their {cav} with lazy strokes that drive them mad.",
    "You are toying at the edge. Never giving more than a taste of what's to come.",
    "Your light, frustrating thrusts. Keep them on the brink without true satisfaction.",
    "Another inch forces its way deeper, claiming more of their {cav} with greedy insistence."
  ]),

  'bulging': new ValueBag([
    "Your {shaf} stetches them to the point of bulging their body with every move.",
    "Their abdomen distends around you, the shape of your {shaf} clear beneath stretched skin."
  ]),
  
  'tip-bulging': new ValueBag([
    "Your {shaf} bulges their belly visibly with every deep thrust. Making an obsene mark of ownership.",
    "A obscene bulge rises and falls in their stomach as you bottom out again and again."
  ]),
  
  'desensitized': new ValueBag([
    "Their abused {cav} has gone numb—pleasure and pain both dulled to nothing."
  ]),
  'numb': new ValueBag([
    "Overstimulation is desensitizing them—sensation fading under the endless pounding."
  ]),
  
  'forced-rub': new ValueBag([
    "Wihtout any help of moisture you push inside their {cav} by will alone."
  ]),
  'dry-rub': new ValueBag([
    "The dry, raw rubbing of your {shaf} burns with every brutal inch forced inside their {cav}.",
    "No lube, just agonizing friction as your {shaf} grinds raw into their {cav}.",
    "Bone-dry and punishing. Every movement scrapes like sandpaper inside them.",
    "Raw, unlubed flesh dragging against flesh. pain is the only lubrication here."
  ]),
  'rough-rub': new ValueBag([
    "Slick enough to move, but you feel every veiny ridge dragging against the walls of their {cav}.",
    "Minimal lube. Just enough to slide, not enough to spare them the textured burn.",
    "Gritty resistance remains, every bump and vein scraping deliciously along their walls.",
    "Partially slick, but still rough. a constant reminder of how tightly they're gripping."
  ]),
  'wet-rub': new ValueBag([
    "Lube lets your {shaf} glide deep with obscene, wet squelching sounds echoing around you.",
    "Plenty of slick. Wet slaps and squelches accompany every thrust into their soaked {cav}.",
    "Good and slippery now, your {shaf} plunging in with lewd, juicy noises.",
    "Drenched enough for smooth strokes, but still tight enough to make filthy sounds."
  ]),
  'sloppy-rub': new ValueBag([
    "So much slickness it's almost frictionless. Pure, effortless violation of their {cav}.",
    "Dripping, sloppy mess. Your {shaf} slides in like their {cav} was built to be ruined.",
    "Absolutely soaked. Rivers of lube and juices letting you fuck them with zero resistance.",
    "Sloppy seconds don't even describe it. A wet, gaping mess that swallows you greedily.",
    "Overflowing slick. Every thrust forces out obscene gushes around your pounding {shaf}."
  ]),
  
  'size-difference-small': new ValueBag([
    "They're far too small for you. Your massive {shaf} looks obscene stretching their tiny {cav}.",
    "The size difference is ridiculous. Their {cav} wasn't made to take something this huge.",
    "You dwarf them completely, your {shaf} turning their {cav} into a comically overstretched sleeve."
  ]),
  
  /*
  'drooling-mess': new ValueBag([
    "They're a drooling, sloppy mess. Spit and precum dripping from their ruined {cav}.",
    "Drool cascades from their mouth, evidence of total overwhelm."
  ]),
  */
};