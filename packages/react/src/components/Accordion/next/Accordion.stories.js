/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, select } from '@storybook/addon-knobs';
import {
  default as Accordion,
  AccordionItem,
  AccordionSkeleton,
} from '../../Accordion';
import Button from '../../Button';
import mdx from '../Accordion.mdx';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    title: {
      control: { type: 'text' },
    },
    disabledItem: {
      control: { type: 'boolean' },
    },
    open: {
      control: { type: 'boolean' },
    },
  },
  args: {
    children: {},
    className: '',
    disabled: false,
    disabledItem: false,
    open: false,
    title: 'Section 1 title',
  },
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

const props = {
  onClick: action('onClick'),
  onHeadingClick: action('onHeadingClick'),
};

export const AccordionStory = (args) => (
  <Accordion {...args}>
    <AccordionItem title={args.title} open={args.open} {...props}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem title="Section 2 title" {...props}>
      <Button>This is a button.</Button>
    </AccordionItem>
    <AccordionItem
      title="Section 3 title"
      disabled={args.disabledItem}
      {...props}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem
      title={
        <span>
          Section 4 title (<em>the title can be a node</em>)
        </span>
      }
      {...props}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
  </Accordion>
);

AccordionStory.storyName = 'Accordion';

export const Skeleton = () => <AccordionSkeleton count={4} />;

Skeleton.decorators = [
  (story) => <div style={{ width: '500px' }}>{story()}</div>,
];

export const SkeletonPlayground = () => (
  <div style={{ width: '500px' }}>
    <AccordionSkeleton
      align={select(
        'Accordion heading alignment (align)',
        ['start', 'end'],
        'end'
      )}
      open={boolean('Show first item opened (open)', true)}
      count={number('Set number of items (count)', 4)}
    />
  </div>
);
