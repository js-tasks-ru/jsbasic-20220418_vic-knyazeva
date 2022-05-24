function toggleText() {
  let toggleButtons = document.getElementsByClassName("toggle-text-button");
  for (let btn of toggleButtons) {
    btn.addEventListener('click', toogleTextOnClick);
  }

  function toogleTextOnClick() {
    let text = document.getElementById('text');
    text.hidden = !text.hidden;
  }
}
