/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../../../scss/components/accordion/_index.scss';
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

      // click to open
      await userEvent.click(screen.getByText('Click to expand all'));

      // test when open
      expect(screen.getByText('Panel A')).toBeVisible();
      expect(screen.getByText('Panel B')).toBeVisible();
      expect(screen.getByText('Panel C')).toBeVisible();
    });

    it('should Collapse All on click to button', async () => {
      render(<ControlledAccordion />);

      // click to close
      await userEvent.click(screen.getByText('Click to collapse all'));

      // test when close
      expect(screen.getByText('Panel A')).not.toBeVisible();
      expect(screen.getByText('Panel B')).not.toBeVisible();
      expect(screen.getByText('Panel C')).not.toBeVisible();
    });
  });
});
