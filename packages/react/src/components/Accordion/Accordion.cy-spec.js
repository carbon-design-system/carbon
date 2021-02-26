/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/components/accordion/_accordion.scss';

import React from 'react';
import { mount } from '@cypress/react';
import { default as Accordion, AccordionItem } from '../Accordion';

describe('Accordion', () => {
  it('should work', () => {
    mount(
      <Accordion>
        <AccordionItem title="Section 1">Panel 1</AccordionItem>
        <AccordionItem title="Section 2">Panel 2</AccordionItem>
        <AccordionItem title="Section 3">Panel 3</AccordionItem>
      </Accordion>
    );
  });
});
