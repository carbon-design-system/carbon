/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import IconIndicator from '../index';

describe('IconIndicator', () => {
  it('should use a custom label', () => {
    render(<IconIndicator kind="failed" label="label" />);
    expect(screen.getByText('label')).toBeInTheDocument();
  });

  it('should update with size prop', () => {
    render(<IconIndicator kind="failed" label="label" size={20} />);
    expect(screen.getByText('label')).toHaveClass('cds--icon-indicator--20');
  });

  it('should update with kind prop', () => {
    render(<IconIndicator kind="pending" label="label" size={20} />);
    expect(document.querySelector('svg')).toHaveClass(
      'cds--icon-indicator--pending'
    );
  });

  it('should support a custom class name on the outermost element', () => {
    const { container } = render(
      <IconIndicator kind="failed" label="label" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should support a ref on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(
      <IconIndicator kind="failed" label="label" ref={ref} />
    );
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });

  describe('compact mode', () => {
    it('should render only icon when compact is true', () => {
      render(<IconIndicator kind="failed" label="Test Label" compact />);
      // Icon should be present
      expect(document.querySelector('svg')).toBeInTheDocument();
      // DefinitionTooltip trigger element should be present
      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass('cds--definition-term');
    });

    it('should render with tooltip trigger when compact is true', () => {
      const { container } = render(
        <IconIndicator kind="succeeded" label="Success" compact />
      );
      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass('cds--definition-term');
      expect(container.firstChild).toHaveClass('cds--icon-indicator');
    });

    it('should show label in tooltip on hover when compact is true', async () => {
      const user = userEvent.setup();
      render(<IconIndicator kind="pending" label="Pending Status" compact />);
      const trigger = screen.getByRole('button');

      // Hover over the trigger to open the tooltip
      await user.hover(trigger);

      // The DefinitionTooltip should have aria-describedby
      expect(trigger).toHaveAttribute('aria-describedby');
      const describedById = trigger.getAttribute('aria-describedby');
      const tooltipContent = document.getElementById(describedById);
      expect(tooltipContent).toHaveTextContent('Pending Status');
    });

    it('should render normally when compact is false', () => {
      render(
        <IconIndicator kind="failed" label="Test Label" compact={false} />
      );
      // Label should be visible in the DOM
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should apply custom className in compact mode', () => {
      const { container } = render(
        <IconIndicator
          kind="succeeded"
          label="Success"
          compact
          className="custom-compact"
        />
      );
      expect(container.firstChild).toHaveClass('custom-compact');
    });

    it('should support size prop in compact mode', () => {
      const { container } = render(
        <IconIndicator kind="failed" label="label" size={20} compact />
      );
      expect(container.firstChild).toHaveClass('cds--icon-indicator--20');
    });
  });
});
