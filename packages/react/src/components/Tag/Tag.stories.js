/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { default as Tag } from '../Tag';
import { Asleep } from '@carbon/icons-react';
import TagSkeleton from '../Tag/Tag.Skeleton';
import { Tooltip } from '../Tooltip';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { Popover, PopoverContent } from '../Popover';
import mdx from './Tag.mdx';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const ReadOnly = () => {
  return (
    <>
      <Tag className="some-class" type="red" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="magenta" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="purple" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="blue" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cyan" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="teal" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="green" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="gray" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cool-gray" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="warm-gray" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="high-contrast" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="outline" title="Clear Filter">
        {'Tag content'}
      </Tag>
    </>
  );
};

ReadOnly.argTypes = {
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
};

export const Selectable = () => {
  return (
    <>
      <Tag
        interactivetype="selectable"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        interactivetype="selectable"
        renderIcon={Asleep}
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
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
};

export const Operational = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Tag
          type="red"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </Tag>
        <Tag
          type="magenta"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </Tag>
        <Tag
          type="purple"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </Tag>
        <Tag
          type="blue"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </Tag>
        <Tag
          type="cyan"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </Tag>
        <Tag
          type="teal"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </Tag>
        <Tag
          type="green"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </Tag>
        <Tag
          type="gray"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </Tag>
        <Tag
          type="cool-gray"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </Tag>
        <Tag
          type="warm-gray"
          interactivetype="operational"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </Tag>
      </div>

      <h4>Interactive examples</h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '0.5rem',
        }}>
        <Tooltip label="View more" align="bottom">
          <Tag
            interactivetype="operational"
            className="some-class"
            title="Clear Filter">
            {'Tag content'}
          </Tag>
        </Tooltip>

        <Toggletip>
          <ToggletipButton label="Additional information">
            <Tag
              interactivetype="operational"
              renderIcon={Asleep}
              className="some-class"
              title="Clear Filter">
              {'Tag content'}
            </Tag>
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
          <Tag
            onClick={() => {
              setOpen(!open);
            }}
            interactivetype="operational"
            renderIcon={Asleep}
            className="some-class"
            title="Clear Filter">
            {'Tag content'}
          </Tag>
          <PopoverContent className="p-3">
            <br />
            <Tag
              type="blue"
              interactivetype="read-only"
              className="some-class"
              title="Clear Filter">
              {'Tag 1 name'}
            </Tag>
            <br />
            <Tag
              type="blue"
              interactivetype="read-only"
              className="some-class"
              title="Clear Filter">
              {'Tag 2 name'}
            </Tag>
            <br />
            <Tag
              type="blue"
              interactivetype="read-only"
              className="some-class"
              title="Clear Filter">
              {'Tag 3 name'}
            </Tag>
            <br />
            <Tag
              type="blue"
              interactivetype="read-only"
              className="some-class"
              title="Clear Filter">
              {'Tag 4 name'}
            </Tag>
            <br />
            <Tag
              type="blue"
              interactivetype="read-only"
              className="some-class"
              title="Clear Filter">
              {'Tag 5 name'}
            </Tag>
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
};

export const Dismissible = () => {
  return (
    <>
      <Tag
        type="red"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="magenta"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="purple"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="blue"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="cyan"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="teal"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="green"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="gray"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="cool-gray"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="warm-gray"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="high-contrast"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        type="outline"
        interactivetype="dismissible"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
    </>
  );
};

export const Playground = (args) => {
  return <Tag {...args}>{'Tag content'}</Tag>;
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
  renderIcon: {
    control: false,
  },
  size: {
    options: ['sm', 'md'],
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

export const Skeleton = (args) => (
  <div>
    <TagSkeleton {...args} />
  </div>
);

Skeleton.args = {
  size: 'md',
};

Skeleton.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  as: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  disabled: {
    table: {
      disable: true,
    },
  },

  filter: {
    table: {
      disable: true,
    },
  },
  id: {
    table: {
      disable: true,
    },
  },
  onClose: {
    table: {
      disable: true,
    },
  },
  renderIcon: {
    table: {
      disable: true,
    },
  },
  title: {
    table: {
      disable: true,
    },
  },
  type: {
    table: {
      disable: true,
    },
  },
  size: {
    options: ['sm', 'md'],
    control: {
      type: 'select',
    },
  },
};
