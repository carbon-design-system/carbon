/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import {
  default as Accordion,
  AccordionItem,
  AccordionSkeleton,
} from '../Accordion';
import Button from '../Button';

const props = {
  onClick: action('onClick'),
  onHeadingClick: action('onHeadingClick'),
};

storiesOf('Accordion', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <Accordion
        align={select(
          'Accordion heading alignment (align)',
          ['start', 'end'],
          'end'
        )}>
        <AccordionItem
          title={text('The title (title)', 'Section 1 title')}
          open={boolean('Open the section (open)', false)}
          {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 2 title" {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 3 title" {...props}>
          <Button>This is a button.</Button>
        </AccordionItem>
        <AccordionItem
          title={
            <span>
              Section 4 title (<em>the title can be a node</em>)
            </span>
          }
          {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
      </Accordion>
    ),
    {
      info: {
        text: `
          Accordions allow users to expand and collapse sections of content.
        `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
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
    ),
    {
      info: {
        text: `
          Accordions allow users to expand and collapse sections of content.
        `,
      },
    }
  );
