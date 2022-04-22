function factorial(n) {
  if (n === 0 || n === 1)
    return 1;

  let f = 1;
  for(let i = 2; i <= n; i++) {
      f *= i;
  }
  return f;
}
