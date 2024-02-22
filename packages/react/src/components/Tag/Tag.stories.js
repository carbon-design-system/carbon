/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { default as Tag } from '../Tag';
import { default as SelectableTag } from './SelectableTag';
import { default as OperationalTag } from './OperationalTag';
import { default as DismissibleTag } from './DismissibleTag';
import TagSkeleton from '../Tag/Tag.Skeleton';
import { Asleep } from '@carbon/icons-react';
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
      <Tag className="some-class" type="red">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="magenta">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="purple">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="blue">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cyan">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="teal">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="green">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="gray">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cool-gray">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="warm-gray">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="high-contrast">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="outline">
        {'Tag content'}
      </Tag>
    </>
  );
};

export const Selectable = () => {
  return (
    <>
      <SelectableTag className="some-class" title="Clear Filter">
        {'Tag content'}
      </SelectableTag>
      <SelectableTag
        renderIcon={Asleep}
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </SelectableTag>
    </>
  );
};

Selectable.argTypes = {
  as: {
    table: {
      disable: true,
    },
  },
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
  selected: {
    control: 'false',
    description: 'Specify the state of the selectable tag.',
  },
  title: {
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
        <OperationalTag type="red" className="some-class" title="Clear Filter">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="magenta"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="purple"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="blue" className="some-class" title="Clear Filter">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="cyan" className="some-class" title="Clear Filter">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="teal" className="some-class" title="Clear Filter">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="green"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="gray" className="some-class" title="Clear Filter">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="cool-gray"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="warm-gray"
          className="some-class"
          title="Clear Filter">
          {'Tag content'}
        </OperationalTag>
      </div>

      <h4>Interactive examples</h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '0.5rem',
        }}>
        <Tooltip label="View more" align="bottom">
          <OperationalTag className="some-class" title="Clear Filter">
            {'Tag content'}
          </OperationalTag>
        </Tooltip>

        <Toggletip>
          <ToggletipButton label="Additional information">
            <OperationalTag
              renderIcon={Asleep}
              className="some-class"
              title="Clear Filter">
              {'Tag content'}
            </OperationalTag>
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
          <OperationalTag
            onClick={() => {
              setOpen(!open);
            }}
            renderIcon={Asleep}
            className="some-class"
            title="Clear Filter">
            {'Tag content'}
          </OperationalTag>
          <PopoverContent className="p-3">
            <br />
            <Tag type="blue" className="some-class" title="Clear Filter">
              {'Tag 1 name'}
            </Tag>
            <br />
            <Tag type="blue" className="some-class" title="Clear Filter">
              {'Tag 2 name'}
            </Tag>
            <br />
            <Tag type="blue" className="some-class" title="Clear Filter">
              {'Tag 3 name'}
            </Tag>
            <br />
            <Tag type="blue" className="some-class" title="Clear Filter">
              {'Tag 4 name'}
            </Tag>
            <br />
            <Tag type="blue" className="some-class" title="Clear Filter">
              {'Tag 5 name'}
            </Tag>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

Operational.argTypes = {
  as: {
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
  selected: {
    table: {
      disable: true,
    },
  },
  type: {
    options: ['red', 'blue'],
    description: 'Specify the type of the `Tag`',
  },
};

export const Dismissible = () => {
  return (
    <>
      <DismissibleTag type="red" className="some-class" title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="magenta"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag type="purple" className="some-class" title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag type="blue" className="some-class" title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag type="cyan" className="some-class" title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag type="teal" className="some-class" title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag type="green" className="some-class" title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag type="gray" className="some-class" title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="cool-gray"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="warm-gray"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="high-contrast"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="outline"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
    </>
  );
};

Dismissible.argTypes = {
  as: {
    table: {
      disable: true,
    },
  },
  filter: {
    table: {
      disable: true,
    },
  },
  selected: {
    table: {
      disable: true,
    },
  },
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
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};
