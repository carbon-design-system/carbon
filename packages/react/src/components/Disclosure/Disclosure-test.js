/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'window-or-global';
import userEvent from '@testing-library/user-event';
import { Disclosure, DisclosureButton } from './index';

describe('Disclosure', () => {
  it('should toggle visibility of the content when the trigger button is clicked', () => {
    render(
      <Disclosure>
        <DisclosureButton>click me</DisclosureButton>
        <span>content</span>
      </Disclosure>
    );

    expect(screen.getByText('content')).not.toBeVisible();

    userEvent.click(screen.getByText('click me'));

    expect(screen.getByText('content')).toBeVisible();
  });

  describe('Component API', () => {
    it('should accept a custom className on the Disclosure component', () => {
      const { container } = render(
        <Disclosure className="test">
          <DisclosureButton>click me</DisclosureButton>
          <span>content</span>
        </Disclosure>
      );

      expect(container.firstChild).toHaveClass('test');
    });

    it('should accept a custom className on the DisclosureButton component', () => {
      const { container } = render(
        <DisclosureButton className="test">click me</DisclosureButton>
      );

      expect(container.firstChild).toHaveClass('test');
    });
  });
});
