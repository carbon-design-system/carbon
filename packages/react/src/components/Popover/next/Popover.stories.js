/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import React from 'react';
import { Popover, PopoverContent } from '../../Popover';
import mdx from './Popover.mdx';

export default {
  title: 'Experimental/unstable_Popover',
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
  const { align, tip, highContrast, light, open } = props;
  return (
    <Popover
      align={align}
      tip={tip}
      highContrast={highContrast}
      light={light}
      open={open}>
      <PopoverContent className="p-3">Sample content</PopoverContent>
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
  tip: {
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
  light: {
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
    (story) => (
      <div className="mt-9 flex justify-center">
        <div className="position-relative display-inline-block">
          <div className="playground-trigger" />
          {story()}
        </div>
      </div>
    ),
  ],
};
