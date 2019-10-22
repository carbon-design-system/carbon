/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
      <Accordion>
        <AccordionItem title="Heading A">Panel A</AccordionItem>
        <AccordionItem open>Panel B</AccordionItem>
        <AccordionItem />
      </Accordion>
    );

    await expect(document).toHaveNoViolations();
  });
});

describe('Accordion Item', () => {
  it('should render a title', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem title="Heading A" />
      </Accordion>
    );

    expect(getByText('Heading A')).not.toBeNull();
  });

  it('should show content when open is passed', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem open>content</AccordionItem>
      </Accordion>
    );

    expect(getByText('content')).toBeVisible();
  });

  it('should hides content when open is not passed', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem>content</AccordionItem>
      </Accordion>
    );

    expect(getByText('content')).not.toBeVisible();
  });

  it('should open and close when clicked', () => {
    const { getByText, getByRole } = render(
      <Accordion>
        <AccordionItem>content</AccordionItem>
      </Accordion>
    );

    fireEvent.click(getByRole('button'));
    expect(getByText('content')).toBeVisible();

    fireEvent.click(getByRole('button'));
    expect(getByText('content')).not.toBeVisible();
  });
});
