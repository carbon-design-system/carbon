/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { default as Tag } from '.';
import { default as SelectableTag } from './SelectableTag';
import { default as OperationalTag } from './OperationalTag';
import { default as DismissibleTag } from './DismissibleTag';
import { Asleep } from '@carbon/icons-react';
import { Tooltip } from '../Tooltip';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { Popover, PopoverContent } from '../Popover';
import mdx from './InteractiveTag.mdx';
import { usePrefix } from '../../internal/usePrefix';

export default {
  title: 'Experimental/unstable__InteractiveTag',
  component: SelectableTag,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Selectable = (args) => {
  return (
    <>
      <SelectableTag size="sm" className="some-class">
        {'Tag content'}
      </SelectableTag>
      <SelectableTag size="sm" renderIcon={Asleep} className="some-class">
        {'Tag content'}
      </SelectableTag>
      <br />
      <SelectableTag className="some-class">{'Tag content'}</SelectableTag>
      <SelectableTag renderIcon={Asleep} className="some-class">
        {'Tag content'}
      </SelectableTag>
      <br />
      <SelectableTag size="lg" className="some-class">
        {'Tag content'}
      </SelectableTag>
      <SelectableTag size="lg" renderIcon={Asleep} className="some-class">
        {'Tag content'}
      </SelectableTag>
      <hr />
      <SelectableTag className="some-class" {...args}>
        {'Tag content'}
      </SelectableTag>
      <SelectableTag renderIcon={Asleep} className="some-class" {...args}>
        {'Tag content'}
      </SelectableTag>
    </>
  );
};

Selectable.args = {
  disabled: false,
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
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};

export const Operational = (args) => {
  const prefix = usePrefix();
  const [open, setOpen] = useState(false);

  return (
    <>
      <OperationalTag type="red" size="sm">
        {'Tag content'}
      </OperationalTag>
      <OperationalTag
        size="sm"
        type="red"
        className="some-class"
        renderIcon={Asleep}>
        {'Tag content'}
      </OperationalTag>
      <br />
      <OperationalTag type="red">{'Tag content'}</OperationalTag>
      <OperationalTag type="red" className="some-class" renderIcon={Asleep}>
        {'Tag content'}
      </OperationalTag>
      <br />
      <OperationalTag type="red" size="lg">
        {'Tag content'}
      </OperationalTag>
      <OperationalTag
        size="lg"
        type="red"
        className="some-class"
        renderIcon={Asleep}>
        {'Tag content'}
      </OperationalTag>
      <hr />

      <div style={{ marginBottom: '1rem' }}>
        <OperationalTag type="red" className="some-class" {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="magenta" className="some-class" {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="purple" className="some-class" {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="blue" className="some-class" {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="cyan" className="some-class" {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="teal" className="some-class" {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="green" className="some-class" {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="gray" className="some-class" {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="cool-gray" className="some-class" {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="warm-gray" className="some-class" {...args}>
          {'Tag content'}
        </OperationalTag>

        <hr />

        <OperationalTag
          type="red"
          className="some-class"
          renderIcon={Asleep}
          {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="magenta"
          className="some-class"
          renderIcon={Asleep}
          {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="purple"
          className="some-class"
          renderIcon={Asleep}
          {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="blue"
          className="some-class"
          renderIcon={Asleep}
          {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="cyan"
          className="some-class"
          renderIcon={Asleep}
          {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="teal"
          className="some-class"
          renderIcon={Asleep}
          {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="green"
          className="some-class"
          renderIcon={Asleep}
          {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="gray"
          className="some-class"
          renderIcon={Asleep}
          {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="cool-gray"
          className="some-class"
          renderIcon={Asleep}
          {...args}>
          {'Tag content'}
        </OperationalTag>
        <OperationalTag
          type="warm-gray"
          className="some-class"
          renderIcon={Asleep}
          {...args}>
          {'Tag content'}
        </OperationalTag>
      </div>
      <hr />

      <h4>Interactive examples</h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '0.5rem',
        }}>
        <Tooltip
          label="View more"
          align="bottom"
          className={`${prefix}--icon-tooltip`}>
          <OperationalTag className="some-class" {...args}>
            {'Tag content'}
          </OperationalTag>
        </Tooltip>

        <Toggletip>
          <ToggletipButton
            label="Additional information"
            tabIndex={-1}
            as="div">
            <OperationalTag
              renderIcon={Asleep}
              className="some-class"
              {...args}>
              {'Tag content'}
            </OperationalTag>
          </ToggletipButton>
          <ToggletipContent>
            <div style={{ lineHeight: 0 }}>
              <p>Tag 1 name</p>
              <p>Tag 2 name</p>
              <p>Tag 3 name</p>
              <p>Tag 4 name</p>
              <p>Tag 5 name</p>
            </div>
          </ToggletipContent>
        </Toggletip>

        <Popover open={open}>
          <OperationalTag
            onClick={() => {
              setOpen(!open);
            }}
            renderIcon={Asleep}
            className="some-class"
            {...args}>
            {'Tag content'}
          </OperationalTag>
          <PopoverContent className="p-3">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Tag type="blue" className="some-class">
                {'Tag 1 name'}
              </Tag>
              <Tag type="blue" className="some-class">
                {'Tag 2 name'}
              </Tag>
              <Tag type="blue" className="some-class">
                {'Tag 3 name'}
              </Tag>
              <Tag type="blue" className="some-class">
                {'Tag 4 name'}
              </Tag>
              <Tag type="blue" className="some-class">
                {'Tag 5 name'}
              </Tag>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

Operational.args = {
  disabled: false,
  size: 'md',
};

Operational.argTypes = {
  id: {
    control: false,
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
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
    control: false,
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};

export const Dismissible = (args) => {
  return (
    <>
      <Tag type="red" size="sm">
        {'Tag content'}
      </Tag>
      <DismissibleTag
        size="sm"
        type="red"
        className="some-class"
        title="Clear Filter"
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        size="sm"
        type="red"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <br />
      <Tag type="red">{'Tag content'}</Tag>
      <DismissibleTag
        type="red"
        className="some-class"
        title="Clear Filter"
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag type="red" className="some-class" title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <br />
      <Tag type="red" size="lg">
        {'Tag content'}
      </Tag>
      <DismissibleTag
        size="lg"
        type="red"
        className="some-class"
        title="Clear Filter"
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        size="lg"
        type="red"
        className="some-class"
        title="Clear Filter">
        {'Tag content'}
      </DismissibleTag>
      <hr />
      <DismissibleTag
        type="red"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="magenta"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="purple"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="blue"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="cyan"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="teal"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="green"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="gray"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="cool-gray"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="warm-gray"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="high-contrast"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="outline"
        className="some-class"
        title="Clear Filter"
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <hr />

      <DismissibleTag
        type="red"
        className="some-class"
        title="Clear Filter"
        renderIcon={Asleep}
        {...args}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="magenta"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="purple"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="blue"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="cyan"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="teal"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="green"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="gray"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="cool-gray"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="warm-gray"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="high-contrast"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
      <DismissibleTag
        type="outline"
        className="some-class"
        title="Clear Filter"
        {...args}
        renderIcon={Asleep}>
        {'Tag content'}
      </DismissibleTag>
    </>
  );
};

// Dismissible.args = {
//   disabled: false,
//   size: 'md',
// };

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
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};
