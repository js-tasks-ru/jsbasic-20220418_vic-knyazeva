function namify(users) {
  //return users.map(user => user.name);
  const result = [];
  for (const user of users) {
    result.push(user.name);
  }
  return result;
}
