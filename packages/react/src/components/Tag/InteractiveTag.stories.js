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

export default {
  title: 'Experimental/unstable__InteractiveTag',
  component: SelectableTag,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Selectable = () => {
  return (
    <>
      <SelectableTag className="some-class">{'Tag content'}</SelectableTag>
      <SelectableTag renderIcon={Asleep} className="some-class">
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
        <OperationalTag type="red" className="some-class">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="magenta" className="some-class">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="purple" className="some-class">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="blue" className="some-class">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="cyan" className="some-class">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="teal" className="some-class">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="green" className="some-class">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="gray" className="some-class">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="cool-gray" className="some-class">
          {'Tag content'}
        </OperationalTag>
        <OperationalTag type="warm-gray" className="some-class">
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
          <OperationalTag className="some-class">
            {'Tag content'}
          </OperationalTag>
        </Tooltip>

        <Toggletip>
          <ToggletipButton
            label="Additional information"
            tabIndex={-1}
            as="div">
            <OperationalTag renderIcon={Asleep} className="some-class">
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
            className="some-class">
            {'Tag content'}
          </OperationalTag>
          <PopoverContent className="p-3">
            <br />
            <Tag type="blue" className="some-class">
              {'Tag 1 name'}
            </Tag>
            <br />
            <Tag type="blue" className="some-class">
              {'Tag 2 name'}
            </Tag>
            <br />
            <Tag type="blue" className="some-class">
              {'Tag 3 name'}
            </Tag>
            <br />
            <Tag type="blue" className="some-class">
              {'Tag 4 name'}
            </Tag>
            <br />
            <Tag type="blue" className="some-class">
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
