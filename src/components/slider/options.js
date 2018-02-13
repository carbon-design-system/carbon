export default prefix => ({
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
});
