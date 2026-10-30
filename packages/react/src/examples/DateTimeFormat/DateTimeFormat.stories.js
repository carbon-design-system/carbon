/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useMemo, useState } from 'react';
import {
  DatePicker,
  DatePickerInput,
  Dropdown,
  TextInput,
} from '@carbon/react';
import { dateTimeFormat } from '@carbon/utilities';
import './_story-styles.scss';
import DocsPage from './DateTimeFormat.mdx';

const localeOptions = [
  {
    label: 'en-US / English (United States)',
    value: 'en-US',
  },
  {
    label: 'af-ZA / Afrikaans (South Africa)',
    value: 'af-ZA',
  },
  {
    label: 'de-DE / German (Germany)',
    value: 'de-DE',
  },
  {
    label: 'el-GR / Greek (Greece)',
    value: 'el-GR',
  },
  {
    label: 'en-GB / English (United Kingdom)',
    value: 'en-GB',
  },
  {
    label: 'en-IN / English (India)',
    value: 'en-IN',
  },
  {
    label: 'es-ES / Spanish (Spain)',
    value: 'es-ES',
  },
  {
    label: 'fr-CH / French (Switzerland)',
    value: 'fr-CH',
  },
  {
    label: 'fr-FR / French (France)',
    value: 'fr-FR',
  },
  {
    label: 'hi-IN / Hindi (India)',
    value: 'hi-IN',
  },
  {
    label: 'it-IT / Italian (Italy)',
    value: 'it-IT',
  },
  {
    label: 'ja-JP / Japanese (Japan)',
    value: 'ja-JP',
  },
  {
    label: 'ml-IN / Malayalam (India)',
    value: 'ml-IN',
  },
  {
    label: 'nl-NL / Dutch (Netherlands)',
    value: 'nl-NL',
  },
  {
    label: 'sv-SE / Swedish (Sweden)',
    value: 'sv-SE',
  },
  {
    label: 'zh-Hans / Chinese (Simplified)',
    value: 'zh-Hans',
  },
  {
    label: 'zh-Hant / Chinese (Traditional)',
    value: 'zh-Hant',
  },
];

const formatOptions = [
  {
    label: 'Relative',
    value: 'relative',
  },
  {
    label: 'Absolute time',
    value: 'absolute-time',
  },
  {
    label: 'Absolute date',
    value: 'absolute-date',
  },
  {
    label: 'Absolute date and time',
    value: 'absolute-date-time',
  },
  {
    label: 'Date and time tooltip',
    value: 'absolute-tooltip',
  },
];

const pad = (value) => String(value).padStart(2, '0');

const formatDateInputValue = (date) => {
  return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`;
};

const formatTimeInputValue = (date) => {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

const isValidTimeInput = (value) => {
  return /^\d{2}:\d{2}:\d{2}$/.test(value);
};

const parseDateTime = (dateValue, timeValue) => {
  const [month = '01', day = '01', year = '1970'] = dateValue.split('/');
  const [hours = '00', minutes = '00', seconds = '00'] = timeValue.split(':');

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
    Number(seconds)
  );
};

const getOutputValues = (timestamp, locale, selectedFormat) => {
  if (selectedFormat === 'relative') {
    return {
      Default: dateTimeFormat.relative.format(timestamp, { locale }),
      Long: dateTimeFormat.relative.format(timestamp, {
        locale,
        style: 'long',
      }),
      Short: dateTimeFormat.relative.format(timestamp, {
        locale,
        style: 'short',
      }),
      Narrow: dateTimeFormat.relative.format(timestamp, {
        locale,
        style: 'narrow',
      }),
    };
  }

  if (selectedFormat === 'absolute-date') {
    return {
      default: dateTimeFormat.absolute.formatDate(timestamp, { locale }),
      full: dateTimeFormat.absolute.formatDate(timestamp, {
        locale,
        style: 'full',
      }),
      long: dateTimeFormat.absolute.formatDate(timestamp, {
        locale,
        style: 'long',
      }),
      medium: dateTimeFormat.absolute.formatDate(timestamp, {
        locale,
        style: 'medium',
      }),
      short: dateTimeFormat.absolute.formatDate(timestamp, {
        locale,
        style: 'short',
      }),
    };
  }

  if (selectedFormat === 'absolute-time') {
    return {
      default: dateTimeFormat.absolute.formatTime(timestamp, { locale }),
      full: dateTimeFormat.absolute.formatTime(timestamp, {
        locale,
        style: 'full',
      }),
      long: dateTimeFormat.absolute.formatTime(timestamp, {
        locale,
        style: 'long',
      }),
      medium: dateTimeFormat.absolute.formatTime(timestamp, {
        locale,
        style: 'medium',
      }),
      short: dateTimeFormat.absolute.formatTime(timestamp, {
        locale,
        style: 'short',
      }),
    };
  }

  if (selectedFormat === 'absolute-tooltip') {
    return {
      Tooltip: dateTimeFormat.absolute.format(timestamp, {
        locale,
        style: 'long',
      }),
    };
  }

  return {
    default: dateTimeFormat.absolute.format(timestamp, { locale }),
    full: dateTimeFormat.absolute.format(timestamp, {
      locale,
      style: 'full',
    }),
    long: dateTimeFormat.absolute.format(timestamp, {
      locale,
      style: 'long',
    }),
    medium: dateTimeFormat.absolute.format(timestamp, {
      locale,
      style: 'medium',
    }),
    short: dateTimeFormat.absolute.format(timestamp, {
      locale,
      style: 'short',
    }),
  };
};

const DateTimeFormatDemo = () => {
  const initialDate = new Date();

  const [dateValue, setDateValue] = useState(formatDateInputValue(initialDate));
  const [timeValue, setTimeValue] = useState(formatTimeInputValue(initialDate));
  const [locale, setLocale] = useState(localeOptions[0]);
  const [selectedFormat, setSelectedFormat] = useState(formatOptions[0]);

  const timestamp = useMemo(() => {
    return parseDateTime(dateValue, timeValue);
  }, [dateValue, timeValue]);

  const outputValues = useMemo(() => {
    return getOutputValues(timestamp, locale.value, selectedFormat.value);
  }, [timestamp, locale, selectedFormat]);

  return (
    <div className="date-time-format-story">
      <div className="date-time-format-story__panel">
        <div className="date-time-format-story__controls">
          <DatePicker
            datePickerType="single"
            value={dateValue}
            onChange={(selectedDates) => {
              if (selectedDates?.[0]) {
                setDateValue(formatDateInputValue(selectedDates[0]));
              }
            }}
          >
            <DatePickerInput
              id="date-time-format-date"
              labelText="Date"
              placeholder="mm/dd/yyyy"
            />
          </DatePicker>
          <TextInput
            id="date-time-format-time"
            labelText="Time"
            placeholder="hh:mm:ss"
            value={timeValue}
            onChange={(event) => {
              const nextValue = event.target.value;
              if (!/^[\d:]*$/.test(nextValue)) {
                return;
              }
              if (nextValue.length > 8) {
                return;
              }
              const parts = nextValue.split(':');
              if (parts.length > 3) {
                return;
              }
              if (parts.some((part) => part.length > 2)) {
                return;
              }
              setTimeValue(nextValue);
            }}
            onBlur={() => {
              if (!isValidTimeInput(timeValue)) {
                setTimeValue(formatTimeInputValue(new Date()));
              }
            }}
          />
          <Dropdown
            id="date-time-format-locale"
            titleText="Locale"
            items={localeOptions}
            itemToString={(item) => item?.label ?? ''}
            selectedItem={locale}
            onChange={({ selectedItem }) => {
              if (selectedItem) {
                setLocale(selectedItem);
              }
            }}
          />
          <Dropdown
            id="date-time-format-format"
            titleText="Format"
            items={formatOptions}
            itemToString={(item) => item?.label ?? ''}
            selectedItem={selectedFormat}
            onChange={({ selectedItem }) => {
              if (selectedItem) {
                setSelectedFormat(selectedItem);
              }
            }}
          />
        </div>

        <div>
          <p className="date-time-format-story__output-label">Output</p>
          <div className="date-time-format-story__output-panel">
            {Object.entries(outputValues).map(([styleName, value]) => (
              <div
                key={styleName}
                className="date-time-format-story__output-group"
              >
                <div className="date-time-format-story__output-name">
                  {styleName}
                </div>
                <div className="date-time-format-story__output-value">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  title: 'Examples/Date Time Format',
  component: DateTimeFormatDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true },
  },
};

export const DateTimeFormat = () => {
  return <DateTimeFormatDemo />;
};

DateTimeFormat.storyName = 'Date Time Format';
