/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import userEvent, { specialChars } from '@testing-library/user-event';
import { useDisclosure } from '../index.js';
import '@testing-library/jest-dom';

describe('useDisclosure', () => {
  afterEach(cleanup);

  // https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-8
  it('should toggle visibility when the button is clicked', () => {
    function TestComponent() {
      const { buttonProps, contentProps, open } = useDisclosure('testid');
      return (
        <>
          <button type="button" {...buttonProps}>
            trigger
          </button>
          <div {...contentProps} hidden={!open}>
            content
          </div>
        </>
      );
    }

    render(<TestComponent />);

    const content = screen.getByText('content');
    expect(content).not.toBeVisible();

    const trigger = screen.getByText('trigger');

    userEvent.tab();
    expect(trigger).toHaveFocus();

    userEvent.click(document.activeElement);
    expect(content).toBeVisible();

    userEvent.click(document.activeElement);
    expect(content).not.toBeVisible();
  });

  it('should toggle visibility when the button is focused and Enter or Space is pressed', () => {
    function TestComponent() {
      const { buttonProps, contentProps, open } = useDisclosure('testid');
      return (
        <>
          <button type="button" {...buttonProps}>
            trigger
          </button>
          <div {...contentProps} hidden={!open}>
            content
          </div>
        </>
      );
    }

    render(<TestComponent />);

    const trigger = screen.getByText('trigger');

    userEvent.type(trigger, `${specialChars.space}`);
    expect(trigger).toHaveFocus();

    userEvent.type(trigger, `${specialChars.enter}`);
    expect(trigger).toHaveFocus();
  });

  // https://www.w3.org/TR/wai-aria-practices-1.1/#wai-aria-roles-states-and-properties-8
  it('should set `aria-expanded` to match the visibility of the content', () => {
    function TestComponent() {
      const { buttonProps, contentProps, open } = useDisclosure('testid');
      return (
        <>
          <button type="button" {...buttonProps}>
            trigger
          </button>
          <div {...contentProps} hidden={!open}>
            content
          </div>
        </>
      );
    }

    render(<TestComponent />);

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('should set `aria-controls` to match the id of the content', () => {
    function TestComponent() {
      const { buttonProps, contentProps, open } = useDisclosure('testid');
      return (
        <>
          <button type="button" {...buttonProps}>
            trigger
          </button>
          <div {...contentProps} hidden={!open}>
            content
          </div>
        </>
      );
    }

    render(<TestComponent />);

    const content = screen.getByText('content');
    const trigger = screen.getByText('trigger');
    const contentId = content.id;

    expect(trigger).toHaveAttribute('aria-controls', contentId);
  });

  it('should set `id` on the content', () => {
    function TestComponent() {
      const { buttonProps, contentProps, open } = useDisclosure('testid');
      return (
        <>
          <button type="button" {...buttonProps}>
            trigger
          </button>
          <div {...contentProps} hidden={!open}>
            content
          </div>
        </>
      );
    }

    render(<TestComponent />);

    const content = screen.getByText('content');

    expect(content).toHaveAttribute('id');
  });
});
