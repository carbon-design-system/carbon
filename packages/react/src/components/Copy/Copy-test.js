/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Copy from '../Copy';
import { Copy as CopyIcon } from '@carbon/icons-react';

jest.useFakeTimers();

describe('Copy', () => {
  it('should set tabIndex if one is passed via props', () => {
    render(
      <Copy
        aria-label="Copy button"
        title="Copy title"
        //eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex={2}
        data-testid="copy-button-1">
        <CopyIcon />
      </Copy>
    );
    expect(screen.getByTestId('copy-button-1')).toHaveAttribute(
      'tabindex',
      '2'
    );
  });

  it('should add extra classes passed via className', () => {
    render(
      <Copy
        className="extra-class"
        aria-label="Copy button"
        title="Copy title"
        data-testid="copy-button-2">
        <CopyIcon />
      </Copy>
    );

    expect(screen.getByTestId('copy-button-2')).toHaveClass('extra-class');
  });
});

describe('Button props', () => {
  it('should disable button if disabled prop is passed', () => {
    render(
      <Copy
        aria-label="Copy button"
        title="Copy title"
        data-testid="copy-button-3"
        disabled>
        <CopyIcon />
      </Copy>
    );

    expect(screen.getByTestId('copy-button-3')).toHaveAttribute('disabled');
  });

  it('should call the click handler', () => {
    const onClick = jest.fn();
    render(
      <Copy
        aria-label="Copy button"
        title="Copy title"
        data-testid="copy-button-4"
        onClick={onClick}>
        <CopyIcon />
      </Copy>
    );

    const button = screen.getByTestId('copy-button-4');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Feedback', () => {
  it('should make the feedback visible for a limited amount of time', () => {
    render(
      <Copy
        aria-label="Copy button"
        title="Copy title"
        data-testid="copy-button-5">
        <CopyIcon />
      </Copy>
    );

    const button = screen.getByTestId('copy-button-5');
    userEvent.click(button);

    expect(button).toHaveClass('cds--copy-btn--animating');
    act(() => {
      jest.runAllTimers();
      fireEvent.animationEnd(screen.getByTestId('copy-button-5'), {
        animationName: 'hide-feedback',
      });
    });
    expect(button).not.toHaveClass('cds--copy-btn--animating');
  });

  it('should be able to specify the feedback message', () => {
    render(
      <Copy
        title="Copy title"
        data-testid="copy-button-6"
        feedback="overriding-default-feedback">
        <CopyIcon />
      </Copy>
    );

    const button = screen.getByTestId('copy-button-6');
    userEvent.click(button);
    expect(screen.getAllByText('overriding-default-feedback').length).toBe(2);
  });

  it('should allow users to override default feedback timeout via prop', () => {
    render(
      <Copy
        title="Copy title"
        data-testid="copy-button-7"
        feedbackTimeout={5000}>
        <CopyIcon />
      </Copy>
    );

    const button = screen.getByTestId('copy-button-7');
    userEvent.click(button);

    expect(button).toHaveClass('cds--copy-btn--animating');
    act(() => {
      jest.runAllTimers();
      fireEvent.animationEnd(screen.getByTestId('copy-button-7'), {
        animationName: 'hide-feedback',
      });
    });
    expect(button).not.toHaveClass('cds--copy-btn--animating');
  });
});
