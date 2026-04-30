/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Button from '../../Button';
import React from 'react';
import { default as Accordion, AccordionItem } from '../';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Accordion', () => {
  it('should render', () => {
    const { asFragment } = render(
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

    expect(asFragment()).toMatchSnapshot();
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
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

      await expect(screen.getByText('Heading A')).toHaveNoAxeViolations();

      // click to open
      await userEvent.click(screen.getByText('Heading A'));

      // test when open
      await expect(screen.getByText('Heading A')).toHaveNoAxeViolations();
    });

    it('should have no Accessibility Checker violations', async () => {
      render(
        <main>
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
        </main>
      );

      await expect(screen.getByText('Heading A')).toHaveNoACViolations(
        'Accordion'
      );

      // click to open
      await userEvent.click(screen.getByText('Heading A'));

      // test when open
      await expect(screen.getByText('Heading A')).toHaveNoACViolations(
        'Opened Accordion'
      );
    });
  });

  describe('basic keyboard accessibility testing', () => {
    it('should receive focus', async () => {
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

      await userEvent.tab();
      expect(screen.getAllByRole('button')[0]).toHaveFocus();
    });

    it('should open with enter', async () => {
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

      // userEvent.type clicks the element passed before typing without skipClick option
      // see: https://github.com/testing-library/user-event#typeelement-text-options
      await userEvent.type(screen.getByText('Heading A'), '{enter}', {
        skipClick: true,
      });

      expect(screen.getByText('Panel A')).toBeInTheDocument();
    });

    it('should open with spacebar', async () => {
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

      // userEvent.type clicks the element passed before typing without skipClick option
      // see: https://github.com/testing-library/user-event#typeelement-text-options
      await userEvent.type(screen.getByText('Heading A'), '{Space}', {
        skipClick: true,
      });

      expect(screen.getByText('Panel A')).toBeInTheDocument();
    });
  });

  describe('Flush align', () => {
    it('should align to the left if prop isFlush is passed', () => {
      render(
        <Accordion data-testid="accordion" isFlush>
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

      expect(screen.getByTestId('accordion')).toHaveClass(
        'cds--accordion--flush'
      );
    });

    it('should not align to left if align="start"', () => {
      render(
        <Accordion data-testid="accordion-2" isFlush align="start">
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

      expect(screen.getByTestId('accordion-2')).not.toHaveClass(
        'cds--accordion--flush'
      );
    });
  });

  describe('Expand/Collapse All', () => {
    const ControlledAccordion = () => {
      const [expandAll, setExpandAll] = React.useState(false);
      return (
        <>
          <Button onClick={() => setExpandAll(true)}>
            Click to expand all
          </Button>
          <Button
            onClick={() => {
              expandAll || expandAll === null
                ? setExpandAll(false)
                : setExpandAll(null);
            }}>
            Click to collapse all
          </Button>

          <Accordion className="extra-class">
            <AccordionItem className="child" title="Heading A" open={expandAll}>
              Panel A
            </AccordionItem>
            <AccordionItem className="child" title="Heading B" open={expandAll}>
              Panel B
            </AccordionItem>
            <AccordionItem className="child" title="Heading C" open={expandAll}>
              Panel C
            </AccordionItem>
          </Accordion>
        </>
      );
    };

    it('should expand All on click to button', async () => {
      render(<ControlledAccordion />);

      await userEvent.click(screen.getByText('Click to expand all'));

      // Check if the class `cds--accordion__item--active` is added to all items
      const items = screen.getAllByRole('listitem');
      items.forEach((item) => {
        expect(item).toHaveClass('cds--accordion__item--active');
      });
    });

    it('should Collapse All on click to button', async () => {
      render(<ControlledAccordion />);

      await userEvent.click(screen.getByText('Click to expand all'));

      await userEvent.click(screen.getByText('Click to collapse all'));

      // Check if the class `cds--accordion__item--active` is removed from all items
      const items = screen.getAllByRole('listitem');
      items.forEach((item) => {
        expect(item).not.toHaveClass('cds--accordion__item--active');
      });
    });
  });
  describe('Ordered List', () => {
    it('should be an ol if prop ordered is passed as true', () => {
      const { container } = render(
        <Accordion data-testid="accordion" ordered={true}>
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
      const ol = container.querySelector('ol');
      expect(ol).toBeInTheDocument();
      const ul = container.querySelector('ul');
      expect(ul).not.toBeInTheDocument();
    });

    it('should be a ul if prop ordered is passed as false', () => {
      const { container } = render(
        <Accordion data-testid="accordion" ordered={false}>
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
      const ol = container.querySelector('ol');
      expect(ol).not.toBeInTheDocument();
      const ul = container.querySelector('ul');
      expect(ul).toBeInTheDocument();
    });
  });
});
