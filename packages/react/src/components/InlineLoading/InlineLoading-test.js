/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import InlineLoading from '../InlineLoading';
import { render, screen } from '@testing-library/react';

describe('InlineLoading', () => {
  it('should pass in extra classes that are passed via className', () => {
    render(<InlineLoading className="custom-class" data-testid="loading-1" />);

    expect(screen.getByTestId('loading-1')).toHaveClass('custom-class');
  });

  it('should render a loader by default', () => {
    render(<InlineLoading />);

    expect(screen.getByTitle('loading')).toBeInTheDocument();
  });

  it('should render a loader if the status is inactive', () => {
    render(<InlineLoading status="inactive" />);

    expect(screen.getByTitle('not loading')).toBeInTheDocument();
  });

  it('should render the success state if status is finished', () => {
    render(<InlineLoading status="finished" />);

    expect(document.querySelector('svg')).toHaveClass(
      'cds--inline-loading__checkmark-container'
    );
  });

  it('should render the error state if status is error', () => {
    render(<InlineLoading status="error" />);

    expect(document.querySelector('svg')).toHaveClass(
      'cds--inline-loading--error'
    );
  });

  it('should not render any text by default', () => {
    render(<InlineLoading />);

    expect(
      document.querySelector('.cds--inline-loading__text')
    ).not.toBeInTheDocument();
  });

  it('should render text when the description prop is passed', () => {
    render(<InlineLoading description="Loading" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should call the onSuccess prop after a delay', () => {
    jest.useFakeTimers();
    const onSuccess = jest.fn();

    render(<InlineLoading status="finished" onSuccess={onSuccess} />);

    jest.runAllTimers();
    expect(onSuccess).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('should allow users to override the onSuccess timeout', () => {
    jest.useFakeTimers();
    const onSuccess = jest.fn();

    render(
      <InlineLoading
        status="finished"
        onSuccess={onSuccess}
        successDelay={2500}
      />
    );

    jest.runAllTimers();
    expect(onSuccess).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
