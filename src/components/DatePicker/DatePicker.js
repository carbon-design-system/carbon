import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import DatePickerInput from '../DatePickerInput';
import Icon from '../Icon';

// Weekdays shorthand for english locale
l10n.en.weekdays.shorthand.forEach((day, index) => {
  const currentDay = l10n.en.weekdays.shorthand;
  if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
    currentDay[index] = 'Th';
  } else {
    currentDay[index] = currentDay[index].charAt(0);
  }
});

export default class DatePicker extends Component {
  static propTypes = {
    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * `true` to use the short version.
     */
    short: PropTypes.bool,

    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,

    /**
     * The type of the date picker:
     *
     * * `simple` - Without calendar dropdown.
     * * `single` - With calendar dropdown and single date.
     * * `range` - With calendar dropdown and a date range.
     */
    datePickerType: PropTypes.oneOf(['simple', 'single', 'range']),

    /**
     * The date format.
     */
    dateFormat: PropTypes.string,

    /**
     *  The language locale used to format the days of the week, months, and numbers.
     *
     * * `ar` - Arabic
     * * `at` - Austria
     * * `be` - Belarusian
     * * `bg` - Bulgarian
     * * `bn` - Bangla
     * * `cat` - Catalan
     * * `cs` - Czech
     * * `cy` - Welsh
     * * `da` - Danish
     * * `de` - German
     * * `en` - English
     * * `eo` - Esperanto
     * * `es` - Spanish
     * * `et` - Estonian
     * * `fa` - Persian
     * * `fi` - Finnish
     * * `fr` - French
     * * `gr` - Greek
     * * `he` - Hebrew
     * * `hi` - Hindi
     * * `hr` - Croatian
     * * `hu` - Hungarian
     * * `id` - Indonesian
     * * `it` - Italian
     * * `ja` - Japanese
     * * `ko` - Korean
     * * `lt` - Lithuanian
     * * `lv` - Latvian
     * * `mk` - Macedonian
     * * `mn` - Mongolian
     * * `ms` - Malaysian
     * * `my` - Burmese
     * * `nl` - Dutch
     * * `no` - Norwegian
     * * `pa` - Punjabi
     * * `pl` - Polish
     * * `pt` - Portuguese
     * * `ro` - Romanian
     * * `si` - Sinhala
     * * `sk` - Slovak
     * * `sl` - Slovenian
     * * `sq` - Albanian
     * * `sr` - Serbian
     * * `sv` - Swedish
     * * `th` - Thai
     * * `tr` - Turkish
     * * `uk` - Ukrainian
     * * `vn` - Vietnamese
     * * `zh` - Mandarin
     */
    locale: PropTypes.oneOf([
      'ar',
      'at',
      'be',
      'bg',
      'bn',
      'cat',
      'cs',
      'cy',
      'da',
      'de',
      'en',
      'en',
      'eo',
      'es',
      'et',
      'fa',
      'fi',
      'fr',
      'gr',
      'he',
      'hi',
      'hr',
      'hu',
      'id',
      'it',
      'ja',
      'ko',
      'lt',
      'lv',
      'mk',
      'mn',
      'ms',
      'my',
      'nl',
      'no',
      'pa',
      'pl',
      'pt',
      'ro',
      'ru',
      'si',
      'sk',
      'sl',
      'sq',
      'sr',
      'sv',
      'th',
      'tr',
      'uk',
      'vn',
      'zh',
    ]),

    /**
     * The value of the date value provided to flatpickr, could
     * be a date, a date number, a date string, an array of dates.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.object,
        ])
      ),
      PropTypes.object,
      PropTypes.number,
    ]),

    /**
     * The DOM element the Flatpicker should be inserted into. `<body>` by default.
     */
    appendTo: PropTypes.object,

    /**
     * The `change` event handler.
     */
    onChange: PropTypes.func,

    /**
     * The minimum date that a user can start picking from.
     */
    minDate: PropTypes.string,

    /**
     * The maximum date that a user can pick to.
     */
    maxDate: PropTypes.string,
  };

  static defaultProps = {
    short: false,
    light: false,
    dateFormat: 'm/d/Y',
    locale: 'en',
  };

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      if (
        this.props.datePickerType === 'single' ||
        this.props.datePickerType === 'range'
      ) {
        this.cal.setDate(nextProps.value);
        this.updateClassNames(this.cal);
      } else {
        if (this.inputField) {
          this.inputField.value = nextProps.value;
        }
      }
    }
  }

  componentDidMount() {
    const {
      datePickerType,
      dateFormat,
      locale,
      appendTo,
      onChange,
      minDate,
      maxDate,
    } = this.props;
    if (datePickerType === 'single' || datePickerType === 'range') {
      const onHook = (electedDates, dateStr, instance) => {
        this.updateClassNames(instance);
      };
      this.cal = new flatpickr(this.inputField, {
        appendTo,
        mode: datePickerType,
        allowInput: true,
        dateFormat: dateFormat,
        locale: l10n[locale],
        minDate: minDate,
        maxDate: maxDate,
        plugins:
          datePickerType === 'range'
            ? [new rangePlugin({ input: this.toInputField })]
            : '',
        clickOpens: true,
        nextArrow: this.rightArrowHTML(),
        leftArrow: this.leftArrowHTML(),
        onChange: (...args) => {
          if (onChange) {
            onChange(...args);
          }
        },
        onReady: onHook,
        onMonthChange: onHook,
        onYearChange: onHook,
        onOpen: onHook,
        onValueUpdate: onHook,
      });
      this.addKeyboardEvents(this.cal);
    }
  }

  componentWillUnmount() {
    if (
      this.props.datePickerType === 'range' ||
      this.props.datePickerType === 'single'
    ) {
      this.cal.destroy();
    }
    this.inputField.removeEventListener('change', this.onChange);
    if (this.toInputField) {
      this.toInputField.removeEventListener('change', this.onChange);
    }
  }

  onChange = e => {
    if (e.target.value === '' && this.cal.selectedDates.length > 0) {
      this.cal.clear();
    }
  };

  addKeyboardEvents = cal => {
    const input = this.inputField;
    input.addEventListener('keydown', e => {
      if (e.which === 40) {
        cal.calendarContainer.focus();
      }
    });
    input.addEventListener('change', this.onChange);
    if (this.toInputField) {
      this.toInputField.addEventListener('blur', () => {
        this.cal.close();
      });
      this.toInputField.addEventListener('change', this.onChange);
    }
  };

  rightArrowHTML() {
    return `
      <svg height="12" width="7" viewBox="0 0 7 12">
        <path d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z"></path>
      </svg>`;
  }

  leftArrowHTML() {
    return `
      <svg width="7" height="12" viewBox="0 0 7 12" fill-rule="evenodd">
        <path d="M1.45 6.002L7 11.27l-.685.726L0 6.003 6.315 0 7 .726z"></path>
      </svg>`;
  }

  openCalendar = () => {
    this.cal.open();
  };

  updateClassNames = calendar => {
    const calendarContainer = calendar.calendarContainer;
    const daysContainer = calendar.days;
    calendarContainer.classList.add('bx--date-picker__calendar');
    calendarContainer
      .querySelector('.flatpickr-month')
      .classList.add('bx--date-picker__month');
    calendarContainer
      .querySelector('.flatpickr-weekdays')
      .classList.add('bx--date-picker__weekdays');
    calendarContainer
      .querySelector('.flatpickr-days')
      .classList.add('bx--date-picker__days');
    [...calendarContainer.querySelectorAll('.flatpickr-weekday')].forEach(
      item => {
        const currentItem = item;
        currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
        currentItem.classList.add('bx--date-picker__weekday');
      }
    );
    [...daysContainer.querySelectorAll('.flatpickr-day')].forEach(item => {
      item.classList.add('bx--date-picker__day');
      if (
        item.classList.contains('today') &&
        calendar.selectedDates.length > 0
      ) {
        item.classList.add('no-border');
      } else if (
        item.classList.contains('today') &&
        calendar.selectedDates.length === 0
      ) {
        item.classList.remove('no-border');
      }
    });
  };

  assignInputFieldRef = node => {
    this.inputField = !node
      ? null
      : // Child is a regular DOM node, seen in tests
        node.nodeType === Node.ELEMENT_NODE
        ? node.querySelector('.bx--date-picker__input')
        : // Child is a React component
          node.input && node.input.nodeType === Node.ELEMENT_NODE
          ? node.input
          : null;
  };

  assignToInputFieldRef = node => {
    this.toInputField = !node
      ? null
      : // Child is a regular DOM node, seen in tests
        node.nodeType === Node.ELEMENT_NODE
        ? node.querySelector('.bx--date-picker__input')
        : // Child is a React component
          node.input && node.input.nodeType === Node.ELEMENT_NODE
          ? node.input
          : null;
  };

  render() {
    const {
      appendTo, // eslint-disable-line
      children,
      className,
      short,
      light,
      datePickerType,
      minDate, // eslint-disable-line
      maxDate, // eslint-disable-line
      dateFormat, // eslint-disable-line
      onChange, // eslint-disable-line
      locale, // eslint-disable-line
      value, // eslint-disable-line
      ...other
    } = this.props;

    const datePickerClasses = classNames('bx--date-picker', className, {
      'bx--date-picker--short': short,
      'bx--date-picker--light': light,
      'bx--date-picker--simple': datePickerType === 'simple',
      'bx--date-picker--single': datePickerType === 'single',
      'bx--date-picker--range': datePickerType === 'range',
    });

    const datePickerIcon =
      datePickerType === 'range' ? (
        <Icon
          name="calendar"
          className="bx--date-picker__icon"
          onClick={this.openCalendar}
        />
      ) : (
        ''
      );

    const childArray = React.Children.toArray(children);
    const childrenWithProps = childArray.map((child, index) => {
      if (index === 0 && child.type === DatePickerInput) {
        return React.cloneElement(child, {
          datePickerType,
          ref: this.assignInputFieldRef,
        });
      } else if (index === 1 && child.type === DatePickerInput) {
        return React.cloneElement(child, {
          datePickerType,
          ref: this.assignToInputFieldRef,
        });
      } else if (index === 0) {
        return React.cloneElement(child, {
          ref: this.assignInputFieldRef,
        });
      } else if (index === 1) {
        return React.cloneElement(child, {
          ref: this.assignToInputFieldRef,
        });
      }
    });
    return (
      <div className="bx--form-item">
        <div className={datePickerClasses} {...other}>
          {childrenWithProps}
          {datePickerIcon}
        </div>
      </div>
    );
  }
}
