function camelize(str) {
  const parts = str.split("-");
  for (let index = 0; index < parts.length; ++index) {
    const s = parts[index];
    if (index > 0 && s.length > 0)
      parts[index] = s[0].toUpperCase() + s.substring(1);
  }
  return parts.join("");
}
