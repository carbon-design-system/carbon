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
    this.thumb = this.element.querySelector(this.options.selectorThumb);
    this.input = this.element.querySelector(this.options.selectorInput);

    this.dragging = false;

    this._updatePosition();
    // this.element.addEventListener('click', (evt) => { this._handleClick(evt); });
    this.element.addEventListener('mousedown', (evt) => { this._handleMouseDown(evt); });
    this.element.ownerDocument.addEventListener('mousemove', (evt) => { this._handleMouseMove(evt); });
    this.element.ownerDocument.addEventListener('mouseup', (evt) => { this._handleMouseUp(evt); });

    this.element.addEventListener('keydown', (evt) => { this._handleKeyDown(evt); });
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

  _updatePosition(evt) {
    const change = evt ? evt.movementX : 0;

    let direction;
    if (evt) {
      if (evt.which === 40 || evt.which === 37 || change < 0) {
        direction = 'decreasing';
      }
      if (evt.which === 38 || evt.which === 39 || change > 0) {
        direction = 'increasing';
      }
    }

    const {
      left,
      newValue,
    } = this._doMath(change, direction);


    if (this.dragging) {
      return;
    }

    this.dragging = true;

    requestAnimationFrame(() => {
      this.dragging = false;

      this.thumb.style.left = `${left}%`;
      if (newValue) { this.setValue(newValue); }
    });
  }

  _doMath(change, direction) {
    const {
      value,
      min,
      max,
      step,
    } = this.getInputProps();
    const stepSize = step / this.track.getBoundingClientRect().width;
    const valuePercentage = (((value - min) / (max - min)) * 100);
    let left;
    let newValue;
    if (direction) {
      left = direction === 'decreasing' ? valuePercentage - stepSize : valuePercentage + stepSize;
      newValue = direction === 'decreasing' ? Number(value) - Number(step) : Number(value) + Number(step);
    } else {
      left = valuePercentage;
    }
    if (newValue <= min) {
      left = 0;
      newValue = min;
    }
    if (newValue >= max) {
      left = 100;
      newValue = max;
    }
    return { left, newValue };
    // console.log(current, change);
    // const left = current + change;
    // let left;
    // if (val >= 100) {
    //   left = 100;
    // }
    // if (val <= 0) {
    //   left = 0;
    // }
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
    selectorThumb: '.bx--slider__thumb',
    selectorInput: '.bx--slider__input',
  }
}

export default Slider;
