/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import { mount } from 'enzyme';
import React from 'react';
import { Accordion, AccordionItem } from '../';

const { prefix } = settings;

describe('Accordion', () => {
  it('should render', () => {
    const wrapper = mount(
      <Accordion className="extra-class">
        <AccordionItem className="child" title="Heading A">
          Panel A
        </AccordionItem>
        <AccordionItem className="child" title="Heading B">
          Panel B{' '}
        </AccordionItem>
        <AccordionItem className="child" title="Heading C">
          Panel C
        </AccordionItem>
      </Accordion>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
