function truncate(str, maxlength) {
  if(!str || str.length <= maxlength)
    return str;

  return str.slice(0, maxlength - 1) + '…';
}
