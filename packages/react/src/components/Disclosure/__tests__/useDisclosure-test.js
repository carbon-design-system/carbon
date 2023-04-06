/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { useDisclosure } from '../index.js';
import '@testing-library/jest-dom';

describe('useDisclosure', () => {
  afterEach(cleanup);

  // https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-8
  it('should toggle visibility when the button is clicked', async () => {
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

    await userEvent.tab();
    expect(trigger).toHaveFocus();

    await userEvent.click(document.activeElement);
    expect(content).toBeVisible();

    await userEvent.click(document.activeElement);
    expect(content).not.toBeVisible();
  });

  it('should toggle visibility when the button is focused and Enter or Space is pressed', async () => {
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
    const user = userEvent.setup();

    render(<TestComponent />);

    screen.getByText('trigger').focus();

    const content = screen.getByText('content');

    await user.keyboard('[Space]');
    expect(content.hidden).toBe(false);

    await user.keyboard('[Space]');
    expect(content.hidden).toBe(true);

    await user.keyboard('[Enter]');
    expect(content.hidden).toBe(false);
  });

  // https://www.w3.org/TR/wai-aria-practices-1.1/#wai-aria-roles-states-and-properties-8
  it('should set `aria-expanded` to match the visibility of the content', async () => {
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

    await userEvent.click(trigger);

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
