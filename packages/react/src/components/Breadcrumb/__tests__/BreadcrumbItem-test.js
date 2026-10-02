/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { BreadcrumbItem } from '../../Breadcrumb';
import { FeatureFlags } from '../../FeatureFlags';
import OverflowMenu from '../../OverflowMenu';
import OverflowMenuItem from '../../OverflowMenuItem';

const prefix = 'cds';

describe('BreadcrumbItem', () => {
  describe('Component API', () => {
    it('should accept a `ref` for the outermost node', () => {
      const ref = jest.fn(() => React.createRef());
      const { container } = render(
        <BreadcrumbItem href="/test" ref={ref}>
          Test
        </BreadcrumbItem>
      );
      expect(ref).toHaveBeenCalled();
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });
  });

  it('should add link classes and aria attributes to element children', () => {
    render(
      <BreadcrumbItem aria-current="page">
        <a href="/test" className="custom-link">
          Test
        </a>
      </BreadcrumbItem>
    );

    const link = screen.getByRole('link', { name: 'Test' });

    expect(link).toHaveClass(`${prefix}--link`, 'custom-link');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('should render overflow menu children with breadcrumb menu props', () => {
    render(
      // v12 OverflowMenu does not accept `menuOffset`. BreadcrumbItem still
      // passes it, and the v12 menu forwards that prop onto a DOM node.
      <FeatureFlags enableV12Release={false}>
        <BreadcrumbItem>
          <OverflowMenu aria-label="Overflow menu in breadcrumb">
            <OverflowMenuItem itemText="Breadcrumb 3" />
          </OverflowMenu>
        </BreadcrumbItem>
      </FeatureFlags>
    );

    const trigger = screen.getByRole('button', { name: 'Options' });

    expect(trigger).toHaveClass(`${prefix}--overflow-menu`);
    expect(
      trigger.querySelector(`.${prefix}--overflow-menu__icon`)
    ).toBeTruthy();
  });

  it('should render non-element children as provided', () => {
    render(
      <BreadcrumbItem>
        {[
          <a key="a" href="/a">
            A
          </a>,
          ' ',
          <a key="b" href="/b">
            B
          </a>,
        ]}
      </BreadcrumbItem>
    );

    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'B' })).toBeInTheDocument();
  });
});
