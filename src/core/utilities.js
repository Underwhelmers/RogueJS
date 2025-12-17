function pull_random(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1)[0];
}
