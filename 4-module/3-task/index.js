function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];
    if (row.parentNode.nodeName !== 'TBODY')
      continue;

    let cell = row.cells[1];
    if(+cell.innerText < 18)
      row.style.textDecoration = 'line-through';

    cell = row.cells[2];
    if(cell.innerText === 'm')
      row.classList.add('male');
    else if(cell.innerText === 'f')
      row.classList.add('female');

    cell = row.cells[3];
    if (!cell.hasAttribute('data-available'))
      row.setAttribute('hidden', '');
    else if (cell.dataset.available === 'true')
      row.classList.add('available');
    else if (cell.dataset.available === 'false')
      row.classList.add('unavailable');
  }
}
