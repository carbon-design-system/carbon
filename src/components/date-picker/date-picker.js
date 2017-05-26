import Flatpickr from 'flatpickr';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch
  from '../../globals/js/mixins/init-component-by-search';

class DatePicker extends mixin(createComponent, initComponentBySearch) {
  /**
   * DatePicker.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an date picker.
   */
  constructor(element, options) {
    super(element, options);

    const isRange = (!(element.dataset.datePickerRange === undefined));
    if (isRange) {
      this._initRangedDatePicker();
    } else {
      this._initDatePicker();
    }
  }

  _initRangedDatePicker = () => {
    const fromDate = this.element.querySelector(this.options.selectorDatePickerInputFrom);
    const toDate = this.element.querySelector(this.options.selectorDatePickerInputTo);
    fromDate.placeholder = 'mm / dd / yyyy';
    toDate.placeholder = 'mm / dd / yyyy';
    const calendar = new Flatpickr(fromDate, {
      allowInput: true,
      dateFormat: 'm/d/Y',
      mode: 'range',
      onChange: () => {
        this._updateClassNames(calendar);
      },
      onClose: (selectedDates) => {
        this._updateInputFields(selectedDates);
        if (selectedDates.length === 1) {
          calendar.defaultDate = [selectedDates[0], selectedDates[0]];
          calendar.selectedDates = [selectedDates[0], selectedDates[0]];
        }
      },
      onMonthChange: () => {
        this._updateClassNames(calendar);
      },
      onYearChange: () => {
        this._updateClassNames(calendar);
      },
      onOpen: () => {
        this._updateClassNames(calendar);
      },
      nextArrow: `<svg width="8" height="12">
      <use xlink:href="/carbon-icons/bluemix-icons.svg#icon--chevron--right"></use>
    </svg>`,
      prevArrow: `<svg width="8" height="12">
      <use xlink:href="/carbon-icons/bluemix-icons.svg#icon--chevron--left"></use>
    </svg>`,
    });
    this._updateClassNames(calendar);
    const datePickerIcon = this.element.querySelector(this.options.selectorDatePickerIcon);
    toDate.addEventListener('click', () => {
      toDate.focus();
      calendar.open();
      calendar.selectedDates = [calendar.selectedDates[0], calendar.selectedDates[0]];
    });
    datePickerIcon.addEventListener('click', () => {
      calendar.open();
    });
    fromDate.addEventListener('focus', () => {
      fromDate.value = fromDate.value.replace(/\s+/g, '');
    });
    fromDate.addEventListener('blur', () => {
      if (!(fromDate.value === '')) {
        fromDate.value = fromDate.value;
      }
    });
    toDate.addEventListener('focus', () => {
      toDate.value = toDate.value.replace(/\s+/g, '');
    });
  }

  _updateClassNames = (calendar) => {
    const calendarContainer = calendar.calendarContainer;
    calendarContainer.classList.add('bx--date-picker__calendar');
    calendarContainer.querySelector('.flatpickr-month').classList.add('bx--date-picker__month');
    calendarContainer.querySelector('.flatpickr-weekdays').classList.add('bx--date-picker__weekdays');
    calendarContainer.querySelector('.flatpickr-days').classList.add('bx--date-picker__days');
    [...calendarContainer.querySelectorAll('.flatpickr-weekday')].forEach((item) => {
      item.innerHTML = item.innerHTML.replace(/\s+/g, '');
      item.classList.add('bx--date-picker__weekday');
      if (item.innerHTML === 'Thu' || item.innerHTML === 'Th') {
        item.innerHTML = 'Th';
      } else {
        item.innerHTML = item.innerHTML.charAt(0);
      }
    });
    [...calendarContainer.querySelectorAll('.flatpickr-day')].forEach((item) => {
      if (item.classList.contains('selected') && item.classList.contains('inRange')) {
        if (item.previousElementSibling) {
          item.previousElementSibling.classList.add('prev');
        }
      }
      if (item.classList.contains('selected') && item.classList.contains('endRange')) {
        if (item.previousElementSibling) {
          item.previousElementSibling.classList.add('prev');
        }
      }
      item.classList.add('bx--date-picker__day');
    });
  }

  _updateInputFields = (selectedDates) => {
    if (selectedDates.length > 1) {
      const fromDate = this.element.querySelector(this.options.selectorDatePickerInputFrom);
      const toDate = this.element.querySelector(this.options.selectorDatePickerInputTo);
      const newFromDate = this._formatDate(selectedDates[0]);
      const newToDate = this._formatDate(selectedDates[1]);
      fromDate.value = newFromDate;
      toDate.value = newToDate;
    } else if (selectedDates.length === 1 && !(this.element.dataset.datePickerRange === undefined)) {
      const fromDate = this.element.querySelector(this.options.selectorDatePickerInputFrom);
      const newFromDate = this._formatDate(selectedDates[0]);
      fromDate.value = newFromDate;
    } else if (selectedDates.length === 1 && this.element.dataset.datePickerRange === undefined) {
      const date = this.element.querySelector(this.options.selectorDatePickerInput);
      const newDate = this._formatDate(selectedDates[0]);
      date.value = newDate;
    }
  }

  _formatDate = (date) => {
    const month = (date.getMonth() + 1) < 10
    ? `0${(date.getMonth() + 1)}`
    : (date.getMonth() + 1);
    const day = date.getDate() < 10
    ? `0${date.getDate()}`
    : date.getDate();
    return `${month} / ${day} / ${date.getFullYear()}`;
  }

  _initDatePicker = () => {
    const date = this.element.querySelector(this.options.selectorDatePickerInput);
    date.placeholder = 'mm / dd / yyyy';
    const calendar = new Flatpickr(date, {
      allowInput: true,
      dateFormat: 'm/d/Y',
      onChange: () => {
        // this._updateInputFields(selectedDates);
        this._updateClassNames(calendar);
      },
      onClose: (selectedDates) => {
        this._updateInputFields(selectedDates);
      },
      onMonthChange: () => {
        this._updateClassNames(calendar);
      },
      onYearChange: () => {
        this._updateClassNames(calendar);
      },
      onOpen: () => {
        this._updateClassNames(calendar);
      },
    });
    this._updateClassNames(calendar);
    date.addEventListener('focus', () => {
      date.value = date.value.replace(/\s+/g, '');
    });
  }

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode DatePicker.create .create()}, or {@linkcode DatePicker.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode DatePicker.init .init()} works.
   * @property {string} selectorInit The CSS selector to find date picker UIs.
   */
  static options = {
    selectorInit: '[data-date-picker]',
    selectorDatePickerRange: '[data-date-picker-range]',
    selectorDatePickerInput: '[data-date-picker-input]',
    selectorDatePickerInputFrom: '[data-date-picker-input-from]',
    selectorDatePickerInputTo: '[data-date-picker-input-to]',
    selectorDatePickerIcon: '[data-date-picker-icon]',
  };

  /**
   * The map associating DOM element and date picker UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default DatePicker;
