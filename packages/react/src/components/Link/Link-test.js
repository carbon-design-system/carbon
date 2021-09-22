/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, document } from 'window-or-global';

const { prefix } = settings;

describe('Link', () => {
  afterEach(cleanup);

  describe('Renders as expected', () => {
    const link = shallow(
      <Link href="www.google.com" className="some-class">
        A simple link
      </Link>
    );

    it('should use the appropriate link class', () => {
      expect(link.name()).toEqual('a');
      expect(link.hasClass(`${prefix}--link`)).toEqual(true);
    });

    it('should inherit the href property', () => {
      expect(link.props().href).toEqual('www.google.com');
    });

    it('should include child content', () => {
      expect(link.text()).toEqual('A simple link');
    });

    it('should all for custom classes to be applied', () => {
      expect(link.hasClass('some-class')).toEqual(true);
    });

    it('should support disabled link', () => {
      link.setProps({ disabled: true });
      expect(link.name()).toEqual('p');
      expect(link.hasClass(`${prefix}--link--disabled`)).toEqual(true);
    });

    it('should support inline link', () => {
      link.setProps({ inline: true });
      expect(link.hasClass(`${prefix}--link--inline`)).toEqual(true);
    });
    it('should add support for different link sizes', () => {
      link.setProps({ size: 'lg' });
      expect(link.hasClass(`${prefix}--link--lg`)).toEqual(true);
    });
    it('should add rel="noopener" automatically if target="_blank"', () => {
      link.setProps({ target: '_blank' });
      expect(link.props().rel).toEqual('noopener');
    });
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      render(
        <Link href="/" className="some-class">
          A simple link
        </Link>
      );

      await expect(screen.getByText('A simple link')).toHaveNoAxeViolations();
    });

    it('should have no Accessibility Checker violations', async () => {
      render(
        <main>
          <Link href="/" className="some-class">
            A simple link
          </Link>
        </main>
      );

      await expect(screen.getByText('A simple link')).toHaveNoACViolations(
        'Link'
      );
    });
  });

  describe('keyboard support', () => {
    it('should receive keyboard focus', () => {
      render(
        <Link href="/" className="some-class">
          A simple link
        </Link>
      );

      expect(document.body).toHaveFocus();
      userEvent.tab();
      expect(screen.getByText('A simple link')).toHaveFocus();
    });

    it('should not receive keyboard focus when disabled', () => {
      render(
        <Link href="/" disabled className="some-class">
          A simple link
        </Link>
      );
      expect(document.body).toHaveFocus();
      userEvent.tab();
      expect(document.body).toHaveFocus();
    });
  });
});
