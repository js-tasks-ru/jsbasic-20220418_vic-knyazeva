function getMinMax(str) {
  let currentMin = undefined;
  let currentMax = undefined;
  for (let w of str.split(" ")) {
    let number = +w;
    if (isNaN(number)) {
      continue;
    }
    if (currentMax === undefined) {
      currentMin = currentMax = number;
      continue;
    }
    if (currentMin > number)
      currentMin = number;
    if (currentMax < number)
      currentMax = number;
  }
  return {
    min: currentMin,
    max: currentMax
  };
}
