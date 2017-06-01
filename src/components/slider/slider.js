import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
// import eventMatches from '../../globals/js/misc/event-matches';

class Slider extends mixin(createComponent, initComponentBySearch) {
  /**
   * Slider.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an slider.
   */
  constructor(element, options) {
    super(element, options);

    this.sliderActive = false;

    this.track = this.element.querySelector(this.options.selectorTrack);
    this.filledTrack = this.element.querySelector(this.options.selectorFilledTrack);
    this.thumb = this.element.querySelector(this.options.selectorThumb);
    this.input = this.element.querySelector(this.options.selectorInput);

    if (this.element.dataset.sliderInputBox) {
      this.boundInput = this.element.ownerDocument.querySelector(this.element.dataset.sliderInputBox);
      this._updateInput();
    }

    this.dragging = false;

    this._updatePosition();

    this.thumb.addEventListener('mousedown', (evt) => { this._handleMouseDown(evt); });
    this.element.ownerDocument.addEventListener('mouseup', (evt) => { this._handleMouseUp(evt); });
    this.element.ownerDocument.addEventListener('mousemove', (evt) => { this._handleMouseMove(evt); });
    this.thumb.addEventListener('keydown', (evt) => { this._handleKeyDown(evt); });
    this.track.addEventListener('click', (evt) => { this._handleClick(evt); });
  }

  _handleMouseDown() {
    this.sliderActive = true;
  }

  _handleMouseMove(evt) {
    if (this.sliderActive === true) {
      this._updatePosition(evt);
    }
  }

  _handleMouseUp() {
    this.sliderActive = false;
  }

  _handleKeyDown(evt) {
    this._updatePosition(evt);
  }

  _handleClick(evt) {
    this._updatePosition(evt);
  }


  _updatePosition(evt) {
    // const change = evt ? evt.movementX : 0;

    let direction;
    if (evt) {
      // if (evt.which === 40 || evt.which === 37 || change < 0) {
      if (evt.which === 40 || evt.which === 37) {
        direction = 'decreasing';
      }
      // if (evt.which === 38 || evt.which === 39 || change > 0) {
      if (evt.which === 38 || evt.which === 39) {
        direction = 'increasing';
      }
    }


    const {
      left,
      newValue,
    } = this._doMath(evt, direction);


    if (this.dragging) {
      return;
    }

    this.dragging = true;

    requestAnimationFrame(() => {
      this.dragging = false;

      this.thumb.style.left = `${left}%`;
      this.filledTrack.style.transform = `scaleX(${left / 100})`;
      this.input.value = newValue;
      this._updateInput();
    });
  }

  _doMath(evt, direction) {
    const {
      value,
      min,
      max,
      step,
    } = this.getInputProps();

    const stepSize = step / this.track.getBoundingClientRect().width;
    const range = max - min;
    const valuePercentage = (((value - min) / range) * 100);

    let left;
    let newValue;
    left = valuePercentage;
    newValue = value;

    if (evt && evt.clientX) {
      const track = this.track.getBoundingClientRect();
      const unrounded = ((evt.clientX - track.left) / track.width);
      const rounded = Math.round(((range * unrounded) / step)) * step;
      left = (((rounded - min) / range) * 100);
      newValue = rounded;
      console.log(unrounded, rounded, left);
    }

    if (direction) {
      left = direction === 'decreasing' ?
        valuePercentage - stepSize
        : valuePercentage + stepSize;
      newValue = direction === 'decreasing' ? Number(value) - Number(step) : Number(value) + Number(step);
    }

    if (newValue <= min) {
      left = 0;
      newValue = min;
    }
    if (newValue >= Number(max)) {
      left = 100;
      newValue = max;
    }
    return { left, newValue };
  }

  getInputProps() {
    const values = {
      value: this.input.value,
      min: this.input.min,
      max: this.input.max,
      step: this.input.step,
    };
    return values;
  }

  setValue(value) {
    this.input.value = value;
    this._updatePosition();
  }

  _updateInput() {
    if (this.boundInput) {
      this.boundInput.value = this.input.value;
    }
  }

  release() {
    super.release();
  }

  /**
   * The map associating DOM element and Slider UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * properties in this object are overriden for the instance being created.
   * @property {string} selectorInit The CSS selector to find slider instances.
   */
  static options = {
    selectorInit: '[data-slider]',
    selectorTrack: '.bx--slider__track',
    selectorFilledTrack: '.bx--slider__filled-track',
    selectorThumb: '.bx--slider__thumb',
    selectorInput: '.bx--slider__input',
  }
}

export default Slider;
