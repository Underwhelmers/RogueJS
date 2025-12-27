function pull_random(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1)[0];
}

function choose_random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function irandom(max) {
  return Math.floor(Math.random() * max);
}

function shuffle_array(array) {
  const size = array.length;
  for (let i = 0; i < size; i++) {
    const idx = irandom(size);
    const temp = array[i];
    array[i] = array[idx];
    array[idx] = temp;
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function success(chance) {
  return Math.random() <= chance;
}