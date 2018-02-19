export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-date-picker]',
    selectorDatePickerInput: '[data-date-picker-input]',
    selectorDatePickerInputFrom: '[data-date-picker-input-from]',
    selectorDatePickerInputTo: '[data-date-picker-input-to]',
    selectorDatePickerIcon: '[data-date-picker-icon]',
    classCalendarContainer: `${prefix}--date-picker__calendar`,
    classMonth: `${prefix}--date-picker__month`,
    classWeekdays: `${prefix}--date-picker__weekdays`,
    classDays: `${prefix}--date-picker__days`,
    classWeekday: `${prefix}--date-picker__weekday`,
    classDay: `${prefix}--date-picker__day`,
    classFocused: `${prefix}--focused`,
    attribType: 'data-date-picker-type',
    dateFormat: 'm/d/Y',
  };
};
