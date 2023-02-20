/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import CopyButton from '../CopyButton';

jest.useFakeTimers();

describe('CopyButton', () => {
  it('should set tabIndex if one is passed via props', () => {
    render(
      <CopyButton
        //eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex={2}
        iconDescription="icon description"
        data-testid="copy-btn-1"
      />
    );
    expect(screen.getByTestId('copy-btn-1')).toHaveAttribute('tabindex', '2');
  });

  it('should add extra classes passed via className', () => {
    render(
      <CopyButton
        className="extra-class"
        iconDescription="icon description"
        data-testid="copy-btn-2"
      />
    );

    expect(screen.getByTestId('copy-btn-2')).toHaveClass('extra-class');
  });
});

describe('Button props', () => {
  it('should disable button if disabled prop is passed', () => {
    render(
      <CopyButton
        disabled
        iconDescription="icon description"
        data-testid="copy-btn-3"
      />
    );

    expect(screen.getByTestId('copy-btn-3')).toHaveAttribute('disabled');
  });

  it('should call the click handler', () => {
    const onClick = jest.fn();

    render(
      <CopyButton
        iconDescription="icon description"
        data-testid="copy-btn-4"
        onClick={onClick}
      />
    );
    const button = screen.getByTestId('copy-btn-4');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Feedback', () => {
  it('should make the feedback visible for a limited amount of time', () => {
    render(
      <CopyButton iconDescription="icon description" data-testid="copy-btn-5" />
    );

    const button = screen.getByTestId('copy-btn-5');
    userEvent.click(button);

    expect(button).toHaveClass('cds--copy-btn--animating');
    act(() => {
      jest.runAllTimers();
      fireEvent.animationEnd(screen.getByTestId('copy-btn-5'), {
        animationName: 'hide-feedback',
      });
    });
  });

  it('should be able to specify the feedback message', () => {
    render(
      <CopyButton
        iconDescription="icon description"
        data-testid="copy-btn-6"
        feedback="custom-feedback"
      />
    );

    const button = screen.getByTestId('copy-btn-6');
    userEvent.click(button);
    // returns array of 2 for visible tooltip text and assistive text
    expect(screen.getAllByText('custom-feedback').length).toBe(2);
  });

  it('should allow users to override default feedback timeout via prop', () => {
    render(
      <CopyButton
        iconDescription="icon description"
        data-testid="copy-btn-7"
        feedbackTimeout={5000}
      />
    );

    const button = screen.getByTestId('copy-btn-7');
    userEvent.click(button);

    expect(button).toHaveClass('cds--copy-btn--animating');
    act(() => {
      jest.runAllTimers();
      fireEvent.animationEnd(screen.getByTestId('copy-btn-7'), {
        animationName: 'hide-feedback',
      });
    });
  });
});
