/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Accordion from '../Accordion';
import AccordionItem from '../AccordionItem';
import Select from '../Select';
import SelectItem from '../SelectItem';
import AccordionSkeleton from '../Accordion/Accordion.Skeleton';

const props = {
  onHeadingClick: ({ isOpen }) => {
    console.log(`Is open: ${isOpen}`);
  }, // eslint-disable-line no-console
};

storiesOf('Accordion', module)
  .addWithInfo(
    'Default',
    `
      Accordions allow users to expand and collapse sections of content.
    `,
    () => (
      <Accordion>
        <AccordionItem title="Section 1 title" {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 2 title" open {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 3 title" {...props}>
          <Select
            onChange={action('onChange')}
            id="select-1"
            defaultValue="placeholder-item">
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Choose an option"
            />
            <SelectItem value="option-1" text="Option 1" />
            <SelectItem value="option-2" text="Option 2" />
            <SelectItem value="option-3" text="Option 3" />
          </Select>
        </AccordionItem>
        <AccordionItem
          title={
            <h4>
              Section 4 title (<em>the title can be a node</em>)
            </h4>
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
    )
  )
  .addWithInfo(
    'skeleton',
    `
    Placeholder skeleton state to use when content is loading.
  `,
    () => (
      <div style={{ width: '500px' }}>
        <AccordionSkeleton />
      </div>
    )
  );
