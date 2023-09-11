/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import { Checkbox as CheckboxIcon } from '@carbon/icons-react';
import React, { useState } from 'react';
import { Popover, PopoverContent } from '../Popover';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import { default as Checkbox } from '../Checkbox';
import mdx from './Popover.mdx';
import { Settings } from '@carbon/icons-react';
import { keys, match } from '../../internal/keyboard';

const prefix = 'cds';

export default {
  title: 'Components/Popover',
  component: Popover,
  subcomponents: {
    PopoverContent,
  },
  argTypes: {
    as: {
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
    relative: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: mdx,
    },
  },
};

const PlaygroundStory = (props) => {
  const { align, caret, dropShadow, highContrast, open } = props;
  return (
    <Popover
      align={align}
      caret={caret}
      dropShadow={dropShadow}
      highContrast={highContrast}
      open={open}>
      <div className="playground-trigger">
        <CheckboxIcon />
      </div>
      <PopoverContent className="p-3">
        <p className="popover-title">Available storage</p>
        <p className="popover-details">
          This server has 150 GB of block storage remaining.
        </p>
      </PopoverContent>
    </Popover>
  );
};

export const TabTip = () => {
  const [open, setOpen] = useState(true);
  const [openTwo, setOpenTwo] = useState(false);
  const align = document?.dir === 'rtl' ? 'bottom-right' : 'bottom-left';
  const alignTwo = document?.dir === 'rtl' ? 'bottom-left' : 'bottom-right';
  return (
    <div className="popover-tabtip-story" style={{ display: 'flex' }}>
      <Popover
        align={align}
        open={open}
        onKeyDown={(evt) => {
          if (match(evt, keys.Escape)) {
            setOpen(false);
          }
        }}
        isTabTip
        onRequestClose={() => setOpen(false)}>
        <button
          aria-label="Settings"
          type="button"
          onClick={() => {
            setOpen(!open);
          }}>
          <Settings />
        </button>
        <PopoverContent className="p-3">
          <RadioButtonGroup
            style={{ alignItems: 'flex-start', flexDirection: 'column' }}
            legendText="Row height"
            name="radio-button-group"
            defaultSelected="small">
            <RadioButton labelText="Small" value="small" id="radio-small" />
            <RadioButton labelText="Large" value="large" id="radio-large" />
          </RadioButtonGroup>
          <hr />
          <fieldset className={`${prefix}--fieldset`}>
            <legend className={`${prefix}--label`}>Edit columns</legend>
            <Checkbox defaultChecked labelText="Name" id="checkbox-label-1" />
            <Checkbox defaultChecked labelText="Type" id="checkbox-label-2" />
            <Checkbox
              defaultChecked
              labelText="Location"
              id="checkbox-label-3"
            />
          </fieldset>
        </PopoverContent>
      </Popover>

      <Popover
        open={openTwo}
        isTabTip
        align={alignTwo}
        onRequestClose={() => setOpenTwo(false)}>
        <button
          aria-label="Settings"
          type="button"
          onClick={() => {
            setOpenTwo(!openTwo);
          }}>
          <Settings />
        </button>
        <PopoverContent className="p-3">
          <RadioButtonGroup
            style={{ alignItems: 'flex-start', flexDirection: 'column' }}
            legendText="Row height"
            name="radio-button-group-2"
            defaultSelected="small-2">
            <RadioButton labelText="Small" value="small-2" id="radio-small-2" />
            <RadioButton labelText="Large" value="large-2" id="radio-large-2" />
          </RadioButtonGroup>
          <hr />
          <fieldset className={`${prefix}--fieldset`}>
            <legend className={`${prefix}--label`}>Edit columns</legend>
            <Checkbox defaultChecked labelText="Name" id="checkbox-label-8" />
            <Checkbox defaultChecked labelText="Type" id="checkbox-label-9" />
            <Checkbox
              defaultChecked
              labelText="Location"
              id="checkbox-label-10"
            />
          </fieldset>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const Playground = PlaygroundStory.bind({});

Playground.args = {
  caret: true,
  dropShadow: true,
  highContrast: false,
  open: true,
};

Playground.argTypes = {
  align: {
    options: [
      'top',
      'top-left',
      'top-right',

      'bottom',
      'bottom-left',
      'bottom-right',

      'left',
      'left-bottom',
      'left-top',

      'right',
      'right-bottom',
      'right-top',
    ],
    control: {
      type: 'select',
    },
  },
  caret: {
    control: {
      type: 'boolean',
    },
  },
  dropShadow: {
    control: {
      type: 'boolean',
    },
  },
  highContrast: {
    control: {
      type: 'boolean',
    },
  },
  open: {
    control: {
      type: 'boolean',
    },
  },
};

Playground.story = {
  decorators: [
    (story) => <div className="mt-10 flex justify-center">{story()}</div>,
  ],
};

export const AutoAlign = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          insetBlockEnd: 0,
          insetInlineEnd: '50%',
          marginBlock: '3rem',
          marginInline: '3rem',
        }}>
        <Popover open={open} autoAlign>
          <div className="playground-trigger">
            <CheckboxIcon
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
          <PopoverContent className="p-3">
            <p className="popover-title">Available storage</p>
            <p className="popover-details">
              This server has 150 GB of block storage remaining.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <Popover open autoAlign>
        <div className="playground-trigger">
          <CheckboxIcon />
        </div>
        <PopoverContent className="p-3">
          <p className="popover-title">Available storage</p>
          <p className="popover-details">
            This server has 150 GB of block storage remaining.
          </p>
        </PopoverContent>
      </Popover>
      <div
        style={{
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineEnd: 0,
          marginBlock: '3rem',
          marginInline: '3rem',
        }}>
        <Popover open autoAlign>
          <div className="playground-trigger">
            <CheckboxIcon />
          </div>
          <PopoverContent className="p-3">
            <p className="popover-title">Available storage</p>
            <p className="popover-details">
              This server has 350 GB of block storage remaining.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div
        style={{
          position: 'absolute',
          insetBlockEnd: 0,
          insetInlineEnd: 0,
          marginBlock: '3rem',
          marginInline: '3rem',
        }}>
        <Popover open autoAlign>
          <div className="playground-trigger">
            <CheckboxIcon />
          </div>
          <PopoverContent className="p-3">
            <p className="popover-title">Available storage</p>
            <p className="popover-details">
              This server has 150 GB of block storage remaining.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div
        style={{
          position: 'absolute',
          insetBlockEnd: 0,
          insetInlineStart: 0,
          marginBlock: '3rem',
          marginInline: '3rem',
        }}>
        <Popover open autoAlign>
          <div className="playground-trigger">
            <CheckboxIcon />
          </div>
          <PopoverContent className="p-3">
            <p className="popover-title">Available storage</p>
            <p className="popover-details">
              This server has 150 GB of block storage remaining.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
