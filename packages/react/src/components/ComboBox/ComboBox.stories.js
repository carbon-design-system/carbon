/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import ComboBox from '../ComboBox';
import mdx from './ComboBox.mdx';

const items = [
  {
    id: 'option-0',
    text: 'An example option that is really long to show what should be done to handle long text',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

export default {
  title: 'Components/ComboBox',
  component: ComboBox,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    light: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <div style={{ width: 300 }}>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22Combobox%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22combobox%22%2C%22placeholder%22%3A%22placeholder%22%2C%22isMulti%22%3Afalse%2C%22isInline%22%3Afalse%2C%22selectionFeedback%22%3A%22top-after-reopen%22%2C%22direction%22%3A%22bottom%22%2C%22size%22%3A%22md%22%2C%22label%22%3A%22Label%22%2C%22helperText%22%3A%22Optional%20helper%20text%20here%22%2C%22listItems%22%3A%5B%7B%22text%22%3A%22Text%22%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22combobox-2%22%7D%2C%22cssClasses%22%3A%5B%5D%7D%5D%2C%22id%22%3A1%7D%2C%22cssClasses%22%3A%5B%5D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={items}
      downshiftProps={{
        onStateChange: () => {
          console.log('the state has changed');
        },
      }}
      itemToString={(item) => (item ? item.text : '')}
      titleText="ComboBox title"
      helperText="Combobox helper text"
    />
  </div>
);

export const _WithLayer = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22Combobox%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22combobox%22%2C%22placeholder%22%3A%22placeholder%22%2C%22isMulti%22%3Afalse%2C%22isInline%22%3Afalse%2C%22selectionFeedback%22%3A%22top-after-reopen%22%2C%22direction%22%3A%22bottom%22%2C%22size%22%3A%22md%22%2C%22label%22%3A%22Label%22%2C%22helperText%22%3A%22Optional%20helper%20text%20here%22%2C%22listItems%22%3A%5B%7B%22text%22%3A%22Text%22%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22combobox-2%22%7D%2C%22cssClasses%22%3A%5B%5D%7D%5D%2C%22id%22%3A1%7D%2C%22cssClasses%22%3A%5B%5D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <WithLayer>
      {(layer) => (
        <div style={{ width: 300 }}>
          <ComboBox
            onChange={() => {}}
            id={`carbon-combobox-${layer}`}
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            titleText="ComboBox title"
            helperText="Combobox helper text"
          />
        </div>
      )}
    </WithLayer>
  </>
);

export const Playground = (args) => (
  <div style={{ width: 300 }}>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22Combobox%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22combobox%22%2C%22placeholder%22%3A%22placeholder%22%2C%22isMulti%22%3Afalse%2C%22isInline%22%3Afalse%2C%22selectionFeedback%22%3A%22top-after-reopen%22%2C%22direction%22%3A%22bottom%22%2C%22size%22%3A%22md%22%2C%22label%22%3A%22Label%22%2C%22helperText%22%3A%22Optional%20helper%20text%20here%22%2C%22listItems%22%3A%5B%7B%22text%22%3A%22Text%22%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22combobox-2%22%7D%2C%22cssClasses%22%3A%5B%5D%7D%5D%2C%22id%22%3A1%7D%2C%22cssClasses%22%3A%5B%5D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <ComboBox
      id="carbon-combobox"
      items={items}
      downshiftProps={{
        onStateChange: () => {
          console.log('the state has changed');
        },
      }}
      itemToString={(item) => (item ? item.text : '')}
      titleText="ComboBox title"
      helperText="Combobox helper text"
      {...args}
    />
  </div>
);

Playground.argTypes = {
  ['aria-label']: {
    table: {
      disable: true,
    },
  },
  ariaLabel: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  id: {
    table: {
      disable: true,
    },
  },
  downshiftProps: {
    table: {
      disable: true,
    },
  },
  initialSelectedItem: {
    table: {
      disable: true,
    },
  },
  invalidText: {
    control: 'text',
  },
  items: {
    table: {
      disable: true,
    },
  },
  itemToElement: {
    table: {
      disable: true,
    },
  },
  itemToString: {
    table: {
      disable: true,
    },
  },
  onChange: {
    action: 'changed',
  },
  onClick: {
    action: 'clicked',
  },
  onInputChange: {
    table: {
      disable: true,
    },
  },
  onStateChange: {
    table: {
      disable: true,
    },
  },
  onToggleClick: {
    table: {
      disable: true,
    },
  },
  selectedItem: {
    table: {
      disable: true,
    },
  },
  shouldFilterItem: {
    table: {
      disable: true,
    },
  },
  translateWithId: {
    table: {
      disable: true,
    },
  },
  titleText: {
    table: {
      disable: true,
    },
  },
  type: {
    table: {
      disable: true,
    },
  },
  warnText: {
    control: 'text',
  },
};
