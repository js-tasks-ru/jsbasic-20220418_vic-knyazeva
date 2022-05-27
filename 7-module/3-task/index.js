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

    this.updateValue();

    this._elem.addEventListener('click', (event) => {
      let relativeX = event.clientX - this._elem.getBoundingClientRect().left;
      let newValue = relativeX / this._elem.offsetWidth * (this._total - 1);
      this.setValue(newValue);
    });
  }

  setValue(value) {
    const prev = this._value;
    if (value < 0)
      this._value = 0;
    else if (value > this._total - 1)
      this._value = this._total - 1;
    else
      this._value = Math.round(value);

    this.updateValue();

    if (this._value !== prev) {
      const event = new CustomEvent('slider-change', {
        detail: this._value,
        bubbles: true
      });
      this._elem.dispatchEvent(event);
    }
  }

  updateValue() {
    this._steps.childNodes.forEach((e, index) => {
      if (this._value === index)
        e.classList.add('slider__step-active');
      else
        e.classList.remove('slider__step-active');
    });

    this._thumb.firstChild.textContent = this._value.toFixed(0);

    const v = `${this._value * 100 / (this._total - 1)}%`;
    this._thumb.style.left = v;
    this._progress.style.width = v;
  }
}
