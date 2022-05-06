function sumSalary(salaries) {
  let result = 0;
  for (let key of Object.keys(salaries))
  {
    let value = salaries[key];
    if (typeof value !== 'number' || !isFinite(value))
      continue;

    result += value;
  }
  return result;
}
