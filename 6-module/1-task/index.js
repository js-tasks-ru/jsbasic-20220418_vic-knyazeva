/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this._elem = this.renderElement();
  }

  get elem() {
    return this._elem;
  }

  renderElement() {
    const table = document.createElement("TABLE");

    table.innerHTML = `<thead>` +
      this.renderRow('th', 'Имя', 'Возраст', 'Зарплата', 'Город', '') +
      `</thead><tbody>` +
      this.rows.map((row) => {
        return this.renderRow('td', row.name, row.age, row.salary, row.city, '<button>X</button>');
      }).join('\n') +
      `</tbody>`;

    table.addEventListener('click', event => this.handleClick(event));
    return table;
  }

  renderRow(tag, name, age, salary, city, action) {
    return `<tr>
      <${tag}>${name}</${tag}>
      <${tag}>${age}</${tag}>
      <${tag}>${salary}</${tag}>
      <${tag}>${city}</${tag}>
      <${tag}>${action}</${tag}>
    </tr>`;
  }

  handleClick(event) {
    if (event.target.tagName !== 'BUTTON')
      return;

    let rowElem = event.target.closest('TR');
    if (!rowElem)
      return;

    rowElem.parentNode.removeChild(rowElem);
  }
}
