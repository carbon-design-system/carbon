export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-copy-btn]',
    feedbackTooltip: '[data-feedback]',
    classShowFeedback: `${prefix}--btn--copy__feedback--displayed`,
    timeoutValue: 2000,
  };
};
