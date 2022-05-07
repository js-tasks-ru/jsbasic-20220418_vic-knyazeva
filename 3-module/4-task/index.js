function showSalary(users, age) {
  let result = "";
  for (const user of users) {
    if (user.age > age)
      continue;
    if (result.length > 0)
      result += "\n";
    result += `${user.name}, ${user.balance}`;
  }
  return result;
}
