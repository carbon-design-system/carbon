/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import DatePicker from './DatePicker';
import DatePickerSkeleton from './DatePicker.Skeleton';
import DatePickerInput from '../DatePickerInput';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';

import mdx from './DatePicker.mdx';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  subcomponents: {
    DatePickerInput,
    DatePickerSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Simple1 = () => (
  <DatePicker
    datePickerType="simple"
    onChange={(value) => {
      console.log('check onchange bugs', value);
    }}
    onClose={(e) => {
      console.log(' check onclose', e);
    }}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-simple"
    />
  </DatePicker>
);

export const Test33 = () => {
  const [currentDate, setCurrentDate] = useState(null);
  const [inputText, setInputText] = useState('');
  const [currentTypedDate, setCurrentTypedDate] = useState('');

  return (
    <div>
      <DatePicker
        id="testDateField"
        datePickerType="single"
        allowInput={true}
        dateFormat="d/m/Y"
        locale="en"
        onChange={(event) => {
          if (event && Array.isArray(event) && event.length) {
            setCurrentDate(event[0]);
          } else {
            setCurrentDate(null);
          }
        }}>
        <DatePickerInput
          id="testDateFieldInput"
          datePickerType="single"
          placeholder="dd/mm/yyyy"
          labelText="Date"
          size="md"
          onChange={(event) => {
            setInputText(event?.target?.value);
          }}
          onBlur={(event) => {
            setCurrentTypedDate(inputText);
          }}
        />
      </DatePicker>
      <br />
      <p style={{ fontWeight: 600, fontSize: '10pt' }}>Date picker date:</p>
      <p style={{ fontSize: '11pt' }}>
        {currentDate && currentDate.toISOString
          ? currentDate.toDateString()
          : 'No date'}
      </p>
      <br />
      <p style={{ fontWeight: 600, fontSize: '10pt' }}>Date input date:</p>
      <p style={{ fontSize: '11pt' }}>
        {currentTypedDate ? currentTypedDate : 'No date typed'}
      </p>
    </div>
  );
};
export const SingleWithCalendar = () => (
  <DatePicker
    datePickerType="single"
    onChange={(value) => {
      console.log('check onchange bugs', value);
    }}
    onClose={(e) => {
      console.log(' check onclose', e);
    }}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-single"
      size="md"
    />
  </DatePicker>
);
export const Test2 = () => {
  const [date, setDate] = useState();
  return (
    <>
      <DatePicker
        datePickerType="single"
        value={date}
        onChange={(value) => {
          console.log('check onchange bugs', value);
          setDate(value);
        }}
        onClose={(e) => {
          console.log(' check onclose', e);
        }}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id="date-picker-simple"
        />
      </DatePicker>
      <button
        type="button"
        onClick={() => {
          console.log('date', date);
          setDate('');
        }}>
        clear
      </button>

      <span> value is {date?.toLocaleString()}</span>
    </>
  );
};
export const RangeWithCalendar = () => {
  return (
    <DatePicker
      datePickerType="range"
      onChange={(e) => {
        console.log('check onchange bugs', e);
      }}
      onClose={(e) => {
        console.log(' check onclose', e);
      }}>
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Start date"
        size="md"
      />
      <DatePickerInput
        id="date-picker-input-id-finish"
        placeholder="mm/dd/yyyy"
        labelText="End date"
        size="md"
      />
    </DatePicker>
  );
};
export const Test = () => {
  const [date, setDate] = useState(['', '']);
  useEffect(() => {
    console.log('selected date:', date);
  }, [date]);

  const handleChange = (range) => {
    const [startDate, endDate] = range ?? ['', ''];

    if (!startDate || !endDate) return;

    setDate([startDate, endDate]);
  };

  return (
    <>
      <div className="buttonsGroup">
        <div className="button">
          <Button kind="ghost" onClick={() => setDate(['', ''])}>
            reset
          </Button>
        </div>
      </div>
      <DatePicker
        light
        datePickerType="range"
        dateFormat="m/d/Y"
        value={date}
        //   onChange={(vals) => handleChange(vals)}
        onClose={(e) => {
          console.log('check onclose', e);
        }}>
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
          size="md"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
        />
      </DatePicker>
    </>
  );
};
export const SimpleWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="simple">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-simple-${layer}`}
          size="md"
        />
      </DatePicker>
    )}
  </WithLayer>
);

export const SingleWithCalendarWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="single">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-single-${layer}`}
          size="md"
        />
      </DatePicker>
    )}
  </WithLayer>
);

export const RangeWithCalendarWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="range">
        <DatePickerInput
          id={`date-picker-input-id-start-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="Start date"
          size="md"
        />
        <DatePickerInput
          id={`date-picker-input-id-finish-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
        />
      </DatePicker>
    )}
  </WithLayer>
);

export const Skeleton = () => <DatePickerSkeleton range />;

const aiLabel = (
  <AILabel className="slug-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const withAILabel = () => (
  <div style={{ width: 400 }}>
    <DatePicker datePickerType="single">
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        size="md"
        id="date-picker"
        slug={aiLabel}
      />
    </DatePicker>
  </div>
);

export const Playground = ({ readOnly, ...args }) => {
  return (
    <DatePicker datePickerType="single" {...args} readOnly={readOnly}>
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        id="date-picker-single"
        {...args}
      />
      {args.datePickerType === 'range' && (
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          id="date-picker-input-2"
          {...args}
        />
      )}
    </DatePicker>
  );
};

Playground.argTypes = {
  appendTo: {
    table: {
      disable: true,
    },
  },
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  disable: {
    table: {
      disable: true,
    },
  },
  enable: {
    table: {
      disable: true,
    },
  },
  inline: {
    table: {
      disable: true,
    },
  },
  locale: {
    table: {
      disable: true,
    },
  },
  onChange: {
    action: 'onChange',
  },
  onClose: {
    action: 'onClose',
  },
  onOpen: {
    action: 'onOpen',
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  value: {
    table: {
      disable: true,
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
    table: {
      category: 'DatePickerInput',
    },
  },
  disabled: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  invalid: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  invalidText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  placeholder: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  warn: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  warnText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  helperText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
};
