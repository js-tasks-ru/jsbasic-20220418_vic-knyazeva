function hideSelf() {
  let hideSelfButtons = document.getElementsByClassName("hide-self-button");
  for (let btn of hideSelfButtons) {
    btn.addEventListener('click', hideOnClick);
  }

  function hideOnClick() {
    this.hidden = true;
  }
}
