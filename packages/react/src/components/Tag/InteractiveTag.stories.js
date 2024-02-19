/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { default as InteractiveTag } from './InteractiveTag';
import { Asleep } from '@carbon/icons-react';
import { Popover, PopoverContent } from '../Popover';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { Tooltip } from '../Tooltip';
export default {
  title: 'Components/Tag/InteractiveTag',
  component: InteractiveTag,
};

export const Selectable = () => {
  return (
    <>
      <InteractiveTag
        type="red"
        interactivetype="selectable"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag
        interactivetype="selectable"
        renderIcon={Asleep}
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
    </>
  );
};

Selectable.argTypes = {
  type: {
    table: {
      disable: true,
    },
  },
  interactivetype: {
    table: {
      disable: true,
    },
  },
  filter: {
    table: {
      disable: true,
    },
  },
  onClose: {
    table: {
      disable: true,
    },
  },
  title: {
    table: {
      disable: true,
    },
  },
};

export const Dismissible = () => {
  return (
    <InteractiveTag
      interactivetype="dismissible"
      className="some-class"
      title="Clear Filter">
      {'Tag content'}
    </InteractiveTag>
  );
};

export const Operational = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <InteractiveTag
          type="red"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </InteractiveTag>
        <InteractiveTag
          type="magenta"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </InteractiveTag>
        <InteractiveTag
          type="purple"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </InteractiveTag>
        <InteractiveTag
          type="blue"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </InteractiveTag>
        <InteractiveTag
          type="cyan"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </InteractiveTag>
        <InteractiveTag
          type="teal"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </InteractiveTag>
        <InteractiveTag
          type="green"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </InteractiveTag>
        <InteractiveTag
          type="gray"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </InteractiveTag>
        <InteractiveTag
          type="cool-gray"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </InteractiveTag>
        <InteractiveTag
          type="warm-gray"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </InteractiveTag>
      </div>

      <h4>Interactive examples</h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '0.5rem',
        }}>
        <Tooltip label="View more" align="bottom">
          <InteractiveTag
            interactivetype="operational"
            className="some-class"
            title="Clear Filter">
            {'Tag content'}
          </InteractiveTag>
        </Tooltip>

        <Toggletip>
          <ToggletipButton label="Additional information">
            <InteractiveTag
              interactivetype="operational"
              renderIcon={Asleep}
              className="some-class"
              title="Clear Filter">
              {'Tag content'}
            </InteractiveTag>
          </ToggletipButton>
          <ToggletipContent>
            <p>Tag 1 name</p>
            <p>Tag 2 name</p>
            <p>Tag 3 name</p>
            <p>Tag 4 name</p>
            <p>Tag 5 name</p>
          </ToggletipContent>
        </Toggletip>

        <Popover open={open}>
          <InteractiveTag
            onClick={() => {
              setOpen(!open);
            }}
            interactivetype="operational"
            renderIcon={Asleep}
            className="some-class"
            title="Clear Filter">
            {'Tag content'}
          </InteractiveTag>
          <PopoverContent className="p-3">
            <br />
            <InteractiveTag
              type="blue"
              interactivetype="operational"
              className="some-class"
              title="Clear Filter">
              {'Tag 1 name'}
            </InteractiveTag>
            <br />
            <InteractiveTag
              type="blue"
              interactivetype="operational"
              className="some-class"
              title="Clear Filter">
              {'Tag 2 name'}
            </InteractiveTag>
            <br />
            <InteractiveTag
              type="blue"
              interactivetype="operational"
              className="some-class"
              title="Clear Filter">
              {'Tag 3 name'}
            </InteractiveTag>
            <br />
            <InteractiveTag
              type="blue"
              interactivetype="operational"
              className="some-class"
              title="Clear Filter">
              {'Tag 4 name'}
            </InteractiveTag>
            <br />
            <InteractiveTag
              type="blue"
              interactivetype="operational"
              className="some-class"
              title="Clear Filter">
              {'Tag 5 name'}
            </InteractiveTag>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

Operational.argTypes = {
  type: {
    table: {
      disable: true,
    },
  },
  filter: {
    table: {
      disable: true,
    },
  },
  onClose: {
    table: {
      disable: true,
    },
  },
  title: {
    table: {
      disable: true,
    },
  },
};

export const Playground = (args) => {
  return (
    <InteractiveTag interactivetype="operational" {...args}>
      {'Tag content'}
    </InteractiveTag>
  );
};

Playground.args = {
  disabled: false,
  filter: false,
  size: 'md',
  title: 'Clear filter',
};

Playground.argTypes = {
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  filter: {
    control: {
      type: 'boolean',
    },
  },
  id: {
    control: false,
  },
  interactivetype: {
    options: ['selectable', 'operational', 'dismissible'],
    control: {
      type: 'select',
    },
  },
  renderIcon: {
    control: false,
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
  title: {
    control: {
      type: 'text',
    },
  },
  type: {
    options: [
      'red',
      'magenta',
      'purple',
      'blue',
      'cyan',
      'teal',
      'green',
      'gray',
      'cool-gray',
      'warm-gray',
      'high-contrast',
      'outline',
    ],
    control: {
      type: 'select',
    },
  },
};
