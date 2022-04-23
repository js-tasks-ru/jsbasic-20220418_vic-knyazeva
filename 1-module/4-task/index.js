function checkSpam(str) {
  if(!str)
    return false;

  return (str.toLowerCase().includes('1xBet'.toLowerCase()) || str.toLowerCase().includes('XXX'.toLowerCase()));
}
