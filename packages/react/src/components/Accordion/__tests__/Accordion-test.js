/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { default as Accordion, AccordionItem } from '../';

describe('Accordion', () => {
  it('should accept a custom className', () => {
    const { container } = render(<Accordion className="class-test" />);
    expect(container.firstChild).toHaveClass('class-test');
  });

  it('should accept custom attributes', () => {
    const { container } = render(<Accordion data-prop="accordion" />);
    expect(container.firstChild).toHaveAttribute('data-prop');
  });

  it('should have no AVT1 violations', async () => {
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
      </Accordion>
    );

    await expect(document).toHaveNoViolations();
  });
});
