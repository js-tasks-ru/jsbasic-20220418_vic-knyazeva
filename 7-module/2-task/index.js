import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._elem = render();
    const closeButton = this._elem.querySelector('.modal__close');
    closeButton.addEventListener('click', () => this.close());
  }

  setTitle(titleString) {
    const modalTitle = this._elem.querySelector('.modal__title');
    modalTitle.textContent = titleString;
  }

  setBody(node) {
    const modalBody = this._elem.querySelector('.modal__body');
    modalBody.appendChild(node);
  }

  open() {
    let body = document.body;
    body.appendChild(this._elem);
    body.classList.add('is-modal-open');

    if (!this.kbdHandler) {
      this.kbdHandler = (event) => {
        if (event.code === 'Escape') {
          this.close();
        }
      };
    }
    body.addEventListener('keydown', this.kbdHandler);

    this._opened = true;
  }

  close() {
    if (!this._opened)
      return;
    
    this._opened = false;

    const body = document.body;
    document.removeEventListener('keydown', this.kbdHandler);
    body.removeChild(this._elem);
    body.classList.remove('is-modal-open');

    const modalTitle = this._elem.querySelector('.modal__title');
    modalTitle.textContent = '';

    const modalBody = this._elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
  }
}

function render() {
  const element = document.createElement('DIV');
  element.classList.add('modal');
  {
    element.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>
    `;
  }
  return element;
}

