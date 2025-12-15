/**
 * Copyright IBM Corp. 2016, 2025
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
  ForwardedRef,
  ReactNode,
} from 'react';
import cx from 'classnames';
import flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
import DatePickerInput from '../DatePickerInput';
import { appendToPlugin } from './plugins/appendToPlugin';
import carbonFlatpickrFixEventsPlugin from './plugins/fixEventsPlugin';
import { rangePlugin } from './plugins/rangePlugin';
import { deprecate } from '../../prop-types/deprecate';
import { match, keys } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { useSavedCallback } from '../../internal/useSavedCallback';
import { FormContext } from '../FluidForm';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import {
  DateLimit,
  DateOption,
  Options as FlatpickrOptions,
  Plugin,
} from 'flatpickr/dist/types/options';
import type { Instance } from 'flatpickr/dist/types/instance';
import { datePartsOrder } from '@carbon/utilities';
import { SUPPORTED_LOCALES, type SupportedLocale } from './DatePickerLocales';

// Weekdays shorthand for English locale
// Ensure localization exists before trying to access it
function initializeWeekdayShorthand() {
  if (l10n?.en?.weekdays?.shorthand) {
    l10n.en.weekdays.shorthand.forEach((_day, index) => {
      const currentDay = l10n.en.weekdays.shorthand;
      if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
        currentDay[index] = 'Th';
      } else {
        currentDay[index] = currentDay[index].charAt(0);
      }
    });
  }
}

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
 * @param {string} config.locale The locale code.
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
        const monthElement = fp._createElement(
          'span',
          config.classFlatpickrCurrentMonth
        );
        monthElement.textContent = monthToStr(
          fp.currentMonth,
          config.shorthand === true,
          fp.l10n
        );

        // Depending on the locale, toggle the order of the month and year
        if (datePartsOrder.isMonthFirst(config.locale)) {
          fp.yearElements[0]
            .closest(config.selectorFlatpickrMonthYearContainer)
            .insertBefore(
              monthElement,
              fp.yearElements[0].closest(config.selectorFlatpickrYearContainer)
            );
        } else {
          fp.yearElements[0]
            .closest(config.selectorFlatpickrMonthYearContainer)
            .insertAdjacentElement('afterend', monthElement);
        }

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
      item.setAttribute('role', 'button');
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

export type DatePickerTypes = 'simple' | 'single' | 'range';

export interface DatePickerProps {
  /**
   * Flatpickr prop passthrough enables direct date input, and when set to false,
   * we must clear dates manually by resetting the value prop to to a falsy value (such as `""`, `null`, or `undefined`) or an array of all falsy values, making it a controlled input.
   */
  allowInput?: boolean;

  /**
   * The DOM element the flatpickr should be inserted into `<body>` by default.
   */
  appendTo?: HTMLElement;

  /**
   * The child nodes.
   */
  children: ReactNode | object;

  /**
   * The CSS class names.
   */
  className?: string;

  /**
   * flatpickr prop passthrough. Controls whether the calendar dropdown closes upon selection.
   */
  closeOnSelect?: boolean;

  /**
   * The date format.
   */
  dateFormat?: string;

  /**
   * The type of the date picker:
   *
   * * `simple` - Without calendar dropdown.
   * * `single` - With calendar dropdown and single date.
   * * `range` - With calendar dropdown and a date range.
   */
  datePickerType?: DatePickerTypes;

  /**
   * The flatpickr `disable` option that allows a user to disable certain dates.
   */
  disable?: DateLimit<DateOption>[];

  /**
   * The flatpickr `enable` option that allows a user to enable certain dates.
   */
  enable?: DateLimit<DateOption>[];

  /**
   * The flatpickr `inline` option.
   */
  inline?: boolean;

  /**
   * Specify whether or not the control is invalid (Fluid only)
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in error state (Fluid Only)
   */
  invalidText?: ReactNode;

  /**
   * `true` to use the light version.
   */
  light?: boolean;

  /**
   *  The language locale used to format the days of the week, months, and numbers. The full list of supported locales can be found here https://github.com/flatpickr/flatpickr/tree/master/src/l10n
   */
  locale?:
    | string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    | any
    | SupportedLocale
    | undefined;

  /**
   * The maximum date that a user can pick to.
   */
  maxDate?: DateOption;

  /**
   * The minimum date that a user can start picking from.
   */
  minDate?: DateOption;

  /**
   * The `change` event handler.
   */
  onChange?: flatpickr.Options.Hook;

  /**
   * The `close` event handler.
   */
  onClose?: flatpickr.Options.Hook;

  /**
   * The `open` event handler.
   */
  onOpen?: flatpickr.Options.Hook;

  /**
   * flatpickr prop passthrough. Controls how dates are parsed.
   */
  parseDate?: (date: string) => Date | false;

  /**
   * whether the DatePicker is to be readOnly
   * if boolean applies to all inputs
   * if array applies to each input in order
   */
  readOnly?: boolean | undefined;

  /**
   * `true` to use the short version.
   */
  short?: boolean;

  /**
   * The value of the date value provided to flatpickr, could
   * be a date, a date number, a date string, an array of dates.
   */
  value?: DateOption | DateOption[];

  /**
   * Specify whether the control is currently in warning state (Fluid only)
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state (Fluid only)
   */
  warnText?: ReactNode;

  /**
   * Accessible aria-label for the "next month" arrow icon.
   */
  nextMonthAriaLabel?: string;

  /**
   * Accessible aria-label for the "previous month" arrow icon.
   */
  prevMonthAriaLabel?: string;
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
    parseDate: parseDateProp,
    nextMonthAriaLabel = 'Next month',
    prevMonthAriaLabel = 'Previous month',
    ...rest
  }: DatePickerProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const [hasInput, setHasInput] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const startInputField: any = useCallback((node) => {
    if (node !== null) {
      startInputField.current = node;
      setHasInput(true);
    }
  }, []);

  const lastStartValue = useRef('');
  const calendarRef = useRef<Instance>(null);

  interface CalendarCloseEvent {
    selectedDates: Date[];
    dateStr: string;
    instance: Instance;
  }
  const [calendarCloseEvent, setCalendarCloseEvent] =
    useState<CalendarCloseEvent | null>(null);

  // fix datepicker deleting the selectedDate when the calendar closes
  const handleCalendarClose = useCallback(
    (selectedDates, dateStr, instance) => {
      if (
        lastStartValue.current &&
        selectedDates[0] &&
        !startInputField.current.value
      ) {
        startInputField.current.value = lastStartValue.current;
        calendarRef.current?.setDate(
          [startInputField.current.value, endInputField?.current?.value],
          true,
          calendarRef.current.config.dateFormat
        );
      }
      if (onClose) {
        onClose(selectedDates, dateStr, instance);
      }
    },
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    [onClose]
  );
  // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  const onCalendarClose = (selectedDates, dateStr, instance, e) => {
    if (e && e.type === 'clickOutside') {
      return;
    }
    setCalendarCloseEvent({ selectedDates, dateStr, instance });
  };
  useEffect(() => {
    if (calendarCloseEvent) {
      const { selectedDates, dateStr, instance } = calendarCloseEvent;
      handleCalendarClose(selectedDates, dateStr, instance);
      setCalendarCloseEvent(null);
    }
  }, [calendarCloseEvent, handleCalendarClose]);

  const endInputField = useRef<HTMLInputElement>(null);
  const lastFocusedField = useRef<HTMLInputElement>(null);
  const savedOnChange = useSavedCallback(onChange);

  const savedOnOpen = useSavedCallback(onOpen);

  const effectiveWarn = warn && !invalid;

  const datePickerClasses = cx(`${prefix}--date-picker`, {
    [`${prefix}--date-picker--short`]: short,
    [`${prefix}--date-picker--light`]: light,
    [`${prefix}--date-picker--simple`]: datePickerType === 'simple',
    [`${prefix}--date-picker--single`]: datePickerType === 'single',
    [`${prefix}--date-picker--range`]: datePickerType === 'range',
    [`${prefix}--date-picker--nolabel`]:
      datePickerType === 'range' && isLabelTextEmpty(children),
  });
  const wrapperClasses = cx(`${prefix}--form-item`, {
    [String(className)]: className,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const childrenWithProps = React.Children.toArray(children as any).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    (child: any, index) => {
      if (
        index === 0 &&
        child.type === React.createElement(DatePickerInput, child.props).type
      ) {
        return React.cloneElement(child, {
          datePickerType,
          ref: startInputField,
          readOnly,
          invalid,
          warn: effectiveWarn,
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
          invalid,
          warn: effectiveWarn,
        });
      }
      if (index === 0) {
        return React.cloneElement(child, {
          ref: startInputField,
          readOnly,
          invalid,
          warn: effectiveWarn,
        });
      }
      if (index === 1) {
        return React.cloneElement(child, {
          ref: endInputField,
          readOnly,
          invalid,
          warn: effectiveWarn,
        });
      }
    }
  );

  useEffect(() => {
    initializeWeekdayShorthand();
  }, []);

  useEffect(() => {
    if (datePickerType !== 'single' && datePickerType !== 'range') {
      return;
    }

    if (!startInputField.current) {
      return;
    }

    const onHook = (_electedDates, _dateStr, instance) => {
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
    const enableOrDisable = enable ? 'enable' : 'disable';
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
      const location = locale.locale ? locale.locale : 'en';
      localeData = { ...l10n[location], ...locale };
    } else {
      localeData = l10n[locale];
    }

    /**
     * parseDate is called before the date is actually set.
     * It attempts to parse the input value and return a valid date string.
     * Flatpickr's default parser results in odd dates when given invalid
     * values, so instead here we normalize the month/day to `1` if given
     * a value outside the acceptable range.
     */
    let parseDate;
    if (!parseDateProp && dateFormat === 'm/d/Y') {
      // This function only supports the default dateFormat.
      parseDate = (date) => {
        // Month must be 1-12. If outside these bounds, `1` should be used.
        const month =
          date.split('/')[0] <= 12 && date.split('/')[0] > 0
            ? parseInt(date.split('/')[0])
            : 1;
        const year = parseInt(date.split('/')[2]);

        if (month && year) {
          // The month and year must be provided to be able to determine
          // the number of days in the month.
          const daysInMonth = new Date(year, month, 0).getDate();
          // If the day does not fall within the days in the month, `1` should be used.
          const day =
            date.split('/')[1] <= daysInMonth && date.split('/')[1] > 0
              ? parseInt(date.split('/')[1])
              : 1;

          return new Date(`${year}/${month}/${day}`);
        } else {
          // With no month and year, we cannot calculate anything.
          // Returning false gives flatpickr an invalid date, which will clear the input
          return false;
        }
      };
    } else if (parseDateProp) {
      parseDate = parseDateProp;
    }

    // Accessible arrow icons (localized manually)
    // Flatpickr does not currently support localization of next/previous month
    // labels, so we inject translated aria-labels based on the provided locale.
    const rightArrowHTML = `<svg aria-label="${nextMonthAriaLabel}" role="img" width="16px" height="16px" viewBox="0 0 16 16">
      <polygon points="11,8 6,13 5.3,12.3 9.6,8 5.3,3.7 6,3 "/>
    </svg>`;

    const leftArrowHTML = `<svg aria-label="${prevMonthAriaLabel}" role="img" width="16px" height="16px" viewBox="0 0 16 16">
      <polygon points="5,8 10,3 10.7,3.7 6.4,8 10.7,12.3 10,13 "/>
    </svg>`;

    const { current: start } = startInputField;
    const { current: end } = endInputField;
    const flatpickerConfig: Partial<FlatpickrOptions> = {
      inline: inline ?? false,
      onClose: onCalendarClose,
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
      parseDate: parseDate,
      plugins: [
        datePickerType === 'range'
          ? rangePlugin({
              input: endInputField.current ?? undefined,
            })
          : ((() => {}) as unknown as Plugin),
        appendTo
          ? appendToPlugin({
              appendTo,
            })
          : ((() => {}) as unknown as Plugin),
        carbonFlatpickrMonthSelectPlugin({
          selectorFlatpickrMonthYearContainer: '.flatpickr-current-month',
          selectorFlatpickrYearContainer: '.numInputWrapper',
          selectorFlatpickrCurrentMonth: '.cur-month',
          classFlatpickrCurrentMonth: 'cur-month',
          locale: locale,
        }) as unknown as Plugin,
        carbonFlatpickrFixEventsPlugin({
          inputFrom: startInputField.current,
          inputTo: endInputField.current,
          lastStartValue,
        }) as unknown as Plugin,
      ],
      clickOpens: !readOnly,
      noCalendar: readOnly,
      nextArrow: rightArrowHTML,
      prevArrow: leftArrowHTML,
      onChange: (...args: [Date[], string, Instance]) => {
        if (!readOnly) {
          savedOnChange(...args);
        }
      },
      onReady: onHook,
      onMonthChange: onHook,
      onYearChange: onHook,
      onOpen: (...args: [Date[], string, Instance]) => {
        onHook(...args);
        savedOnOpen(...args);
      },
      onValueUpdate: onHook,
    };
    const calendar = flatpickr(start, flatpickerConfig);

    calendarRef.current = calendar;

    const handleInputFieldKeyDown = (event: KeyboardEvent) => {
      const {
        calendarContainer,
        selectedDateElem: fpSelectedDateElem,
        todayDateElem: fpTodayDateElem,
      } = calendar;

      if (match(event, keys.Escape)) {
        calendarContainer.classList.remove('open');
      }

      if (match(event, keys.Tab)) {
        if (!event.shiftKey) {
          event.preventDefault();
          calendarContainer.classList.add('open');
          const selectedDateElem =
            calendarContainer.querySelector('.selected') && fpSelectedDateElem;
          const todayDateElem =
            calendarContainer.querySelector('.today') && fpTodayDateElem;
          (
            (selectedDateElem ||
              todayDateElem ||
              calendarContainer.querySelector('.flatpickr-day[tabindex]') ||
              calendarContainer) as HTMLElement
          ).focus();

          if (event.target === startInputField.current) {
            lastFocusedField.current = startInputField.current;
          } else if (event.target === endInputField.current) {
            lastFocusedField.current = endInputField.current;
          }
        } else if (
          calendarRef.current?.isOpen &&
          event.target === startInputField.current
        ) {
          calendarRef.current.close();
          onCalendarClose(
            calendarRef.current.selectedDates,
            '',
            calendarRef.current,
            event
          );
        }
      }
    };

    const handleCalendarKeyDown = (event: KeyboardEvent) => {
      if (!calendarRef.current || !startInputField.current) return;
      const lastInputField =
        datePickerType == 'range'
          ? endInputField.current
          : startInputField.current;
      if (match(event, keys.Tab)) {
        if (!event.shiftKey) {
          if (lastFocusedField.current === lastInputField) {
            lastInputField.focus();
            calendarRef.current.close();
            onCalendarClose(
              calendarRef.current.selectedDates,
              '',
              calendarRef.current,
              event
            );
          } else {
            event.preventDefault();
            lastInputField.focus();
          }
        } else {
          event.preventDefault();
          (lastFocusedField.current || startInputField.current).focus();
        }
      }
    };

    function handleOnChange(event) {
      const { target } = event;
      if (target === start) {
        lastStartValue.current = start.value;
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
    }

    function handleKeyPress(event) {
      if (
        match(event, keys.Enter) &&
        closeOnSelect &&
        datePickerType == 'single'
      ) {
        calendar.calendarContainer.classList.remove('open');
      }
    }

    if (start) {
      start.addEventListener('keydown', handleInputFieldKeyDown);
      start.addEventListener('change', handleOnChange);
      start.addEventListener('keypress', handleKeyPress);

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
      end.addEventListener('keydown', handleInputFieldKeyDown);
      end.addEventListener('change', handleOnChange);
      end.addEventListener('keypress', handleKeyPress);
    }

    if (calendar.calendarContainer) {
      calendar.calendarContainer.addEventListener(
        'keydown',
        handleCalendarKeyDown
      );
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
        if (start) {
          start.value = '';
        }
        if (end) {
          end.value = '';
        }
      }

      if (start) {
        start.removeEventListener('keydown', handleInputFieldKeyDown);
        start.removeEventListener('change', handleOnChange);
        start.removeEventListener('keypress', handleKeyPress);
      }

      if (end) {
        end.removeEventListener('keydown', handleInputFieldKeyDown);
        end.removeEventListener('change', handleOnChange);
        end.removeEventListener('keypress', handleKeyPress);
      }

      if (calendar.calendarContainer) {
        calendar.calendarContainer.removeEventListener(
          'keydown',
          handleCalendarKeyDown
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    savedOnChange,
    savedOnOpen,
    readOnly,
    closeOnSelect,
    hasInput,
    datePickerType,
    nextMonthAriaLabel,
    prevMonthAriaLabel,
  ]);

  // this hook allows consumers to access the flatpickr calendar
  // instance for cases where functions like open() or close()
  // need to be imperatively called on the calendar
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  useImperativeHandle(ref, (): any => ({
    get calendar() {
      return calendarRef.current;
    },
  }));

  useEffect(() => {
    if (calendarRef.current?.set) {
      calendarRef.current.set({ dateFormat });
    }
  }, [dateFormat]);

  useEffect(() => {
    if (calendarRef.current?.set) {
      calendarRef.current.set('minDate', minDate);
    }
  }, [minDate]);

  useEffect(() => {
    if (calendarRef.current?.set) {
      calendarRef.current.set('allowInput', allowInput);
    }
  }, [allowInput]);

  useEffect(() => {
    if (calendarRef.current?.set) {
      calendarRef.current.set('maxDate', maxDate);
    }
  }, [maxDate]);

  useEffect(() => {
    if (calendarRef.current?.set && disable) {
      calendarRef.current.set('disable', disable);
    }
  }, [disable]);

  useEffect(() => {
    if (calendarRef.current?.set && enable) {
      calendarRef.current.set('enable', enable);
    }
  }, [enable]);

  useEffect(() => {
    if (calendarRef.current?.set && inline) {
      calendarRef.current.set('inline', inline);
    }
  }, [inline]);

  useEffect(() => {
    // when value prop is manually reset, this clears the flatpickr calendar instance and text input
    // run if both:
    // 1. value prop is set to a falsy value (`""`, `undefined`, `null`, etc) OR an array of all falsy values
    // 2. flatpickr instance contains values in its `selectedDates` property so it hasn't already been cleared
    if (
      (!value || (Array.isArray(value) && value.every((date) => !date))) &&
      calendarRef.current?.selectedDates.length
    ) {
      calendarRef.current?.clear();

      if (startInputField.current) {
        startInputField.current.value = '';
      }

      if (endInputField.current) {
        endInputField.current.value = '';
      }
    }
  }, [value, startInputField]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (
        calendarRef.current &&
        calendarRef.current.isOpen &&
        !calendarRef.current.calendarContainer.contains(event.target) &&
        !startInputField.current.contains(event.target) &&
        !endInputField.current?.contains(event.target)
      ) {
        // Close the calendar immediately on mousedown
        closeCalendar();
      }
    };
    const closeCalendar = () => {
      calendarRef.current?.close();
      // Remove focus from endDate calendar input
      onCalendarClose(
        calendarRef.current?.selectedDates,
        '',
        calendarRef.current,
        { type: 'clickOutside' }
      );
    };
    document.addEventListener('mousedown', handleMouseDown, true);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown, true);
    };
  }, [calendarRef, startInputField, endInputField, onCalendarClose]);

  useEffect(() => {
    if (calendarRef.current?.set) {
      if (value !== undefined) {
        // To make up for calendarRef.current.setDate not making provision for an empty string or array
        if (
          value === '' ||
          value === null ||
          (Array.isArray(value) &&
            (value.length === 0 || value.every((element) => !element)))
        ) {
          // only clear if there are selected dates to avoid unnecessary operations
          if (calendarRef.current.selectedDates.length > 0) {
            calendarRef.current.clear();
          }
        } else {
          calendarRef.current.setDate(value);
        }
      }
      updateClassNames(calendarRef.current, prefix);
      //for simple date picker w/o calendar; initial mount may not have value
    } else if (!calendarRef.current && value) {
      startInputField.current.value = value;
    }
  }, [value, prefix, startInputField]);

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
    } else if (warn) {
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
   * Flatpickr prop passthrough enables direct date input, and when set to false,
   * we must clear dates manually by resetting the value prop to a falsy value (such as `""`, `null`, or `undefined`) or an array of all falsy values, making it a controlled input.
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
    PropTypes.oneOf(SUPPORTED_LOCALES),
  ]),

  /**
   * The maximum date that a user can pick to.
   */
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The minimum date that a user can start picking from.
   */
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The `change` event handler.
   * `(dates: Date[], dStr: string, fp: Instance, data?: any):void;`
   */
  onChange: PropTypes.func,

  /**
   * The `close` event handler.
   * `(dates: Date[], dStr: string, fp: Instance, data?: any):void;`
   */
  onClose: PropTypes.func,

  /**
   * The `open` event handler.
   * `(dates: Date[], dStr: string, fp: Instance, data?: any):void;`
   */
  onOpen: PropTypes.func,

  /**
   * flatpickr prop passthrough. Controls how dates are parsed.
   */
  parseDate: PropTypes.func,

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

  /**
   * Accessible aria-label for the "next month" arrow icon.
   */
  nextMonthAriaLabel: PropTypes.string,

  /**
   * Accessible aria-label for the "previous month" arrow icon.
   */
  prevMonthAriaLabel: PropTypes.string,
};

export default DatePicker;
