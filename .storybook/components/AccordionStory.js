import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Accordion from '../../components/Accordion';
import AccordionItem from '../../components/AccordionItem';

const props = {
  onHeadingClick: ({ isOpen }) => { console.log(`Is open: ${isOpen}`); }, // eslint-disable-line no-console
};

storiesOf('Accordion', module)
  .addWithInfo(
    '',
    `
      Accordions allow users to expand and collapse sections of content.
    `,
    () => (
      <Accordion>
        <AccordionItem title="Label" {...props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat.
        </AccordionItem>
        <AccordionItem title="Label with multiple words" open {...props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat.
        </AccordionItem>
        <AccordionItem title="Label" {...props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat.
        </AccordionItem>
        <AccordionItem title="Label" {...props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat.
        </AccordionItem>
      </Accordion>
    )
  );
