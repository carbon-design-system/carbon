/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
import { settings } from 'carbon-components';
import DatePickerInput from '../DatePickerInput';
import carbonFlatpickrFixEventsPlugin from './plugins/fixEventsPlugin';
import carbonFlatpickrRangePlugin from './plugins/rangePlugin';
import { match, keys } from '../../internal/keyboard';

const { prefix } = settings;

// Weekdays shorthand for english locale
l10n.en.weekdays.shorthand.forEach((day, index) => {
  const currentDay = l10n.en.weekdays.shorthand;
  if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
    currentDay[index] = 'Th';
  } else {
    currentDay[index] = currentDay[index].charAt(0);
  }
});

const forEach = Array.prototype.forEach;

/**
 * @param {number} monthNumber The month number.
 * @param {boolean} shorthand `true` to use shorthand month.
 * @param {Locale} locale The Flatpickr locale data.
 * @returns {string} The month string.
 */
const monthToStr = (monthNumber, shorthand, locale) =>
  locale.months[shorthand ? 'shorthand' : 'longhand'][monthNumber];

/**
 * @param {object} config Plugin configuration.
 * @param {boolean} [config.shorthand] `true` to use shorthand month.
 * @param {string} config.selectorFlatpickrMonthYearContainer The CSS selector for the container of month/year selection UI.
 * @param {string} config.selectorFlatpickrYearContainer The CSS selector for the container of year selection UI.
 * @param {string} config.selectorFlatpickrCurrentMonth The CSS selector for the text-based month selection UI.
 * @param {string} config.classFlatpickrCurrentMonth The CSS class for the text-based month selection UI.
 * @returns {Plugin} A Flatpickr plugin to use text instead of `<select>` for month picker.
 */
const carbonFlatpickrMonthSelectPlugin = config => fp => {
  const setupElements = () => {
    if (!fp.monthElements) {
      return;
    }
    fp.monthElements.forEach(elem => {
      if (!elem.parentNode) return;
      elem.parentNode.removeChild(elem);
    });
    fp.monthElements.splice(
      0,
      fp.monthElements.length,
      ...fp.monthElements.map(() => {
        // eslint-disable-next-line no-underscore-dangle
        const monthElement = fp._createElement(
          'span',
          config.classFlatpickrCurrentMonth
        );
        monthElement.textContent = monthToStr(
          fp.currentMonth,
          config.shorthand === true,
          fp.l10n
        );
        fp.yearElements[0]
          .closest(config.selectorFlatpickrMonthYearContainer)
          .insertBefore(
            monthElement,
            fp.yearElements[0].closest(config.selectorFlatpickrYearContainer)
          );
        return monthElement;
      })
    );
  };

  const updateCurrentMonth = () => {
    const monthStr = monthToStr(
      fp.currentMonth,
      config.shorthand === true,
      fp.l10n
    );
    fp.yearElements.forEach(elem => {
      const currentMonthContainer = elem.closest(
        config.selectorFlatpickrMonthYearContainer
      );
      Array.prototype.forEach.call(
        currentMonthContainer.querySelectorAll('.cur-month'),
        monthElement => {
          monthElement.textContent = monthStr;
        }
      );
    });
  };

  const register = () => {
    fp.loadedPlugins.push('carbonFlatpickrMonthSelectPlugin');
  };

  return {
    onMonthChange: updateCurrentMonth,
    onValueUpdate: updateCurrentMonth,
    onOpen: updateCurrentMonth,
    onReady: [setupElements, updateCurrentMonth, register],
  };
};

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
     * The `close` event handler.
     */
    onClose: PropTypes.func,

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
      if (this.cal) {
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
      appendTo,
      datePickerType,
      dateFormat,
      locale,
      minDate,
      maxDate,
      value,
      onClose,
    } = this.props;
    if (datePickerType === 'single' || datePickerType === 'range') {
      const onHook = (electedDates, dateStr, instance) => {
        this.updateClassNames(instance);
      };

      // inputField ref might not be set in enzyme tests
      if (this.inputField) {
        this.cal = new flatpickr(this.inputField, {
          disableMobile: true,
          defaultDate: value,
          appendTo,
          mode: datePickerType,
          allowInput: true,
          dateFormat: dateFormat,
          locale: l10n[locale],
          minDate: minDate,
          maxDate: maxDate,
          plugins: [
            datePickerType === 'range'
              ? new carbonFlatpickrRangePlugin({ input: this.toInputField })
              : () => {},
            carbonFlatpickrMonthSelectPlugin({
              selectorFlatpickrMonthYearContainer: '.flatpickr-current-month',
              selectorFlatpickrYearContainer: '.numInputWrapper',
              selectorFlatpickrCurrentMonth: '.cur-month',
              classFlatpickrCurrentMonth: 'cur-month',
            }),
            carbonFlatpickrFixEventsPlugin({
              inputFrom: this.inputField,
              inputTo: this.toInputField,
            }),
          ],
          clickOpens: true,
          nextArrow: this.rightArrowHTML(),
          prevArrow: this.leftArrowHTML(),
          onChange: (...args) => {
            const { onChange } = this.props;
            if (onChange) {
              onChange(...args);
            }
          },
          onClose,
          onReady: onHook,
          onMonthChange: onHook,
          onYearChange: onHook,
          onOpen: onHook,
          onValueUpdate: onHook,
        });
        this.addKeyboardEvents(this.cal);
      }
    }
  }

  componentWillUnmount() {
    if (this.cal) {
      this.cal.destroy();
    }
    if (this.inputField) {
      this.inputField.removeEventListener('change', this.onChange);
    }
    if (this.toInputField) {
      this.toInputField.removeEventListener('change', this.onChange);
    }
  }

  onChange = e => {
    if (
      e.target.value === '' &&
      this.cal &&
      this.cal.selectedDates.length > 0
    ) {
      this.cal.clear();
    }
  };

  addKeyboardEvents = cal => {
    if (this.inputField) {
      this.inputField.addEventListener('keydown', e => {
        if (match(e, keys.ArrowDown)) {
          (
            cal.selectedDateElem ||
            cal.todayDateElem ||
            cal.calendarContainer.querySelector('.flatpickr-day[tabindex]') ||
            cal.calendarContainer
          ).focus();
        }
      });
      this.inputField.addEventListener('change', this.onChange);
    }
    if (this.toInputField) {
      this.toInputField.addEventListener('blur', evt => {
        if (!this.cal.calendarContainer.contains(evt.relatedTarget)) {
          this.cal.close();
        }
      });
      this.toInputField.addEventListener('keydown', e => {
        if (match(e, keys.ArrowDown)) {
          (
            cal.selectedDateElem ||
            cal.todayDateElem ||
            cal.calendarContainer.querySelector('.flatpickr-day[tabindex]') ||
            cal.calendarContainer
          ).focus();
        }
      });
      this.toInputField.addEventListener('change', this.onChange);
    }
  };

  rightArrowHTML() {
    return `
      <svg width="16px" height="16px" viewBox="0 0 16 16">
        <polygon points="11,8 6,13 5.3,12.3 9.6,8 5.3,3.7 6,3 "/>
        <rect width="16" height="16" style="fill:none" />
      </svg>`;
  }

  leftArrowHTML() {
    return `
      <svg width="16px" height="16px" viewBox="0 0 16 16">
        <polygon points="5,8 10,3 10.7,3.7 6.4,8 10.7,12.3 10,13 "/>
        <rect width="16" height="16" style="fill:none" />
      </svg>`;
  }

  openCalendar = () => {
    if (this.cal) {
      this.cal.open();
    }
  };

  updateClassNames = calendar => {
    const calendarContainer = calendar.calendarContainer;
    const daysContainer = calendar.days;
    if (calendarContainer && daysContainer) {
      // calendarContainer and daysContainer are undefined if flatpickr detects a mobile device
      calendarContainer.classList.add(`${prefix}--date-picker__calendar`);
      calendarContainer
        .querySelector('.flatpickr-month')
        .classList.add(`${prefix}--date-picker__month`);
      calendarContainer
        .querySelector('.flatpickr-weekdays')
        .classList.add(`${prefix}--date-picker__weekdays`);
      calendarContainer
        .querySelector('.flatpickr-days')
        .classList.add(`${prefix}--date-picker__days`);
      forEach.call(
        calendarContainer.querySelectorAll('.flatpickr-weekday'),
        item => {
          const currentItem = item;
          currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
          currentItem.classList.add(`${prefix}--date-picker__weekday`);
        }
      );
      forEach.call(daysContainer.querySelectorAll('.flatpickr-day'), item => {
        item.classList.add(`${prefix}--date-picker__day`);
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
    }
  };

  assignInputFieldRef = node => {
    this.inputField = !node
      ? null
      : // Child is a regular DOM node, seen in tests
      node.nodeType === Node.ELEMENT_NODE
      ? node.querySelector(`.${prefix}--date-picker__input`)
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
      ? node.querySelector(`.${prefix}--date-picker__input`)
      : // Child is a React component
      node.input && node.input.nodeType === Node.ELEMENT_NODE
      ? node.input
      : null;
  };

  isLabelTextEmpty = children =>
    children.every(child => !child.props.labelText);

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

    const datePickerClasses = classNames(`${prefix}--date-picker`, className, {
      [`${prefix}--date-picker--short`]: short,
      [`${prefix}--date-picker--light`]: light,
      [`${prefix}--date-picker--simple`]: datePickerType === 'simple',
      [`${prefix}--date-picker--single`]: datePickerType === 'single',
      [`${prefix}--date-picker--range`]: datePickerType === 'range',
      [`${prefix}--date-picker--nolabel`]:
        datePickerType === 'range' && this.isLabelTextEmpty(children),
    });

    const childArray = React.Children.toArray(children);
    const childrenWithProps = childArray.map((child, index) => {
      if (index === 0 && child.type === DatePickerInput) {
        return React.cloneElement(child, {
          datePickerType,
          ref: this.assignInputFieldRef,
          openCalendar: this.openCalendar,
        });
      }
      if (index === 1 && child.type === DatePickerInput) {
        return React.cloneElement(child, {
          datePickerType,
          ref: this.assignToInputFieldRef,
          openCalendar: this.openCalendar,
        });
      }
      if (index === 0) {
        return React.cloneElement(child, {
          ref: this.assignInputFieldRef,
        });
      }
      if (index === 1) {
        return React.cloneElement(child, {
          ref: this.assignToInputFieldRef,
        });
      }
    });
    return (
      <div className={`${prefix}--form-item`}>
        <div className={datePickerClasses} {...other}>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}
