/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Tooltip } from '../../next';
import { DefinitionTooltip } from '../../next/DefinitionTooltip';

describe('Tooltip', () => {
  it('should support a custom className with the `className` prop', () => {
    const { container } = render(
      <Tooltip className="test" label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should apply additional props to the outermost element', () => {
    const { container } = render(
      <Tooltip data-testid="test" label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support initially showing the tooltip with `defaultOpen`', () => {
    render(
      <Tooltip defaultOpen label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(screen.getByLabelText('Close')).toBeVisible();
  });

  it('should support labeling an element by its tooltip', () => {
    render(
      <Tooltip label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(screen.getByText('X')).toHaveAttribute('aria-labelledby');
  });

  it('should support describing an element by its tooltip', () => {
    render(
      <Tooltip description="test description">
        <button type="button">test</button>
      </Tooltip>
    );
    expect(screen.getByText('test')).toHaveAttribute('aria-describedby');
  });
});

describe('DefintiionTooltip', () => {
  it('should support a custom className with the `className` prop', () => {
    const definition = 'Uniform Resource Locator';
    render(
      <DefinitionTooltip definition={definition} className="tooltip-class">
        URL
      </DefinitionTooltip>
    );
    expect(screen.getByText('URL')).toHaveClass('tooltip-class');
  });

  it('should apply additional props to the outermost element', () => {
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

  it('should display onClick a defintion provided via prop', () => {
    const definition = 'Uniform Resource Locator';
    render(
      <DefinitionTooltip
        data-testid="test"
        definition={definition}
        className="tooltip-class">
        URL
      </DefinitionTooltip>
    );
    userEvent.click(screen.getByText('URL'));
    expect(screen.getByText(definition)).toHaveTextContent(definition);
  });
});
