export default prefix => ({
  selectorInit: '[data-accordion]',
  selectorAccordionItem: `.${prefix}--accordion__item`,
  selectorAccordionItemHeading: `.${prefix}--accordion__heading`,
  selectorAccordionContent: `.${prefix}--accordion__content`,
  classActive: `${prefix}--accordion__item--active`,
});
