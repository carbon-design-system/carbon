/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Breadcrumb from '../';
import BreadcrumbItem from '../BreadcrumbItem';

const prefix = 'cds';

describe('Breadcrumb', () => {
  it('should accept a `aria-label` for nav element', () => {
    render(<Breadcrumb aria-label={'test-label'} />);
    expect(screen.getByLabelText('test-label')).toBeInTheDocument();
  });

  it('should provide a default `aria-label` for nav element', () => {
    render(<Breadcrumb />);
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
  });

  it('should accept `children` of BreadcrumbItem', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="#a">A</BreadcrumbItem>
        <BreadcrumbItem href="#b">B</BreadcrumbItem>
        <BreadcrumbItem href="#c">C</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('should accept a `noTrailingSlash` and omit the trailing slash', () => {
    render(
      <Breadcrumb noTrailingSlash>
        <BreadcrumbItem href="#a">A</BreadcrumbItem>
        <BreadcrumbItem href="#b">B</BreadcrumbItem>
        <BreadcrumbItem href="#c">C</BreadcrumbItem>
      </Breadcrumb>
    );

    // The slashes are implemented with pseudo elements that can't be detected in jsdom.
    // So we have to settle here for just validating against the class. Pseudo elements
    // should be tested in the browser/e2e tests.
    // https://testing-library.com/docs/dom-testing-library/api-configuration/#computedstylesupportspseudoelements
    // https://github.com/jsdom/jsdom/issues/1928
    expect(screen.getByRole('list')).toHaveClass(
      `${prefix}--breadcrumb--no-trailing-slash`
    );
  });

  it('should accept a `className` for outermost DOM node', () => {
    const { container } = render(<Breadcrumb className="test" />);

    expect(container.firstChild).toHaveClass('test');
  });

  it('should apply additional props to the outermost element', () => {
    const { container } = render(<Breadcrumb data-testid="test" />);

    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should accept a `ref` for the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(<Breadcrumb ref={ref} />);

    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });

  describe('automated verification testing', () => {
    it('should have no aXe violations', async () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbItem href="#a">A</BreadcrumbItem>
          <BreadcrumbItem href="#b">B</BreadcrumbItem>
          <BreadcrumbItem href="#c">C</BreadcrumbItem>
        </Breadcrumb>
      );
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no AC violations', async () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbItem href="#a">A</BreadcrumbItem>
          <BreadcrumbItem href="#b">B</BreadcrumbItem>
          <BreadcrumbItem href="#c">C</BreadcrumbItem>
        </Breadcrumb>
      );
      await expect(container).toHaveNoACViolations('Breadcrumb');
    });
  });
});
