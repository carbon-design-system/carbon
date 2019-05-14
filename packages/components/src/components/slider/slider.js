/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';

class Slider extends mixin(
  createComponent,
  initComponentBySearch,
  eventedState,
  handles
) {
  /**
   * Slider.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as an slider.
   */
  constructor(element, options) {
    super(element, options);

    this.sliderActive = false;
    this.dragging = false;

    this.track = this.element.querySelector(this.options.selectorTrack);
    this.filledTrack = this.element.querySelector(
      this.options.selectorFilledTrack
    );
    this.thumb = this.element.querySelector(this.options.selectorThumb);
    this.input = this.element.querySelector(this.options.selectorInput);

    if (this.element.dataset.sliderInputBox) {
      this.boundInput = this.element.ownerDocument.querySelector(
        this.element.dataset.sliderInputBox
      );
      this._updateInput();
      this.manage(
        on(this.boundInput, 'change', evt => {
          this.setValue(evt.target.value);
        })
      );
      this.manage(
        on(this.boundInput, 'focus', evt => {
          evt.target.select();
        })
      );
      // workaround for safari
      this.manage(
        on(this.boundInput, 'mouseup', evt => {
          evt.preventDefault();
        })
      );
    }

    this._updatePosition();

    this.manage(
      on(this.thumb, 'mousedown', () => {
        this.sliderActive = true;
      })
    );
    this.manage(
      on(this.element.ownerDocument, 'mouseup', () => {
        this.sliderActive = false;
      })
    );
    this.manage(
      on(this.element.ownerDocument, 'mousemove', evt => {
        const disabled = this.element.classList.contains(
          this.options.classDisabled
        );
        if (this.sliderActive === true && !disabled) {
          this._updatePosition(evt);
        }
      })
    );
    this.manage(
      on(this.thumb, 'keydown', evt => {
        const disabled = this.element.classList.contains(
          this.options.classDisabled
        );
        if (!disabled) {
          this._updatePosition(evt);
        }
      })
    );
    this.manage(
      on(this.track, 'click', evt => {
        const disabled = this.element.classList.contains(
          this.options.classDisabled
        );
        if (!disabled) {
          this._updatePosition(evt);
        }
      })
    );
  }

  _changeState = (state, detail, callback) => {
    callback();
  };

  _updatePosition(evt) {
    const { left, newValue } = this._calcValue(evt);

    if (this.dragging) {
      return;
    }

    this.dragging = true;

    requestAnimationFrame(() => {
      this.dragging = false;
      this.thumb.style.left = `${left}%`;
      this.filledTrack.style.transform = `translate(0%, -50%) scaleX(${left /
        100})`;
      this.input.value = newValue;
      this._updateInput();
      this.changeState('slider-value-change', { value: newValue });
    });
  }

  _calcValue(evt) {
    const { value, min, max, step } = this.getInputProps();

    const range = max - min;
    const valuePercentage = ((value - min) / range) * 100;

    let left;
    let newValue;
    left = valuePercentage;
    newValue = value;

    if (evt) {
      const { type } = evt;

      if (type === 'keydown') {
        const direction = {
          40: -1, // decreasing
          37: -1, // decreasing
          38: 1, // increasing
          39: 1, // increasing
        }[evt.which];

        if (direction !== undefined) {
          const multiplier =
            evt.shiftKey === true
              ? range / step / this.options.stepMultiplier
              : 1;
          const stepMultiplied = step * multiplier;
          const stepSize = (stepMultiplied / range) * 100;
          left = valuePercentage + stepSize * direction;
          newValue = Number(value) + stepMultiplied * direction;
        }
      }
      if (type === 'mousemove' || type === 'click') {
        if (type === 'click') {
          this.element
            .querySelector(this.options.selectorThumb)
            .classList.add(this.options.classThumbClicked);
        } else {
          this.element
            .querySelector(this.options.selectorThumb)
            .classList.remove(this.options.classThumbClicked);
        }

        const track = this.track.getBoundingClientRect();
        const unrounded = (evt.clientX - track.left) / track.width;
        const rounded = Math.round((range * unrounded) / step) * step;
        left = (rounded / range) * 100;
        newValue = rounded + min;
      }
    }

    if (newValue <= Number(min)) {
      left = 0;
      newValue = min;
    }
    if (newValue >= Number(max)) {
      left = 100;
      newValue = max;
    }

    return { left, newValue };
  }

  _updateInput() {
    if (this.boundInput) {
      this.boundInput.value = this.input.value;
    }
  }

  getInputProps() {
    const values = {
      value: Number(this.input.value),
      min: Number(this.input.min),
      max: Number(this.input.max),
      step: this.input.step ? Number(this.input.step) : 1,
    };
    return values;
  }

  setValue(value) {
    this.input.value = value;
    this._updatePosition();
  }

  stepUp() {
    this.input.stepUp();
    this._updatePosition();
  }

  stepDown() {
    this.input.stepDown();
    this._updatePosition();
  }

  /**
   * The map associating DOM element and Slider UI instance.
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * properties in this object are overriden for the instance being created.
   * @property {string} selectorInit The CSS selector to find slider instances.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-slider]',
      selectorTrack: `.${prefix}--slider__track`,
      selectorFilledTrack: `.${prefix}--slider__filled-track`,
      selectorThumb: `.${prefix}--slider__thumb`,
      selectorInput: `.${prefix}--slider__input`,
      classDisabled: `${prefix}--slider--disabled`,
      classThumbClicked: `${prefix}--slider__thumb--clicked`,
      eventBeforeSliderValueChange: 'slider-before-value-change',
      eventAfterSliderValueChange: 'slider-after-value-change',
      stepMultiplier: 4,
    };
  }
}

export default Slider;
