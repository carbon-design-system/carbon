/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { Calendar16 } from '@carbon/icons-react';

const { prefix } = settings;

const upperSubLocale = (locale) => {
  const splitLocale = locale.split(/[\s-_]+/);
  if (splitLocale[1]) {
    splitLocale[1] = splitLocale[1].toUpperCase();
    return splitLocale.join('-');
  }
  return splitLocale[0];
};

const formatPlaceholder = (placeholder, locale) => {
  if (placeholder !== undefined) return placeholder;
  if (!locale) return null;
  let formatObj;
  try {
    formatObj = new Intl.DateTimeFormat(upperSubLocale(locale)).formatToParts(
      new Date()
    );
  } catch (err) {
    console.log(err);
    formatObj = new Intl.DateTimeFormat('en').formatToParts(new Date());
  }
  return formatObj
    .map((obj) => {
      switch (obj.type) {
        case 'day':
          return 'dd';
        case 'month':
          return 'mm';
        case 'year':
          return 'yyyy';
        default:
          return obj.value;
      }
    })
    .join('');
};
export default class DatePickerInput extends Component {
  static propTypes = {
    /**
     * The type of the date picker:
     *
     * * `simple` - Without calendar dropdown.
     * * `single` - With calendar dropdown and single date.
     * * `range` - With calendar dropdown and a date range.
     */
    datePickerType: PropTypes.oneOf(['simple', 'single', 'range']),

    /**
     * Specify whether or not the input should be disabled
     */
    disabled: PropTypes.bool,

    /**
     * Specify if the label should be hidden
     */
    hideLabel: PropTypes.bool,

    /**
     * The description of the calendar icon.
     */
    iconDescription: PropTypes.string,

    /**
     * Specify an id that uniquely identifies the `<input>`
     */
    id: PropTypes.string.isRequired,

    /**
     * Specify whether or not the input should be invalid
     */
    invalid: PropTypes.bool,

    /**
     * Specify the text to be rendered when the input is invalid
     */
    invalidText: PropTypes.string,

    /**
     * Provide the text that will be read by a screen reader when visiting this
     * control
     */
    labelText: PropTypes.node.isRequired,

    /**
     *  The language locale used to format the days of the week, months, and numbers. The full list of supported locales can be found here https://github.com/flatpickr/flatpickr/tree/master/src/l10n
     */
    locale: PropTypes.oneOf([
      'ar', // Arabic
      'at', // Austria
      'be', // Belarusian
      'bg', // Bulgarian
      'bn', // Bangla
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
      'fr', // French
      'gr', // Greek
      'he', // Hebrew
      'hi', // Hindi
      'hr', // Croatian
      'hu', // Hungarian
      'id', // Indonesian
      'it', // Italian
      'ja', // Japanese
      'ko', // Korean
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
      'vn', // Vietnamese
      'zh', // Mandarin
      'zh-cn', // Mandarin alternate
      'zh-tw', // Taiwanese Mandarin
    ]),

    /**
     * Specify an `onChange` handler that is called whenever a change in the
     * input field has occurred
     */
    onChange: PropTypes.func,

    /**
     * Provide a function to be called when the input field is clicked
     */
    onClick: PropTypes.func,

    /**
     * Provide a function to be called when the input field is clicked
     */
    openCalendar: PropTypes.func,

    /**
     * Provide a regular expression that the input value must match
     */
    pattern: (props, propName, componentName) => {
      if (props[propName] === undefined) {
        return;
      }
      try {
        new RegExp(props[propName]);
      } catch (e) {
        return new Error(
          `Invalid value of prop '${propName}' supplied to '${componentName}', it should be a valid regular expression`
        );
      }
    },

    /**
     * Specify the placeholder text
     */
    placeholder: PropTypes.string,

    /**
     * Specify the size of the Date Picker Input. Currently supports either `sm` or `xl` as an option.
     */
    size: PropTypes.oneOf(['sm', 'xl']),

    /**
     * Specify the type of the `<input>`
     */
    type: PropTypes.string,
  };

  static defaultProps = {
    pattern: '\\d{1,2}\\/\\d{1,2}\\/\\d{4}',
    type: 'text',
    disabled: false,
    invalid: false,
    onClick: () => {},
    onChange: () => {},
  };

  render() {
    const {
      id,
      labelText,
      disabled,
      invalid,
      invalidText,
      hideLabel,
      onChange,
      onClick,
      placeholder,
      locale,
      type,
      datePickerType,
      pattern,
      iconDescription,
      openCalendar,
      size,
      ...other
    } = this.props;

    const datePickerInputProps = {
      id,
      onChange: (evt) => {
        if (!disabled) {
          onChange(evt);
        }
      },
      onClick: (evt) => {
        if (!disabled) {
          onClick(evt);
        }
      },
      placeholder: formatPlaceholder(placeholder, locale),
      type,
      pattern,
    };

    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: disabled,
    });

    const inputClasses = classNames(`${prefix}--date-picker__input`, {
      [`${prefix}--date-picker__input--${size}`]: size,
    });

    const datePickerIcon = (() => {
      if (datePickerType === 'simple') {
        return;
      }
      return (
        <Calendar16
          className={`${prefix}--date-picker__icon`}
          aria-label={iconDescription}
          onClick={openCalendar}
          role="img">
          {iconDescription && <title>{iconDescription}</title>}
        </Calendar16>
      );
    })();

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;

    const error = invalid ? (
      <div className={`${prefix}--form-requirement`}>{invalidText}</div>
    ) : null;

    const containerClasses = classNames(`${prefix}--date-picker-container`, {
      [`${prefix}--date-picker--nolabel`]: !label,
    });

    const input = invalid ? (
      <input
        {...other}
        {...datePickerInputProps}
        disabled={disabled}
        ref={(input) => {
          this.input = input;
        }}
        data-invalid
        className={inputClasses}
      />
    ) : (
      <input
        ref={(input) => {
          this.input = input;
        }}
        {...other}
        {...datePickerInputProps}
        disabled={disabled}
        className={inputClasses}
      />
    );

    return (
      <div className={containerClasses}>
        {label}
        <div className={`${prefix}--date-picker-input__wrapper`}>
          {input}
          {datePickerIcon}
        </div>
        {error}
      </div>
    );
  }
}
