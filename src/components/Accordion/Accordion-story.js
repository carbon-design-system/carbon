/* eslint-disable no-console */

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import Accordion from '../Accordion';
import AccordionItem from '../AccordionItem';
import Select from '../Select';
import SelectItem from '../SelectItem';

const props = {
  onHeadingClick: ({ isOpen }) => {
    console.log(`Is open: ${isOpen}`);
  }, // eslint-disable-line no-console
};

storiesOf('Accordion', module).addWithInfo(
  'Default',
  `
      Accordions allow users to expand and collapse sections of content.
    `,
  () =>
    <Accordion>
      <AccordionItem title="Label" {...props}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip
          ex ea commodo consequat.
        </p>
      </AccordionItem>
      <AccordionItem title="Label with multiple words" open {...props}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip
          ex ea commodo consequat.
        </p>
      </AccordionItem>
      <AccordionItem title="Label with form" {...props}>
        <Select onChange={action('onChange')} id="select-1" defaultValue="placeholder-item">
          <SelectItem disabled hidden value="placeholder-item" text="Pick an option" />
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
          <SelectItem value="option-3" text="Option 3" />
        </Select>
      </AccordionItem>
      <AccordionItem title="Label" {...props}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip
          ex ea commodo consequat.
        </p>
      </AccordionItem>
    </Accordion>
);
