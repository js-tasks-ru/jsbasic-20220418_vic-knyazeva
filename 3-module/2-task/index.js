function filterRange(arr, a, b) {
  //return arr.filter(v => a <= v && v <= b)
  const result = [];
  for (const v of arr) {
    if (a <= v && v <= b)
      result.push(v);
  }
  return result;
}
