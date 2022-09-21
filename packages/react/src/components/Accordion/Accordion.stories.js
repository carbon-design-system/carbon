/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import {
  default as Accordion,
  AccordionItem,
  AccordionSkeleton,
} from '../Accordion';
import Button from '../Button';
import mdx from './Accordion.mdx';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Accordion>
    <AccordionItem title="Section 1 title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem title="Section 2 title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem title="Section 3 title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem title="Section 4 title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
  </Accordion>
);

export const Skeleton = (args) => (
  <AccordionSkeleton open count={4} {...args} />
);

Skeleton.decorators = [
  (story) => <div style={{ width: '500px' }}>{story()}</div>,
];

export const Playground = (args) => (
  <Accordion {...args}>
    <AccordionItem title="Section 1 title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem title="Section 2 title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem title="Section 3 title">
      <Button>This is a button.</Button>
    </AccordionItem>
    <AccordionItem
      title={
        <span>
          Section 4 title (<em>the title can be a node</em>)
        </span>
      }>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
  </Accordion>
);

Playground.argTypes = {
  align: {
    options: ['start', 'end'],
    control: { type: 'select' },
  },
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
    defaultValue: false,
  },
  isFlush: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
};

Skeleton.argTypes = {
  align: {
    options: ['start', 'end'],
    control: { type: 'select' },
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  disabled: {
    control: false,
  },
  isFlush: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  size: {
    control: false,
  },
};
