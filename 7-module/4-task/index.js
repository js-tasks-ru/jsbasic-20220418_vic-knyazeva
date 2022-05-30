export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._total = steps;
    this._value = value;
    this.render();
  }

  get elem() {
    return this._elem;
  }

  render() {
    this._elem = document.createElement('DIV');
    this._elem.classList.add('slider');

    // Ползунок слайдера с активным значением
    this._thumb = document.createElement('DIV');
    this._thumb.classList.add('slider__thumb');
    this._thumb.innerHTML = `<span class="slider__value"></span>`;

    this._elem.appendChild(this._thumb);

    // Заполненная часть слайдера
    this._progress = document.createElement('DIV');
    this._progress.classList.add('slider__progress');
    this._progress.style.width = '50%';

    this._elem.appendChild(this._progress);

    // Шаги слайдера
    this._steps = document.createElement('DIV');
    this._steps.classList.add('slider__steps');

    for (let v = 0; v < this._total; ++v) {
      const stepElem = document.createElement('SPAN');
      this._steps.appendChild(stepElem);
    }
    this._elem.appendChild(this._steps);

    this.updateValue(this._value);

    this._elem.addEventListener('click', (event) => {
      const newValue = this.valueFromEvent(event);
      this.setValue(newValue);
    });

    // drag
    this._thumb.ondragstart = () => false;
    this._thumb.addEventListener('pointerdown', (event) => {
      this._inDrag = true;
      this._elem.classList.add('slider_dragging');

      this.__dragMoveHandler = (event) => {
        event.preventDefault();
        const newValue = this.fixupValue(this.valueFromEvent(event), false);
        this.updateValue(newValue);
      };

      this.__dragStopHandler = (event) => {
        event.preventDefault();

        const newValue = this.valueFromEvent(event);
        this.setValue(newValue);

        this._inDrag = false;
        this._elem.classList.remove('slider_dragging');

        document.body.removeEventListener('pointermove', this.__dragMoveHandler);
        delete this.__dragMoveHandler;

        document.body.removeEventListener('pointerup', this.__dragStopHandler);
        delete this.__dragStopHandler;
      };

      document.body.addEventListener('pointermove', this.__dragMoveHandler);
      document.body.addEventListener('pointerup', this.__dragStopHandler);
    });
  }

  setValue(value) {
    const prev = this._value;
    this._value = this.fixupValue(value, true);

    this.updateValue(this._value);

    if (this._value !== prev) {
      const event = new CustomEvent('slider-change', {
        detail: this._value,
        bubbles: true
      });
      this._elem.dispatchEvent(event);
    }
  }

  updateValue(value) {
    const roundedValue = Math.round(value);

    this._steps.childNodes.forEach((e, index) => {
      if (roundedValue === index)
        e.classList.add('slider__step-active');
      else
        e.classList.remove('slider__step-active');
    });

    this._thumb.firstChild.textContent = roundedValue.toFixed(0);

    const v = `${value * 100 / (this._total - 1)}%`;
    this._thumb.style.left = v;
    this._progress.style.width = v;
  }

  fixupValue(value, round = true) {
    if (value < 0)
      return 0;
    if (value > this._total - 1)
      return this._total - 1;
    if (round)
      return Math.round(value);
    else
      return value;
  }

  valueFromEvent(event) {
    let relativeX = event.clientX - this._elem.getBoundingClientRect().left;
    let value = relativeX / this._elem.offsetWidth * (this._total - 1);
    return value;
  }
}
