/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FormGroup from '../FormGroup';
import { render, screen } from '@testing-library/react';

describe('FormGroup', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <FormGroup className="test" legendText="legendtest" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should be set data-invalid when invalid prop is true', () => {
    const { container } = render(
      <FormGroup invalid={true} legendText="legendtest">
        FormGroup Test
      </FormGroup>
    );

    expect(container.firstChild).toHaveAttribute('data-invalid', '');
  });

  it('should render legendText', () => {
    render(
      <FormGroup legendId="legend-testid" legendText="legendtest">
        FormGroup Test
      </FormGroup>
    );

    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText('legendtest')).toBeInTheDocument();
  });

  it('should set the id for legend based on legendId', () => {
    render(
      <FormGroup legendId="legend-testid" legendText="legendtest">
        FormGroup Test
      </FormGroup>
    );

    expect(screen.getByText('legendtest')).toHaveAttribute(
      'id',
      'legend-testid'
    );
  });

  it('should display messageText if message is true', () => {
    render(
      <FormGroup
        legendId="legend-testid"
        legendText="legendtest"
        message={true}
        messageText="Message text">
        FormGroup Test
      </FormGroup>
    );

    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText('Message text')).toBeInTheDocument();
  });

  it('should not display the messageText if message is false', () => {
    render(
      <FormGroup
        legendId="legend-testid"
        legendText="legendtest"
        message={false}
        messageText="Message text">
        FormGroup Test
      </FormGroup>
    );

    expect(screen.queryByText('Message text')).not.toBeInTheDocument();
  });
});
