/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { default as Accordion, AccordionItem } from '../';

describe('Accordion', () => {
  describe('automated accessibility tests', () => {
    it('should have no axe violations', async () => {
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

      await expect(document).toHaveNoAxeViolations();
    });
  });

  describe('Component API', () => {
    it('should support a custom class name on the root node', () => {
      const { container } = render(<Accordion className="test" />);
      expect(container.firstChild).toHaveClass('test');
    });

    it('should spread extra props on the root node', () => {
      const { getByTestId } = render(<Accordion data-testid="test" />);
      expect(getByTestId('test')).toBeInTheDocument();
    });

    it('should support accordion title and chevron alignment with `align`', () => {
      const { container: start } = render(<Accordion align="start" />);
      expect(start.firstChild.className).toEqual(
        expect.stringContaining('--accordion--start')
      );

      const { container: end } = render(<Accordion align="end" />);
      expect(end.firstChild.className).toEqual(
        expect.stringContaining('--accordion--end')
      );

      // By default it should use `end`
      const { container } = render(<Accordion />);
      expect(container.firstChild.className).toEqual(
        expect.stringContaining('--accordion--end')
      );
    });

    it.todo('align');
    it.todo('children');
    it.todo('object spread');
    it.todo('ref?');
  });
});
