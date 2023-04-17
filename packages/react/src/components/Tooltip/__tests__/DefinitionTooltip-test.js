/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { DefinitionTooltip } from '../DefinitionTooltip';

describe('DefintiionTooltip', () => {
  it('should display onClick a defintion provided via prop', async () => {
    const definition = 'Uniform Resource Locator';
    render(<DefinitionTooltip definition={definition}>URL</DefinitionTooltip>);
    await userEvent.click(screen.getByText('URL'));
    expect(screen.getByText(definition)).toBeVisible();
  });

  it('should have a visible tooltip if `defaultOpen` is set to true', () => {
    const definition = 'test-definition';
    render(
      <DefinitionTooltip definition={definition} defaultOpen>
        term
      </DefinitionTooltip>
    );
    expect(screen.getByText(definition)).toBeVisible();
  });

  describe('Component API', () => {
    it('should apply additional props to the underlying button element', () => {
      const definition = 'Uniform Resource Locator';
      render(
        <DefinitionTooltip
          data-testid="test"
          definition={definition}
          className="tooltip-class">
          URL
        </DefinitionTooltip>
      );
      expect(screen.getByText('URL')).toHaveAttribute('data-testid', 'test');
    });

    it('should support a custom className with the `className` prop', () => {
      const definition = 'Uniform Resource Locator';
      const { container } = render(
        <DefinitionTooltip definition={definition} className="custom-class">
          URL
        </DefinitionTooltip>
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should support a custom id for the tooltip', () => {
      const id = 'test-id';
      const definition = 'test-definition';
      render(
        <DefinitionTooltip definition={definition} id={id}>
          term
        </DefinitionTooltip>
      );
      expect(document.getElementById(id)).toBeInTheDocument();
      expect(document.getElementById(id)).toHaveTextContent(definition);
    });

    it('should support a custom className for the tooltip trigger', () => {
      render(
        <DefinitionTooltip
          definition="test-definition"
          triggerClassName="custom-class">
          term
        </DefinitionTooltip>
      );
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });
});
