import PropTypes from 'prop-types';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';
import flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
import DatePickerInput from '../../DatePickerInput';
import carbonFlatpickrAppendToPlugin from '../plugins/appendToPlugin';
import carbonFlatpickrFixEventsPlugin from '../plugins/fixEventsPlugin';
import carbonFlatpickrRangePlugin from '../plugins/rangePlugin';
import { match, keys } from '../../../internal/keyboard';

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
const carbonFlatpickrMonthSelectPlugin = (config) => (fp) => {
  const setupElements = () => {
    if (!fp.monthElements) {
      return;
    }
    fp.monthElements.forEach((elem) => {
      if (!elem.parentNode) {
        return;
      }
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
    fp.yearElements.forEach((elem) => {
      const currentMonthContainer = elem.closest(
        config.selectorFlatpickrMonthYearContainer
      );
      Array.prototype.forEach.call(
        currentMonthContainer.querySelectorAll('.cur-month'),
        (monthElement) => {
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

const DatePicker = React.forwardRef(function DatePicker(
  {
    allowInput,
    appendTo,
    children,
    className,
    datePickerType,
    dateFormat = 'm/d/Y',
    disable,
    enable,
    light = false,
    locale = 'en',
    minDate,
    maxDate,
    onChange,
    onClose,
    onOpen,
    short = false,
    value,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const cal = useRef({});
  let toInputField;
  let inputField;

  const [prevDateFormat, setPrevDateFormat] = useState(dateFormat);
  const [prevMinDate, setPrevMinDate] = useState(minDate);
  const [prevMaxDate, setPrevMaxDate] = useState(maxDate);
  const [prevDisable, setPrevDisable] = useState(disable);
  const [prevEnable, setPrevEnable] = useState(enable);
  const [prevValue, setPrevValue] = useState(value);
  const [prevInline, setPrevInline] = useState(rest.inline);

  /**
   * only run once - component did mount equivalent
   */
  useEffect(() => {
    if (datePickerType === 'single' || datePickerType === 'range') {
      const onHook = (electedDates, dateStr, instance) => {
        updateClassNames(instance);
      };

      // Logic to determine if `enable` or `disable` will be passed down. If neither
      // is provided, we return the default empty disabled array, allowing all dates.
      let enableOrDisable = enable ? 'enable' : 'disable';
      let enableOrDisableArr;
      if (!enable && !disable) {
        enableOrDisableArr = [];
      } else if (enable) {
        enableOrDisableArr = enable;
      } else {
        enableOrDisableArr = disable;
      }

      let localeData;
      if (typeof locale === 'object') {
        let location = locale.locale ? locale.locale : 'en';
        localeData = { ...l10n[location], ...locale };
      } else {
        localeData = l10n[locale];
      }

      // inputField ref might not be set in enzyme tests
      if (inputField) {
        cal.current = new flatpickr(inputField, {
          inline: rest.inline ?? false,
          disableMobile: true,
          defaultDate: value,
          mode: datePickerType,
          allowInput: allowInput ?? true,
          dateFormat: dateFormat,
          locale: localeData,
          [enableOrDisable]: enableOrDisableArr,
          minDate: minDate,
          maxDate: maxDate,
          plugins: [
            datePickerType === 'range'
              ? new carbonFlatpickrRangePlugin({
                  input: toInputField,
                })
              : () => {},
            appendTo
              ? carbonFlatpickrAppendToPlugin({
                  appendTo,
                })
              : () => {},
            carbonFlatpickrMonthSelectPlugin({
              selectorFlatpickrMonthYearContainer: '.flatpickr-current-month',
              selectorFlatpickrYearContainer: '.numInputWrapper',
              selectorFlatpickrCurrentMonth: '.cur-month',
              classFlatpickrCurrentMonth: 'cur-month',
            }),
            carbonFlatpickrFixEventsPlugin({
              inputFrom: inputField,
              inputTo: toInputField,
            }),
          ],
          clickOpens: true,
          nextArrow: rightArrowHTML(),
          prevArrow: leftArrowHTML(),
          onChange: (...args) => {
            if (onChange) {
              onChange(...args);
            }
          },
          onClose,
          onReady: onHook,
          onMonthChange: onHook,
          onYearChange: onHook,
          onOpen: (...args) => {
            onHook(...args);
            if (onOpen) {
              onOpen(...args);
            }
          },
          onValueUpdate: onHook,
        });
        addKeyboardEvents(cal.current);
        addRoleAttributeToDialog();
      }
    }

    //component will unmount equivalent
    return () => {
      if (cal.current) {
        cal.current.destroy();
      }
      if (inputField) {
        inputField.removeEventListener('change', onChangeHandler);
      }
      if (toInputField) {
        toInputField.removeEventListener('change', onChangeHandler);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * component will update equivalent
   * this works like getDerivedStateFromProps
   */
  useEffect(() => {
    if (cal.current) {
      if (prevDateFormat !== dateFormat) {
        cal.current.set({ dateFormat });
        setPrevDateFormat(dateFormat);
      }
      if (prevMinDate !== minDate) {
        cal.current.set('minDate', minDate);
        setPrevMinDate(minDate);
      }
      if (prevMaxDate !== maxDate) {
        cal.current.set('maxDate', maxDate);
        setPrevMaxDate(maxDate);
      }
      if (disable !== prevDisable) {
        cal.current.set('disable', disable);
        setPrevDisable(disable);
      }
      if (enable !== prevEnable) {
        cal.current.set('enable', enable);
        setPrevEnable(enable);
      }
      if (rest.inline && rest.inline !== prevInline) {
        cal.current.set('inline', rest.inline);
        setPrevInline(rest.inline);
      }
    }

    // Coordinate when the given `value` prop changes. When this happens, we
    // should update the calendar to the new value.
    if (prevValue !== value) {
      if (cal.current) {
        cal.current.setDate(value);
        updateClassNames(cal.current);
        setPrevValue(value);
      } else if (inputField) {
        inputField.value = value;
        setPrevValue(value);
      }
    }
  }, [
    cal,
    value,
    dateFormat,
    disable,
    enable,
    inputField,
    maxDate,
    minDate,
    rest.inline,
    updateClassNames,
    prevDateFormat,
    prevDisable,
    prevEnable,
    prevMaxDate,
    prevMinDate,
    prevValue,
    prevInline,
  ]);

  const onChangeHandler = () => {
    if (inputField.value === '' && cal.current?.selectedDates.length) {
      cal.current.clear();
      cal.current.input.focus();
    }
  };

  /**
   * Flatpickr's calendar dialog is not rendered in a landmark causing an
   * error with IBM Equal Access Accessibility Checker so we add an aria
   * role to the container div.
   */
  const addRoleAttributeToDialog = () => {
    if (inputField) {
      cal.current.calendarContainer.setAttribute('role', 'region');
      // IBM EAAC requires an aria-label on a role='region'
      cal.current.calendarContainer.setAttribute(
        'aria-label',
        'calendar-container'
      );
    }
  };

  const addKeyboardEvents = (cal) => {
    const initArrowDownListener = (element) => {
      if (element) {
        element.addEventListener('keydown', (e) => {
          if (match(e, keys.ArrowDown)) {
            const {
              calendarContainer,
              selectedDateElem: fpSelectedDateElem,
              todayDateElem: fptodayDateElem,
            } = cal;
            const selectedDateElem =
              calendarContainer.querySelector('.selected') &&
              fpSelectedDateElem;
            const todayDateElem =
              calendarContainer.querySelector('.today') && fptodayDateElem;
            (
              selectedDateElem ||
              todayDateElem ||
              calendarContainer.querySelector('.flatpickr-day[tabindex]') ||
              calendarContainer
            ).focus();
          }
        });
        element.addEventListener('change', onChangeHandler);
      }
    };
    initArrowDownListener(inputField);
    initArrowDownListener(toInputField);
  };

  const rightArrowHTML = () => {
    return `
      <svg width="16px" height="16px" viewBox="0 0 16 16">
        <polygon points="11,8 6,13 5.3,12.3 9.6,8 5.3,3.7 6,3 "/>
        <rect width="16" height="16" style="fill:none" />
      </svg>`;
  };

  const leftArrowHTML = () => {
    return `
      <svg width="16px" height="16px" viewBox="0 0 16 16">
        <polygon points="5,8 10,3 10.7,3.7 6.4,8 10.7,12.3 10,13 "/>
        <rect width="16" height="16" style="fill:none" />
      </svg>`;
  };

  const openCalendar = () => {
    if (cal.current) {
      cal.current.open();
    }
  };

  const updateClassNames = useCallback(
    (calendar) => {
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
          (item) => {
            const currentItem = item;
            currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
            currentItem.classList.add(`${prefix}--date-picker__weekday`);
          }
        );
        forEach.call(
          daysContainer.querySelectorAll('.flatpickr-day'),
          (item) => {
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
          }
        );
      }
    },
    [prefix]
  );

  const assignInputFieldRef = (node) => {
    inputField = !node
      ? null
      : // Child is a regular DOM node, seen in tests
      node.nodeType === Node.ELEMENT_NODE
      ? node.querySelector(`.${prefix}--date-picker__input`)
      : // Child is a React component
      node.input && node.input.nodeType === Node.ELEMENT_NODE
      ? node.input
      : null;
  };

  const assignToInputFieldRef = (node) => {
    toInputField = !node
      ? null
      : // Child is a regular DOM node, seen in tests
      node.nodeType === Node.ELEMENT_NODE
      ? node.querySelector(`.${prefix}--date-picker__input`)
      : // Child is a React component
      node.input && node.input.nodeType === Node.ELEMENT_NODE
      ? node.input
      : null;
  };

  const isLabelTextEmpty = (children) =>
    children.every((child) => !child.props.labelText);

  const wrapperClasses = classNames(`${prefix}--form-item NEXT`, [className]);
  const datePickerClasses = classNames(`${prefix}--date-picker`, {
    [`${prefix}--date-picker--short`]: short,
    [`${prefix}--date-picker--light`]: light,
    [`${prefix}--date-picker--simple`]: datePickerType === 'simple',
    [`${prefix}--date-picker--single`]: datePickerType === 'single',
    [`${prefix}--date-picker--range`]: datePickerType === 'range',
    [`${prefix}--date-picker--nolabel`]:
      datePickerType === 'range' && isLabelTextEmpty(children),
  });

  const childArray = React.Children.toArray(children);
  const childrenWithProps = childArray.map((child, index) => {
    if (
      index === 0 &&
      child.type === React.createElement(DatePickerInput, child.props).type
    ) {
      return React.cloneElement(child, {
        datePickerType,
        ref: assignInputFieldRef,
        openCalendar: openCalendar,
      });
    }
    if (
      index === 1 &&
      child.type === React.createElement(DatePickerInput, child.props).type
    ) {
      return React.cloneElement(child, {
        datePickerType,
        ref: assignToInputFieldRef,
        openCalendar: openCalendar,
      });
    }
    if (index === 0) {
      return React.cloneElement(child, {
        ref: assignInputFieldRef,
      });
    }
    if (index === 1) {
      return React.cloneElement(child, {
        ref: assignToInputFieldRef,
      });
    }
  });

  return (
    <div className={wrapperClasses} ref={ref}>
      <div className={datePickerClasses} {...rest}>
        {childrenWithProps}
      </div>
    </div>
  );
});

DatePicker.propTypes = {
  /**
   * flatpickr prop passthrough. Allows the user to enter a date directly
   * into the input field
   */
  allowInput: PropTypes.bool,

  /**
   * The DOM element the Flatpicker should be inserted into. `<body>` by default.
   */
  appendTo: PropTypes.object,

  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The date format.
   */
  dateFormat: PropTypes.string,

  /**
   * The type of the date picker:
   *
   * * `simple` - Without calendar dropdown.
   * * `single` - With calendar dropdown and single date.
   * * `range` - With calendar dropdown and a date range.
   */
  datePickerType: PropTypes.oneOf(['simple', 'single', 'range']),

  /**
   * The flatpickr `disable` option that allows a user to disable certain dates.
   */
  disable: PropTypes.array,

  /**
   * The flatpickr `enable` option that allows a user to enable certain dates.
   */
  enable: PropTypes.array,

  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,

  /**
   *  The language locale used to format the days of the week, months, and numbers. The full list of supported locales can be found here https://github.com/flatpickr/flatpickr/tree/master/src/l10n
   */
  locale: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([
      'ar', // Arabic
      'at', // Austria
      'az', // Azerbaijan
      'be', // Belarusian
      'bg', // Bulgarian
      'bn', // Bangla
      'bs', // Bosnia
      'cat', // Catalan
      'cs', // Czech
      'cy', // Welsh
      'da', // Danish
      'de', // German
      'en', // English
      'eo', // Esperanto
      'es', // Spanish
      'et', // Estonian
      'fa', // Persian
      'fi', // Finnish
      'fo', // Faroese
      'fr', // French
      'ga', // Gaelic
      'gr', // Greek
      'he', // Hebrew
      'hi', // Hindi
      'hr', // Croatian
      'hu', // Hungarian
      'id', // Indonesian
      'is', // Icelandic
      'it', // Italian
      'ja', // Japanese
      'ka', // Georgian
      'km', // Khmer
      'ko', // Korean
      'kz', // Kazakh
      'lt', // Lithuanian
      'lv', // Latvian
      'mk', // Macedonian
      'mn', // Mongolian
      'ms', // Malaysian
      'my', // Burmese
      'nl', // Dutch
      'no', // Norwegian
      'pa', // Punjabi
      'pl', // Polish
      'pt', // Portuguese
      'ro', // Romanian
      'ru', // Russian
      'si', // Sinhala
      'sk', // Slovak
      'sl', // Slovenian
      'sq', // Albanian
      'sr', // Serbian
      'sv', // Swedish
      'th', // Thai
      'tr', // Turkish
      'uk', // Ukrainian
      'uz', // Uzbek
      'uz_latn', // Uzbek Latin
      'vn', // Vietnamese
      'zh_tw', // Mandarin Traditional
      'zh', // Mandarin
    ]),
  ]),

  /**
   * The maximum date that a user can pick to.
   */
  maxDate: PropTypes.string,

  /**
   * The minimum date that a user can start picking from.
   */
  minDate: PropTypes.string,

  /**
   * The `change` event handler.
   */
  onChange: PropTypes.func,

  /**
   * The `close` event handler.
   */
  onClose: PropTypes.func,

  /**
   * The `open` event handler.
   */
  onOpen: PropTypes.func,

  /**
   * `true` to use the short version.
   */
  short: PropTypes.bool,

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
};

export default DatePicker;
