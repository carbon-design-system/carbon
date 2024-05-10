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
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { Popover, PopoverContent } from '../Popover';
import mdx from './InteractiveTag.mdx';
import './storyInteractiveTag.scss';

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
      <SelectableTag
        renderIcon={Asleep}
        text="Tag content with a long text description"
        className="some-class"
        {...args}
      />
      <SelectableTag
        renderIcon={Asleep}
        text="Tag content"
        className="some-class"
        {...args}
      />
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <OperationalTag
          type="red"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content with a long text description"
          {...args}
        />
        <OperationalTag
          type="magenta"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="purple"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="blue"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="cyan"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="teal"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="green"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="gray"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="cool-gray"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="warm-gray"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
      </div>

      <h4>Interactive examples</h4>
      <div
        id="operational-tag"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '1rem',
        }}>
        <Toggletip>
          <ToggletipButton label="Tag content" tabIndex={-1} as="div">
            <OperationalTag
              renderIcon={Asleep}
              text="Tag content"
              className="some-class"
              {...args}
            />
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
            text="Tag content"
            className="some-class"
            {...args}
          />
          <PopoverContent>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
              }}>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 1 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 2 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 3 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 4 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
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
  // type: {
  //   options: ['red', 'magenta', 'blue'],
  //   control: {
  //     type: 'select',
  //   },
  // },
};

export const Dismissible = (args) => {
  return (
    <>
      <DismissibleTag
        type="red"
        className="some-class"
        renderIcon={Asleep}
        text="Tag content with a long text description"
        {...args}
      />
      <DismissibleTag
        type="magenta"
        className="some-class"
        text="Tag content"
        renderIcon={Asleep}
        {...args}
      />
      <DismissibleTag
        type="purple"
        className="some-class"
        text="Tag content"
        renderIcon={Asleep}
        {...args}
      />
      <DismissibleTag
        type="blue"
        className="some-class"
        renderIcon={Asleep}
        text="Tag content"
        {...args}
      />
      <DismissibleTag
        type="cyan"
        className="some-class"
        renderIcon={Asleep}
        text="Tag content"
        {...args}
      />
      <DismissibleTag
        type="teal"
        className="some-class"
        renderIcon={Asleep}
        text="Tag content"
        {...args}
      />
      <DismissibleTag
        type="green"
        className="some-class"
        renderIcon={Asleep}
        text="Tag content"
        {...args}
      />
      <DismissibleTag
        type="gray"
        className="some-class"
        renderIcon={Asleep}
        text="Tag content"
        {...args}
      />
      <DismissibleTag
        type="cool-gray"
        className="some-class"
        renderIcon={Asleep}
        text="Tag content"
        {...args}
      />
      <DismissibleTag
        type="warm-gray"
        className="some-class"
        renderIcon={Asleep}
        text="Tag content"
        {...args}
      />
      <DismissibleTag
        type="high-contrast"
        className="some-class"
        renderIcon={Asleep}
        text="Tag content"
        {...args}
      />
      <DismissibleTag
        type="outline"
        className="some-class"
        renderIcon={Asleep}
        text="Tag content"
        {...args}
      />
    </>
  );
};

Dismissible.args = {
  disabled: false,
  size: 'md',
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
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};
