/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import { Checkbox } from '@carbon/icons-react';
import React, { useState } from 'react';
import { Popover, PopoverContent } from '../Popover';
import Button from '../Button';
import mdx from './Popover.mdx';

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
        <Checkbox />
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

export const Playground = PlaygroundStory.bind({});

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
    defaultValue: true,
  },
  dropShadow: {
    control: {
      type: 'boolean',
    },
    defaultValue: true,
  },
  highContrast: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  open: {
    control: {
      type: 'boolean',
    },
    defaultValue: true,
  },
};

Playground.story = {
  decorators: [
    (story) => <div className="mt-10 flex justify-center">{story()}</div>,
  ],
};

export const AutoAlign = () => {
  return (
    <div>
      <Popover open autoAlign>
        <div className="playground-trigger">
          <Checkbox />
        </div>
        <PopoverContent className="p-3">
          <p className="popover-title">Available storage</p>
          <p className="popover-details">
            This server has 150 GB of block storage remaining.
          </p>
        </PopoverContent>
      </Popover>
      <div style={{ position: 'absolute', top: 0, right: 0, margin: '3rem' }}>
        <Popover open autoAlign>
          <div className="playground-trigger">
            <Checkbox />
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
        style={{ position: 'absolute', bottom: 0, right: 0, margin: '3rem' }}>
        <Popover open autoAlign>
          <div className="playground-trigger">
            <Checkbox />
          </div>
          <PopoverContent className="p-3">
            <p className="popover-title">Available storage</p>
            <p className="popover-details">
              This server has 150 GB of block storage remaining.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, margin: '3rem' }}>
        <Popover open autoAlign>
          <div className="playground-trigger">
            <Checkbox />
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

export const OverlayStackingContextsExample = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div style={{ margin: '4rem' }}>
      <Button kind="ghost">
        Higher sibling elements are properly overlaid
      </Button>
      <br />
      <Popover open={open} align="top">
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
          }}>
          Toggle up popover
        </button>
        <PopoverContent>
          <div style={{ padding: '1.5rem' }}>Popover content</div>
        </PopoverContent>
      </Popover>
      <Popover open={open2}>
        <button
          type="button"
          onClick={() => {
            setOpen2(!open2);
          }}>
          Toggle down popover
        </button>
        <PopoverContent>
          <div style={{ padding: '1.5rem' }}>Popover content</div>
        </PopoverContent>
      </Popover>
      <br />
      <Button kind="ghost">and lower sibling elements are also overlaid</Button>
    </div>
  );
};
