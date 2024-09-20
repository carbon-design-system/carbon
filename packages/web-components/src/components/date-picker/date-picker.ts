/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import flatpickr from 'flatpickr';
import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Locale as FlatpickrLocale } from 'flatpickr/dist/types/locale';
import {
  Options as FlatpickrOptions,
  Plugin as FlatpickrPlugin,
} from 'flatpickr/dist/types/options';
import { prefix } from '../../globals/settings';
import FormMixin from '../../globals/mixins/form';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { getISODateString, parseISODateString } from './iso-date';
import CDSDatePickerInput from './date-picker-input';
import appendToPlugin from './append-to-plugin';
import cssClassPlugin from './css-class-plugin';
import fixEventsPlugin from './fix-events-plugin';
import focusPlugin from './focus-plugin';
import iconPlugin from './icon-plugin';
import monthSelectPlugin from './month-select-plugin';
import rangePlugin from './range-plugin';
import shadowDOMEventPlugin from './shadow-dom-events-plugin';
import stateHandshakePlugin from './state-handshake-plugin';
import styles from './date-picker.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Date picker modes.
 */
enum DATE_PICKER_MODE {
  /**
   * Simple mode, without calendar dropdown.
   */
  SIMPLE = 'simple',

  /**
   * Single date mode.
   */
  SINGLE = 'single',

  /**
   * Range mode.
   */
  RANGE = 'range',
}

// Weekdays shorthand for english locale
flatpickr!.l10ns!.en!.weekdays.shorthand.forEach((_day, index) => {
  const currentDay = flatpickr!.l10ns!.en!.weekdays.shorthand;
  if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
    currentDay[index] = 'Th';
  } else {
    currentDay[index] = currentDay[index].charAt(0);
  }
});

/**
 * Date picker.
 *
 * @element cds-date-picker
 * @fires cds-date-picker-changed - The custom event fired on this element when Flatpickr updates its value.
 * @fires cds-date-picker-flatpickr-error
 *   The name of the custom event when Flatpickr throws an error.
 */
@customElement(`${prefix}-date-picker`)
class CDSDatePicker extends HostListenerMixin(FormMixin(LitElement)) {
  /**
   * The slotted `<cds-date-input kind="from">`.
   */
  private _dateInteractNode: CDSDatePickerInput | null = null;

  /**
   * The element to put calendar dropdown in.
   */
  @query('#floating-menu-container')
  private _floatingMenuContainerNode!: HTMLDivElement;

  /**
   * The internal placeholder for the `value` property.
   */
  private _value!: string;

  /**
   * @returns The effective date picker mode, determined by the child `<cds-date-picker-input>`.
   */
  private get _mode() {
    const { selectorInputFrom, selectorInputTo } = this
      .constructor as typeof CDSDatePicker;
    if (this.querySelector(selectorInputTo)) {
      return DATE_PICKER_MODE.RANGE;
    }
    if (this.querySelector(selectorInputFrom)) {
      return DATE_PICKER_MODE.SINGLE;
    }
    return DATE_PICKER_MODE.SIMPLE;
  }

  /**
   * @returns The Flatpickr plugins to use.
   */
  private get _datePickerPlugins(): FlatpickrPlugin[] {
    const {
      classCalendarContainer,
      classMonth,
      classWeekdays,
      classDays,
      classWeekday,
      classDay,
      classNoBorder,
      selectorInputFrom,
      selectorInputTo,
      _selectorFlatpickrMonthYearContainer: selectorFlatpickrMonthYearContainer,
      _selectorFlatpickrYearContainer: selectorFlatpickrYearContainer,
      _selectorFlatpickrCurrentMonth: selectorFlatpickrCurrentMonth,
      _selectorFlatpickrMonth: selectorFlatpickrMonth,
      _selectorFlatpickrWeekdays: selectorFlatpickrWeekdays,
      _selectorFlatpickrDays: selectorFlatpickrDays,
      _selectorFlatpickrWeekday: selectorFlatpickrWeekday,
      _selectorFlatpickrDay: selectorFlatpickrDay,
      _classFlatpickrCurrentMonth: classFlatpickrCurrentMonth,
      _classFlatpickrToday: classFlatpickrToday,
    } = this.constructor as typeof CDSDatePicker;
    const {
      _floatingMenuContainerNode: floatingMenuContainerNode,
      _mode: mode,
    } = this;
    const inputFrom = this.querySelector(selectorInputFrom);
    const inputTo = this.querySelector(selectorInputTo);
    const plugins = [
      appendToPlugin({ appendTo: floatingMenuContainerNode }),
      cssClassPlugin({
        classCalendarContainer,
        classMonth,
        classWeekdays,
        classDays,
        classWeekday,
        classDay,
        classNoBorder,
        selectorFlatpickrMonth,
        selectorFlatpickrWeekdays,
        selectorFlatpickrDays,
        selectorFlatpickrWeekday,
        selectorFlatpickrDay,
        classFlatpickrToday,
      }),
      fixEventsPlugin({
        inputFrom: inputFrom as CDSDatePickerInput,
        inputTo: inputTo as CDSDatePickerInput,
      }),
      focusPlugin({
        inputFrom: inputFrom as CDSDatePickerInput,
        inputTo: inputTo as CDSDatePickerInput,
      }),
      iconPlugin(),
      monthSelectPlugin({
        selectorFlatpickrMonthYearContainer,
        selectorFlatpickrYearContainer,
        selectorFlatpickrCurrentMonth,
        classFlatpickrCurrentMonth,
      }),
      shadowDOMEventPlugin(),
      stateHandshakePlugin(this),
    ];
    if (mode === DATE_PICKER_MODE.RANGE) {
      // Flatpickr runs event handlers of last registered plugins first.
      // Ensures `onValueUpdate` of `rangePlugin` runs first
      // given Flatpickr puts `01/01/1970 to 01/02/1970` to from date
      // where `rangePlugin` overrides it to separate them to from/to dates.
      // We want to ensure our handler of `onValueUpdate` (notably one in `<cds-date-picker-input>`)
      // gets the `<input>` value set by `rangePlugin` instead of Flatpickr core.
      plugins.push(rangePlugin({ input: inputTo as HTMLInputElement }));
    }
    return plugins;
  }

  /**
   * @returns The options to instantiate Flatpickr with.
   */
  private get _datePickerOptions(): FlatpickrOptions {
    const {
      locale = (this.constructor as typeof CDSDatePicker).defaultLocale,
      enabledRange,
      _dateInteractNode: dateInteractNode,
      _datePickerPlugins: plugins,
      _handleFlatpickrError: handleFlatpickrError,
    } = this;
    // We use `<cds-date-picker-input>` to communicate values/events with Flatpickr,
    // but want to use `<input>` in shadow DOM to base the calendar dropdown's position on
    const { input: positionElement } = dateInteractNode!;
    const [minDate = undefined, maxDate = undefined] = !enabledRange
      ? []
      : enabledRange.split('/');
    return {
      allowInput: this.allowInput,
      closeOnSelect: this.closeOnSelect,
      dateFormat:
        this.dateFormat ??
        (this.constructor as typeof CDSDatePicker).defaultDateFormat,
      disableMobile: true,
      errorHandler: handleFlatpickrError,
      locale,
      maxDate,
      minDate,
      positionElement,
      plugins,
    };
  }

  /**
   * Handles `${prefix}-date-picker-changed` event on this element.
   */
  @HostListener('eventChange')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleChange = ({ detail }: CustomEvent) => {
    this._value = detail.selectedDates
      .map((date) => getISODateString(date))
      .join('/');
  };

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * Handles `slotchange` event in the `<slot>`.
   */
  private _handleSlotChange({ target }: Event) {
    const { _dateInteractNode: oldDateInteractNode } = this;
    const dateInteractNode = (target as HTMLSlotElement)
      .assignedNodes()
      .find(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as HTMLElement).matches(
            (this.constructor as typeof CDSDatePicker).selectorInputFrom
          )
      );
    if (oldDateInteractNode !== dateInteractNode) {
      this._dateInteractNode = dateInteractNode as CDSDatePickerInput;
      this._instantiateDatePicker();
    }
  }

  /**
   * Fires a custom event to notify an error in Flatpickr.
   */
  private _handleFlatpickrError = (error: Error) => {
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSDatePicker).eventFlatpickrError,
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {
            error,
          },
        }
      )
    );
  };

  /**
   * Instantiates Flatpickr.
   *
   * @returns The Flatpickr instance.
   */
  private _instantiateDatePicker() {
    this._releaseDatePicker();
    const { _dateInteractNode: dateInteractNode } = this;
    // `this._dateInteractNode` won't be there unless there is a slotted `<cds-date-input type="from">`,
    // which means Flatpickr will never be instantiated in "simple" mode.
    if (dateInteractNode && dateInteractNode.input) {
      this.calendar = flatpickr(
        dateInteractNode as any,
        this._datePickerOptions
      );
    }
    return this.calendar;
  }

  /**
   * Releases Flatpickr instances.
   */
  private _releaseDatePicker() {
    if (this.calendar) {
      this.calendar.destroy();
      this.calendar = null;
    }
    return this.calendar;
  }

  /**
   * The Flatpickr instance.
   */
  calendar: FlatpickrInstance | null = null;

  /**
   * flatpickr prop passthrough. Allows the user to enter a date directly into the input field
   */
  @property({ type: Boolean, reflect: true, attribute: 'allow-input' })
  allowInput = true;

  /**
   * flatpickr prop passthrough. Controls whether the calendar dropdown closes upon selection.
   */
  @property({ type: Boolean, reflect: true, attribute: 'close-on-select' })
  closeOnSelect = true;

  /**
   * The date format to let Flatpickr use.
   */
  @property({ attribute: 'date-format' })
  dateFormat!: string;

  /**
   * Controls the disabled state of the input
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The localization data.
   */
  @property({ attribute: false })
  locale!: FlatpickrLocale;

  /**
   * The date range that a user can pick in calendar dropdown.
   */
  @property({ attribute: 'enabled-range' })
  enabledRange!: string;

  /**
   * The minimum date that a user can start picking from.
   */
  @property({ attribute: 'min-date' })
  minDate!: string;

  /**
   * The maximum date that a user can start picking from.
   */
  @property({ attribute: 'max-date' })
  maxDate!: string;

  /**
   * Name for the input in the `FormData`
   */
  @property()
  name = '';

  /**
   * `true` if the date picker should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Specify if the component should be read-only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * The date(s) in ISO8601 format (date portion only), for range mode, '/' is used for separate start/end dates.
   */
  @property()
  get value() {
    return this._value;
  }

  set value(value: string) {
    const { _value: oldValue } = this;
    this._value = value;
    this.requestUpdate('value', oldValue);
  }

  connectedCallback() {
    super.connectedCallback();
    this._instantiateDatePicker();
  }

  disconnectedCallback() {
    this._releaseDatePicker();
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    const { calendar, disabled, open, readonly } = this;
    const { selectorInputFrom, selectorInputTo } = this
      .constructor as typeof CDSDatePicker;
    const inputFrom = this.querySelector(
      selectorInputFrom
    ) as CDSDatePickerInput;
    const inputTo = this.querySelector(selectorInputTo) as CDSDatePickerInput;
    if (calendar && changedProperties.has('dateFormat')) {
      const { dateFormat } = this;
      calendar.set({ dateFormat });
    }
    if (changedProperties.has('minDate') || changedProperties.has('maxDate')) {
      const { minDate, maxDate } = this;
      if (!parseISODateString(minDate)) {
        // Allows empty start/end
        throw new Error(
          `Wrong date format found in \`minDate\` property: ${minDate}`
        );
      }
      if (!parseISODateString(maxDate)) {
        // Allows empty start/end
        throw new Error(
          `Wrong date format found in \`maxDate\` property: ${maxDate}`
        );
      }
      if (minDate && maxDate && minDate > maxDate) {
        throw new Error(
          `\`maxDate\` property, shouldn't be smaller than the \`minDate\` property. You have: minDate: ${minDate}, maxDate: ${maxDate}`
        );
      }
      if (calendar) {
        calendar.set({ minDate, maxDate });
      }
    }

    if (changedProperties.has('open') && calendar) {
      if (open && !readonly) {
        calendar.open();
      } else {
        calendar.close();
      }
    }
    if (
      changedProperties.has('disabled') ||
      changedProperties.has('readonly')
    ) {
      [inputFrom, inputTo].forEach((input) => {
        if (input) {
          input.disabled = disabled;
          input.readonly = readonly;
        }
      });
    }
    if (changedProperties.has('value')) {
      const { value } = this;
      const dates = value
        .split('/')
        .filter(Boolean)
        .map((item) => parseISODateString(item));
      if (dates.some((item) => isNaN(Number(item)))) {
        throw new Error(
          `Wrong date format found in \`value\` property: ${value}`
        );
      }
      const [startDate, endDate] = dates;
      if (startDate && endDate && startDate > endDate) {
        throw new Error(
          `In \`value\` property, the end date shouldn't be smaller than the start date. You have: ${value}`
        );
      }
      if (calendar) {
        calendar.setDate(dates);
        [inputFrom, inputTo].forEach((input, i) => {
          if (input) {
            input.value = !dates[i]
              ? ''
              : calendar.formatDate(
                  new Date(dates[i]),
                  calendar.config.dateFormat
                );
          }
        });
      }
    }
  }

  render() {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <a
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
      <slot @slotchange="${handleSlotChange}"></slot>
      <div id="floating-menu-container"></div>
      <a
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
    `;
  }

  /**
   * The CSS selector for Flatpickr's month/year portion.
   */
  private static _selectorFlatpickrMonthYearContainer =
    '.flatpickr-current-month';

  /**
   * The CSS selector for Flatpickr's year portion.
   */
  private static _selectorFlatpickrYearContainer = '.numInputWrapper';

  /**
   * The CSS selector for the inner element of Flatpickr's month portion.
   */
  private static _selectorFlatpickrCurrentMonth = '.cur-month';

  /**
   * The CSS selector for Flatpickr's month navigator.
   */
  private static _selectorFlatpickrMonth = '.flatpickr-month';

  /**
   * The CSS selector for Flatpickr's container of the weekdays.
   */
  private static _selectorFlatpickrWeekdays = '.flatpickr-weekdays';

  /**
   * The CSS selector for Flatpickr's container of the days.
   */
  private static _selectorFlatpickrDays = '.flatpickr-days';

  /**
   * The CSS selector applied to Flatpickr's each weekdays.
   */
  private static _selectorFlatpickrWeekday = '.flatpickr-weekday';

  /**
   * The CSS selector applied to Flatpickr's each days.
   */
  private static _selectorFlatpickrDay = '.flatpickr-day';

  /**
   * The CSS class for the inner element of Flatpickr's month portion.
   */
  private static _classFlatpickrCurrentMonth = 'cur-month';

  /**
   * The CSS class applied to Flatpickr's "today" highlight.
   */
  private static _classFlatpickrToday = 'today';

  /**
   * The CSS class for the calendar dropdown.
   */
  static get classCalendarContainer() {
    return `${prefix}--date-picker__calendar`;
  }

  /**
   * The CSS class for the month navigator.
   */
  static get classMonth() {
    return `${prefix}--date-picker__month`;
  }

  /**
   * The CSS class for the container of the weekdays.
   */
  static get classWeekdays() {
    return `${prefix}--date-picker__weekdays`;
  }

  /**
   * The CSS class for the container of the days.
   */
  static get classDays() {
    return `${prefix}--date-picker__days`;
  }

  /**
   * The CSS class applied to each weekdays.
   */
  static get classWeekday() {
    return `${prefix}--date-picker__weekday`;
  }

  /**
   * The CSS class applied to each days.
   */
  static get classDay() {
    return `${prefix}--date-picker__day`;
  }

  /**
   * The CSS class applied to the "today" highlight if there are any dates selected.
   */
  static classNoBorder = 'no-border';

  /**
   * The default date format.
   */
  static defaultDateFormat = 'm/d/Y';

  /**
   * The default localization data.
   */
  static defaultLocale = flatpickr.l10ns.default;

  /**
   * A selector that will return the `<input>` to enter starting date.
   */
  static get selectorInputFrom() {
    return `${prefix}-date-picker-input,${prefix}-date-picker-input[kind="from"]`;
  }

  /**
   * A selector that will return the `<input>` to enter end date.
   */
  static get selectorInputTo() {
    return `${prefix}-date-picker-input[kind="to"]`;
  }

  /**
   * The name of the custom event when Flatpickr throws an error.
   */
  static get eventFlatpickrError() {
    return `${prefix}-date-picker-flatpickr-error`;
  }

  /**
   * The name of the custom event fired on this element when Flatpickr updates its value.
   */
  static get eventChange() {
    return `${prefix}-date-picker-changed`;
  }

  static styles = styles;
}

export default CDSDatePicker;
