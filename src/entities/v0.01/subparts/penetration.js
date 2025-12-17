class Penetration {
  constructor() {
    this.progress = 0.0;
    this.friction = 1.0;
    this.numbness = 0.0;
    this.speed = 0.0;   
    this.lastDepth = 0.0
  }

  interpret_tags(cav, shaf, tags) {
    let narratives = [];
    const cavnouns = cav.type.nouns;
    const shafnouns = shaf.shape.nouns;

    this.lastDepth = this.progress;

    // === FRICTION & LUBE EFFECTS ===
    if (this.friction > 0.9) {
      narratives.push(`The dry, raw rubbing of your ${shafnouns.pull()} burns with every brutal inch forced inside their ${cavnouns.pull()}.`);
    } else if (this.friction > 0.6) {
      narratives.push(`Your ${shafnouns.pull()}, it's slick enough to move, but you still feel every veiny ridge of their ${cavnouns.pull()}.`);
    } else if (this.friction > 0.3) {
      narratives.push(`Lube lets your ${shafnouns.pull()} glide deep with obscene, wet sounds echoing through the air.`);
    } else {
      narratives.push(`So much slickness it's almost frictionless—pure, effortless violation of their ${cavnouns.pull()}.`);
    }

    // === DEPTH PROGRESSION ===
    if (tags.includes('spreaded')) {
      narratives.push(`Their ${cavnouns.pull()} stretches wide, greedily spread around the invading girth of your ${shafnouns.pull()}.`);
    }

    if (tags.includes('tight-fit') || tags.includes('stuck') || tags.includes('jaw-locking')) {
      narratives.push(`It's a viciously tight fit inside their ${cavnouns.pull()}. Forcing your way in, is making them feels like it's splitting them apart.`);
    }

    if (tags.includes('suffocating'))
      narratives.push(`Your ${shafnouns.pull()} finally plugs their throat completely—suffocating, no air, just desperatede pleasure.`);
    else if (tags.includes('tearing'))
      narratives.push(`The stretch burns their ${cavnouns.pull()} like tearing flesh, pain blooming hot and sharp.`);

    if (tags.includes('shallow')) {
      narratives.push(`You're keeping it shallow, just teasing the entrance of their ${cavnouns.pull()} with lazy strokes.`);
    }

    if (tags.includes('throat-fucking')) {
      const throat = [
        "face-fucking them mercilessly, balls slapping their chin as it bullies down their throat.",
        "throat-fucking them until drool pours out and their eyes water."
      ];
      narratives.push(choose_random(throat));
    } 
    else if (tags.includes('cervix-penetration')) {
      narratives.push(`slamming against their cervix, it finally gives in letting your ${shafnouns.pull()} in their womb.`,);
    }
    else if (tags.includes('rearanging-guts')) {
      narratives.push(`slamming so deep inside their ${cavnouns.pull()} that it started to rearrange their guts with every violent thrust`);
    }
    else if (tags.includes('pushing-thought')) {
      narratives.push(`ramming your ${shafnouns.pull()} so deep, you feel how it's reshaping the inside of their ${cavnouns.pull()}.`);
    }

    if (tags.includes('cervix-kiss')) {
      narratives.push(`Your ${shafnouns.pull()} kisses their cervix ready to fill their womb with seed.`);
    } 
    else if (tags.includes('reaching-fold')) {
      narratives.push(`Your ${shafnouns.pull()} kisses their guts, causing them to straighten their back instinctively.`);
    }
    else if (tags.includes('deepest-kiss')) {
      narratives.push(`Your ${shafnouns.pull()} kisses their deepest spot tenderly or brutally, depending on the mood.`);
    }

    if (tags.includes('cavity-filled')) {
      narratives.push(`Their ${cavnouns.pull()} is completely filled, stuffed to the absolute limit—no room left for anything but ${shafnouns.pull()}.`);
    }

    if (tags.includes('chocking')) {
      narratives.push(`Your ${shafnouns.pull()} lodges deep in their throat, choking them on throbbing meat while they struggle for air.`);
    }

    // === SPEED & STYLE ===
    if (tags.includes('rapid-thrusting')) {
      narratives.push("The pace is frantic—rapid, punishing thrusts that make their whole body jolt.");
    }
    if (tags.includes('steady-thrusting')) {
      narratives.push("Slow, steady, relentless thrusting—each stroke deliberate, letting them feel every inch claiming them.");
    }
    if (tags.includes('teasing')) {
      narratives.push("You're just teasing—shallow dips, circling the entrance, never giving them the depth they crave (or dread).");
      this.numbness = Math.max(0, this.numbness - 0.1);
    }

    // === KNOTTING (because why not go full monster-fuck) ===
    if (tags.includes('knotted') || tags.includes('knot-catching')) {
      narratives.push(tags.includes('knot-catching')
        ? "The fat knot catches at their rim, popping in with a wet, obscene stretch that locks you together."
        : "They're knotted deep—tied tight, forced to take every pulsing spurt as the base swells inside.");
    }

    // === NUMBNESS & PAIN/DESENSITIZATION ===
    if (tags.includes('numb') || tags.includes('desensitized')) {
      this.numbness = Math.min(1.0, this.numbness + 0.2);
      if (this.numbness > 0.7) {
        narratives.push("Their abused hole has gone numb—pleasure and pain both dulled to a distant throb.");
      }
    } else if (this.numbness > 0.4 && !tags.includes('teasing')) {
      narratives.push("Overstimulation has started to desensitize them—sensation fading under the relentless pounding.");
    }

    // Final depth change flavor
    if (this.progress > 0.9) {
      narratives.push("They're utterly impaled—nothing but heat and pressure filling them completely.");
    } else if (this.progress > this.lastDepth + 0.2) {
      narratives.push("Another inch forces its way deeper, claiming more of them with greedy insistence.");
    }

    return narratives.length ? narratives : ["It slides in and out... somehow."];
  }
}