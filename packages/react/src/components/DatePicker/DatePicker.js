/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  useContext,
  useEffect,
  useRef,
  useImperativeHandle,
  useCallback,
  useState,
} from 'react';
import cx from 'classnames';
import flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
import DatePickerInput from '../DatePickerInput';
import carbonFlatpickrAppendToPlugin from './plugins/appendToPlugin';
import carbonFlatpickrFixEventsPlugin from './plugins/fixEventsPlugin';
import carbonFlatpickrRangePlugin from './plugins/rangePlugin';
import deprecate from '../../prop-types/deprecate';
import { match, keys } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { useSavedCallback } from '../../internal/useSavedCallback';
import { FormContext } from '../FluidForm';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';

// Weekdays shorthand for english locale
l10n.en.weekdays.shorthand.forEach((_day, index) => {
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
    if (fp.monthElements) {
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
    }
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

/**
 * Determine if every child in a list of children has no label specified
 * @param {Array<ReactElement>} children
 * @returns {boolean}
 */
function isLabelTextEmpty(children) {
  return children.every((child) => !child.props.labelText);
}

const rightArrowHTML = `<svg width="16px" height="16px" viewBox="0 0 16 16">
  <polygon points="11,8 6,13 5.3,12.3 9.6,8 5.3,3.7 6,3 "/>
</svg>`;

const leftArrowHTML = `<svg width="16px" height="16px" viewBox="0 0 16 16">
  <polygon points="5,8 10,3 10.7,3.7 6.4,8 10.7,12.3 10,13 "/>
</svg>`;

function updateClassNames(calendar, prefix) {
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
    forEach.call(daysContainer.querySelectorAll('.flatpickr-day'), (item) => {
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
}

const DatePicker = React.forwardRef(function DatePicker(
  {
    allowInput,
    appendTo,
    children,
    className,
    closeOnSelect = true,
    dateFormat = 'm/d/Y',
    datePickerType,
    disable,
    enable,
    inline,
    invalid,
    invalidText,
    warn,
    warnText,
    light = false,
    locale = 'en',
    maxDate,
    minDate,
    onChange,
    onClose,
    onOpen,
    readOnly = false,
    short = false,
    value,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const [hasInput, setHasInput] = useState(false);
  const startInputField = useCallback((node) => {
    if (node !== null) {
      startInputField.current = node;
      setHasInput(true);
    }
  }, []);
  const endInputField = useRef(null);
  const calendarRef = useRef(null);
  const savedOnChange = useSavedCallback(onChange);
  const savedOnClose = useSavedCallback(onClose);
  const savedOnOpen = useSavedCallback(onOpen);

  const datePickerClasses = cx(`${prefix}--date-picker`, {
    [`${prefix}--date-picker--short`]: short,
    [`${prefix}--date-picker--light`]: light,
    [`${prefix}--date-picker--simple`]: datePickerType === 'simple',
    [`${prefix}--date-picker--single`]: datePickerType === 'single',
    [`${prefix}--date-picker--range`]: datePickerType === 'range',
    [`${prefix}--date-picker--nolabel`]:
      datePickerType === 'range' && isLabelTextEmpty(children),
  });
  const wrapperClasses = cx(`${prefix}--form-item`, { [className]: className });

  const childrenWithProps = React.Children.toArray(children).map(
    (child, index) => {
      if (
        index === 0 &&
        child.type === React.createElement(DatePickerInput, child.props).type
      ) {
        return React.cloneElement(child, {
          datePickerType,
          ref: startInputField,
          readOnly,
        });
      }
      if (
        index === 1 &&
        child.type === React.createElement(DatePickerInput, child.props).type
      ) {
        return React.cloneElement(child, {
          datePickerType,
          ref: endInputField,
          readOnly,
        });
      }
      if (index === 0) {
        return React.cloneElement(child, {
          ref: startInputField,
          readOnly,
        });
      }
      if (index === 1) {
        return React.cloneElement(child, {
          ref: endInputField,
          readOnly,
        });
      }
    }
  );

  useEffect(() => {
    if (datePickerType !== 'single' && datePickerType !== 'range') {
      return;
    }

    if (!startInputField.current) {
      return;
    }

    const onHook = (_electedDates, _dateStr, instance, prefix) => {
      updateClassNames(instance, prefix);
      if (startInputField?.current) {
        startInputField.current.readOnly = readOnly;
      }
      if (endInputField?.current) {
        endInputField.current.readOnly = readOnly;
      }
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

    const { current: start } = startInputField;
    const { current: end } = endInputField;
    const calendar = new flatpickr(start, {
      inline: inline ?? false,
      disableMobile: true,
      defaultDate: value,
      closeOnSelect: closeOnSelect,
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
              input: endInputField.current,
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
          inputFrom: startInputField.current,
          inputTo: endInputField.current,
        }),
      ],
      clickOpens: !readOnly,
      noCalendar: readOnly,
      nextArrow: rightArrowHTML,
      prevArrow: leftArrowHTML,
      onChange: (...args) => {
        if (savedOnChange && !readOnly) {
          savedOnChange(...args);
        }
      },
      onClose: savedOnClose,
      onReady: onHook,
      onMonthChange: onHook,
      onYearChange: onHook,
      onOpen: (...args) => {
        onHook(...args);
        savedOnOpen(...args);
      },
      onValueUpdate: onHook,
    });

    calendarRef.current = calendar;

    function handleArrowDown(event) {
      if (match(event, keys.Escape)) {
        calendar.calendarContainer.classList.remove('open');
      }

      if (match(event, keys.ArrowDown)) {
        const {
          calendarContainer,
          selectedDateElem: fpSelectedDateElem,
          todayDateElem: fptodayDateElem,
        } = calendar;
        const selectedDateElem =
          calendarContainer.querySelector('.selected') && fpSelectedDateElem;
        const todayDateElem =
          calendarContainer.querySelector('.today') && fptodayDateElem;
        (
          selectedDateElem ||
          todayDateElem ||
          calendarContainer.querySelector('.flatpickr-day[tabindex]') ||
          calendarContainer
        ).focus();
      }
    }

    function handleOnChange() {
      if (datePickerType == 'single') {
        calendar.calendarContainer.classList.remove('open');
      }

      if (start.value !== '') {
        return;
      }

      if (!calendar.selectedDates) {
        return;
      }

      if (calendar.selectedDates.length === 0) {
        return;
      }

      calendar.clear();
      calendar.input.focus();
    }

    if (start) {
      start.addEventListener('keydown', handleArrowDown);
      start.addEventListener('change', handleOnChange);

      if (calendar && calendar.calendarContainer) {
        // Flatpickr's calendar dialog is not rendered in a landmark causing an
        // error with IBM Equal Access Accessibility Checker so we add an aria
        // role to the container div.
        calendar.calendarContainer.setAttribute('role', 'application');
        // IBM EAAC requires an aria-label on a role='region'
        calendar.calendarContainer.setAttribute(
          'aria-label',
          'calendar-container'
        );
      }
    }

    if (end) {
      end.addEventListener('keydown', handleArrowDown);
      end.addEventListener('change', handleOnChange);
    }

    //component did unmount equivalent
    return () => {
      // Note: if the `startInputField` ref is undefined then calendar will be
      // of type: Array and `destroy` will not be defined
      if (calendar && calendar.destroy) {
        calendar.destroy();
      }

      // prevent a duplicate date selection when a default value is set
      if (value) {
        if (startInputField?.current) {
          startInputField.current.value = '';
        }
        if (endInputField?.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          endInputField.current.value = '';
        }
      }

      if (start) {
        start.removeEventListener('keydown', handleArrowDown);
        start.removeEventListener('change', handleOnChange);
      }

      if (end) {
        end.removeEventListener('keydown', handleArrowDown);
        end.removeEventListener('change', handleOnChange);
      }
    };
  }, [savedOnChange, savedOnClose, savedOnOpen, readOnly, hasInput]); //eslint-disable-line react-hooks/exhaustive-deps

  // this hook allows consumers to access the flatpickr calendar
  // instance for cases where functions like open() or close()
  // need to be imperatively called on the calendar
  useImperativeHandle(ref, () => ({
    get calendar() {
      return calendarRef.current;
    },
  }));

  useEffect(() => {
    if (calendarRef?.current?.set) {
      calendarRef.current.set({ dateFormat });
    }
  }, [dateFormat]);

  useEffect(() => {
    if (calendarRef?.current?.set) {
      calendarRef.current.set('minDate', minDate);
    }
  }, [minDate]);

  useEffect(() => {
    if (calendarRef?.current?.set) {
      calendarRef.current.set('maxDate', maxDate);
    }
  }, [maxDate]);

  useEffect(() => {
    if (calendarRef?.current?.set && disable) {
      calendarRef.current.set('disable', disable);
    }
  }, [disable]);

  useEffect(() => {
    if (calendarRef?.current?.set && enable) {
      calendarRef.current.set('enable', enable);
    }
  }, [enable]);

  useEffect(() => {
    if (calendarRef?.current?.set && inline) {
      calendarRef.current.set('inline', inline);
    }
  }, [inline]);

  useEffect(() => {
    if (calendarRef?.current?.set) {
      if (value !== undefined) {
        calendarRef.current.setDate(value);
      }
      updateClassNames(calendarRef.current, prefix);
      //for simple date picker w/o calendar; initial mount may not have value
    } else if (!calendarRef.current && value) {
      startInputField.current.value = value;
    }
  }, [value, prefix]); //eslint-disable-line react-hooks/exhaustive-deps

  let fluidError;
  if (isFluid) {
    if (invalid) {
      fluidError = (
        <>
          <WarningFilled
            className={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--invalid`}
          />
          <hr className={`${prefix}--date-picker__divider`} />
          <div className={`${prefix}--form-requirement`}>{invalidText}</div>
        </>
      );
    }

    if (warn && !invalid) {
      fluidError = (
        <>
          <WarningAltFilled
            className={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--warn`}
          />
          <hr className={`${prefix}--date-picker__divider`} />
          <div className={`${prefix}--form-requirement`}>{warnText}</div>
        </>
      );
    }
  }

  return (
    <div className={wrapperClasses} ref={ref} {...rest}>
      <div className={datePickerClasses}>{childrenWithProps}</div>
      {fluidError}
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
   * flatpickr prop passthrough. Controls whether the calendar dropdown closes upon selection.
   */
  closeOnSelect: PropTypes.bool,

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
   * The flatpickr `inline` option.
   */
  inline: PropTypes.bool,

  /**
   * Specify whether or not the control is invalid (Fluid only)
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in error state (Fluid Only)
   */
  invalidText: PropTypes.node,

  /**
   * `true` to use the light version.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `DatePicker` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),
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
   * whether the DatePicker is to be readOnly
   * if boolean applies to all inputs
   * if array applies to each input in order
   */
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),

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

  /**
   * Specify whether the control is currently in warning state (Fluid only)
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state (Fluid only)
   */
  warnText: PropTypes.node,
};

export default DatePicker;
