export default prefix => ({
  selectorInit: '[data-progress]',
  selectorStepElement: `.${prefix}--progress-step`,
  selectorCurrent: `.${prefix}--progress-step--current`,
  selectorIncomplete: `.${prefix}--progress-step--incomplete`,
  selectorComplete: `.${prefix}--progress-step--complete`,
  classStep: `${prefix}--progress-step`,
  classComplete: `${prefix}--progress-step--complete`,
  classCurrent: `${prefix}--progress-step--current`,
  classIncomplete: `${prefix}--progress-step--incomplete`,
});
