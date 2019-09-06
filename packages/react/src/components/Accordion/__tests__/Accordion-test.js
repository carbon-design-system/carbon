/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from 'enzyme';
import React from 'react';
import { render } from 'react-dom';
import { default as Accordion, AccordionItem } from '../';

describe('Accordion', () => {
  it('should render', () => {
    const wrapper = mount(
      <Accordion className="extra-class">
        <AccordionItem className="child" title="Heading A">
          Panel A
        </AccordionItem>
        <AccordionItem className="child" title="Heading B">
          Panel B
        </AccordionItem>
        <AccordionItem className="child" title="Heading C">
          Panel C
        </AccordionItem>
      </Accordion>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should have no AVT1 violations', async () => {
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    render(
      <Accordion className="extra-class">
        <AccordionItem className="child" title="Heading A">
          Panel A
        </AccordionItem>
        <AccordionItem className="child" title="Heading B">
          Panel B
        </AccordionItem>
        <AccordionItem className="child" title="Heading C">
          Panel C
        </AccordionItem>
      </Accordion>,
      mountNode
    );

    await expect(document).toHaveNoViolations();
    mountNode.parentNode.removeChild(mountNode);
  });
});
