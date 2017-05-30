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
    if (this.element.dataset.datePicker === 'range') {
      this._initRangedDatePicker();
    } else if (this.element.dataset.datePicker === 'basic') {
      this._initDatePicker();
    } else if (this.element.dataset.datePicker === 'no-calendar') {
      this._initNoCalendarDatePicker();
    }
  }

  _rightArrowHTML() {
    return (`
      <svg width="8" height="12">
        <use xlink:href="/carbon-icons/bluemix-icons.svg#icon--chevron--right"></use>
      </svg>`
    );
  }

  _leftArrowHTML() {
    return (`
      <svg width="8" height="12">
        <use xlink:href="/carbon-icons/bluemix-icons.svg#icon--chevron--left"></use>
      </svg>`
    );
  }

  _initNoCalendarDatePicker = () => {
    const inputField = this.element.querySelector(this.options.selectorDatePickerInput);
    inputField.addEventListener('focus', () => {
      inputField.value = inputField.value.replace(/\s+/g, '');
    });
    inputField.addEventListener('blur', () => {
      if ((inputField.value.length === 7 || inputField.value.length === 10) && inputField.value.indexOf('/') > -1) {
        const inputValue = inputField.value;
        const inputValueArr = inputValue.split('/');
        let newInputValue = '';
        let increment = 0;
        inputValueArr.forEach((val) => {
          increment++;
          if (increment === inputValueArr.length) {
            newInputValue += `${val}`;
          } else {
            newInputValue += `${val} / `;
          }
        });
        inputField.value = newInputValue;
      }
    });
  }

  _initRangedDatePicker = () => {
    const fromDate = this.element.querySelector(this.options.selectorDatePickerInputFrom);
    const toDate = this.element.querySelector(this.options.selectorDatePickerInputTo);
    const datePickerIcon = this.element.querySelector(this.options.selectorDatePickerIcon);
    const calendar = new Flatpickr(fromDate, {
      allowInput: true,
      dateFormat: 'm/d/Y',
      mode: 'range',
      appendTo: this.element,
      minDate: 'today',
      onChange: () => {
        this._updateClassNames(calendar);
        this._updateDatePickerPosition(calendar);
      },
      onClose: (selectedDates) => {
        this._updateInputFields(selectedDates, true);
      },
      onMonthChange: () => {
        this._updateClassNames(calendar);
      },
      onYearChange: () => {
        this._updateClassNames(calendar);
      },
      onOpen: () => {
        this._updateClassNames(calendar);
        this._updateDatePickerPosition(calendar);
      },
      nextArrow: this._rightArrowHTML(),
      prevArrow: this._leftArrowHTML(),
    });
    this._updateClassNames(calendar);
    toDate.addEventListener('click', () => {
      toDate.focus();
      calendar.open();
    });
    datePickerIcon.addEventListener('click', () => {
      calendar.open();
    });
    fromDate.addEventListener('focus', () => {
      fromDate.value = fromDate.value.replace(/\s+/g, '');
    });
    toDate.addEventListener('focus', () => {
      toDate.value = toDate.value.replace(/\s+/g, '');
    });
  }

  _updateDatePickerPosition = (calendar) => {
    const cal = calendar;
    cal.calendarContainer.style.top = '67px';
    cal.calendarContainer.style.left = '0px';
  }

  _updateClassNames = (calendar) => {
    const calendarContainer = calendar.calendarContainer;
    calendarContainer.classList.add(this.options.classCalendarContainer);
    calendarContainer.querySelector('.flatpickr-month').classList.add(this.options.classMonth);
    calendarContainer.querySelector('.flatpickr-weekdays').classList.add(this.options.classWeekdays);
    calendarContainer.querySelector('.flatpickr-days').classList.add(this.options.classDays);
    [...calendarContainer.querySelectorAll('.flatpickr-weekday')].forEach((item) => {
      const currentItem = item;
      currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
      currentItem.classList.add(this.options.classWeekday);
      if (currentItem.innerHTML === 'Thu' || currentItem.innerHTML === 'Th') {
        currentItem.innerHTML = 'Th';
      } else {
        currentItem.innerHTML = item.innerHTML.charAt(0);
      }
    });
    [...calendarContainer.querySelectorAll('.flatpickr-day')].forEach((item) => {
      if ((item.classList.contains('selected') && item.classList.contains('inRange'))
         || (item.classList.contains('selected') && item.classList.contains('endRange'))) {
        if (item.previousElementSibling) {
          item.previousElementSibling.classList.add(this.options.classPrevDay);
        }
      }
      item.classList.add(this.options.classDay);
    });
  }

  _updateInputFields = (selectedDates, isRange) => {
    if (isRange) {
      if (selectedDates.length === 2) {
        this.element.querySelector(this.options.selectorDatePickerInputFrom).value = this._formatDate(selectedDates[0]);
        this.element.querySelector(this.options.selectorDatePickerInputTo).value = this._formatDate(selectedDates[1]);
      } else {
        this.element.querySelector(this.options.selectorDatePickerInputFrom).value = this._formatDate(selectedDates[0]);
      }
    } else {
      this.element.querySelector(this.options.selectorDatePickerInput).value = this._formatDate(selectedDates[0]);
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
    const calendar = new Flatpickr(date, {
      allowInput: true,
      dateFormat: 'm/d/Y',
      appendTo: this.element,
      minDate: 'today',
      onChange: () => {
        this._updateClassNames(calendar);
      },
      onClose: (selectedDates) => {
        this._updateInputFields(selectedDates, false);
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
      nextArrow: this._rightArrowHTML(),
      prevArrow: this._leftArrowHTML(),
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
    selectorDatePickerInput: '[data-date-picker-input]',
    selectorDatePickerInputFrom: '[data-date-picker-input-from]',
    selectorDatePickerInputTo: '[data-date-picker-input-to]',
    selectorDatePickerIcon: '[data-date-picker-icon]',
    classCalendarContainer: 'bx--date-picker__calendar',
    classMonth: 'bx--date-picker__month',
    classWeekdays: 'bx--date-picker__weekdays',
    classDays: 'bx--date-picker__days',
    classWeekday: 'bx--date-picker__weekday',
    classDay: 'bx--date-picker__day',
    classPrevDay: 'bx--date-picker__day--prev',
  };

  /**
   * The map associating DOM element and date picker UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default DatePicker;
