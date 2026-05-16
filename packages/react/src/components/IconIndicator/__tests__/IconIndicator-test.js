/**
 * Copyright IBM Corp. 2016, 2023
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
      // Should have the trigger class for tooltip
      const trigger = document.querySelector('.cds--icon-indicator--trigger');
      expect(trigger).toBeInTheDocument();
    });

    it('should render with DefinitionTooltip when compact is true', () => {
      const { container } = render(
        <IconIndicator kind="succeeded" label="Success" compact />
      );
      // Should have the trigger class for tooltip
      const trigger = container.querySelector('.cds--icon-indicator--trigger');
      expect(trigger).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('cds--icon-indicator');
    });

    it('should show label in tooltip on hover when compact is true', async () => {
      const user = userEvent.setup();
      render(<IconIndicator kind="pending" label="Pending Status" compact />);

      const trigger = document.querySelector('.cds--icon-indicator--trigger');
      expect(trigger).toBeInTheDocument();

      // Hover over the trigger
      await user.hover(trigger);

      // The tooltip content should appear
      expect(await screen.findByText('Pending Status')).toBeInTheDocument();
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
      expect(container.firstChild).toHaveClass('cds--icon-indicator');
    });

    it('should support size prop in compact mode', () => {
      const { container } = render(
        <IconIndicator kind="failed" label="label" size={20} compact />
      );
      expect(container.firstChild).toHaveClass('cds--icon-indicator--20');
    });

    it('should support ref in compact mode', () => {
      const ref = jest.fn();
      const { container } = render(
        <IconIndicator kind="succeeded" label="label" compact ref={ref} />
      );
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });
  });

  describe('icon kinds', () => {
    const kinds = [
      'failed',
      'caution-major',
      'caution-minor',
      'undefined',
      'succeeded',
      'normal',
      'in-progress',
      'incomplete',
      'not-started',
      'pending',
      'unknown',
      'informative',
    ];

    kinds.forEach((kind) => {
      it(`should render ${kind} icon`, () => {
        render(<IconIndicator kind={kind} label="test" />);
        const svg = document.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass(`cds--icon-indicator--${kind}`);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle default size of 16', () => {
      const { container } = render(
        <IconIndicator kind="succeeded" label="label" />
      );
      // Should not have the 20 size class
      expect(container.firstChild).not.toHaveClass('cds--icon-indicator--20');
    });

    it('should render icon with size 16', () => {
      render(<IconIndicator kind="succeeded" label="label" size={16} />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render both icon and label in non-compact mode', () => {
      render(<IconIndicator kind="succeeded" label="Success Label" />);
      expect(screen.getByText('Success Label')).toBeInTheDocument();
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('should apply kind-specific class to icon', () => {
      render(<IconIndicator kind="caution-major" label="Warning" />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveClass('cds--icon-indicator--caution-major');
    });

    it('should return null for invalid kind', () => {
      const { container } = render(
        <IconIndicator kind="invalid-kind" label="label" />
      );
      expect(container.firstChild).toBeNull();
    });
  });
});
