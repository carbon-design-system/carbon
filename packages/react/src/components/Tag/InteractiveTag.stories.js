/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as InteractiveTag } from './InteractiveTag';
import TagSkeleton from './Tag.Skeleton';
import { Asleep } from '@carbon/icons-react';
export default {
  title: 'Components/Tag/InteractiveTag',
  component: InteractiveTag,
};

export const ReadOnly = () => {
  return (
    <>
      <InteractiveTag className="some-class" type="red" title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag
        className="some-class"
        type="magenta"
        title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag className="some-class" type="purple" title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag className="some-class" type="blue" title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag className="some-class" type="cyan" title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag className="some-class" type="teal" title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag className="some-class" type="green" title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag className="some-class" type="gray" title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag
        className="some-class"
        type="cool-gray"
        title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag
        className="some-class"
        type="warm-gray"
        title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag
        className="some-class"
        type="high-contrast"
        title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
      <InteractiveTag
        className="some-class"
        type="outline"
        title="Clear Filter">
        {'Tag content'}
      </InteractiveTag>
    </>
  );
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
  return (
    <InteractiveTag
      interactivetype="operational"
      className="some-class"
      title="Clear Filter">
      {'Tag content'}
    </InteractiveTag>
  );
};

export const Playground = (args) => {
  return <InteractiveTag {...args}>{'Tag content'}</InteractiveTag>;
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
    options: ['read-only', 'selectable', 'operational', 'dismissible'],
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
  id: {
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
