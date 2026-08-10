/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../../Button';
import { Edit } from '@carbon/icons-react';
import { getSupportedLocale } from '../../../internal/getSupportedLocale';
import { BigNumber } from '..';
import { BigNumberSkeleton } from '../BigNumberSkeleton';

const prefix = 'cds';
const blockClass = `${prefix}--big-number`;
const skeletonBlockClass = `${prefix}--big-number-skeleton`;

const componentName = BigNumber.displayName;
const componentNameSkeleton = BigNumberSkeleton.displayName;

const className = 'class-test';
const dataTestId = 'big-number-test';

const renderBigNumber = (props = {}) => {
  return render(<BigNumber label="Label" value={12345} {...props} />);
};

describe(componentName, () => {
  it('renders a component BigNumber', () => {
    renderBigNumber({ className, 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderBigNumber();
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', () => {
    renderBigNumber({ className, 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', () => {
    renderBigNumber({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    renderBigNumber({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the data-component-name attribute to the containing node', () => {
    renderBigNumber({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('adds the data-component-name attribute to the skeleton node when loading', () => {
    renderBigNumber({ 'data-testid': dataTestId, loading: true });
    expect(screen.getByTestId(dataTestId)).toHaveAttribute(
      'data-component-name',
      componentNameSkeleton
    );
  });

  it('forwards a ref to the skeleton node when loading', () => {
    const ref = React.createRef();
    renderBigNumber({ loading: true, ref });
    expect(ref.current).toHaveClass(skeletonBlockClass);
  });

  it('renders an icon button', () => {
    const iconButtonClassName = 'icon-button-class-test';
    renderBigNumber({
      iconButton: (
        <Button
          className={iconButtonClassName}
          data-testid={dataTestId}
          hasIconOnly
          iconDescription="Icon Description"
          kind="ghost"
          renderIcon={Edit}
          size="sm"
        />
      ),
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(iconButtonClassName);
  });

  it('renders an en dash when `value` is `null`', () => {
    renderBigNumber({ value: null });
    expect(screen.getByText('–')).toBeVisible();
  });

  it('renders a number with a percent sign', () => {
    renderBigNumber({ fractionDigits: 0, percentage: true, value: 34 });
    expect(screen.getByText('34')).toBeVisible();
    expect(screen.getByText('%')).toBeVisible();
  });

  it('renders "Unknown" when `total` is undefined and `forceShowTotal` is true', () => {
    renderBigNumber({ forceShowTotal: true, total: undefined });
    expect(screen.getByText('/Unknown')).toBeVisible();
  });

  it('renders a large value with a single decimal by default', () => {
    renderBigNumber({ value: 1234567 });
    expect(screen.getByText('1.2M')).toBeVisible();
  });

  it('renders a large value with no decimal places when fractionDigits is 0', () => {
    renderBigNumber({ fractionDigits: 0, value: 1234567 });
    expect(screen.getByText('1M')).toBeVisible();
  });

  it('does not display the total when total is less than value', () => {
    renderBigNumber({ total: 678, value: 1234 });
    expect(screen.queryByText('/678')).toBeNull();
  });

  it('displays the total when total is less than value and forceShowTotal is true', () => {
    const { container } = renderBigNumber({
      forceShowTotal: true,
      total: 678,
      value: 1234,
    });
    expect(container.querySelector(`.${blockClass}__total`)).toBeVisible();
  });

  it('does not display the total when total equals value', () => {
    renderBigNumber({ total: 1234, value: 1234 });
    expect(screen.getByText('1.2K')).toBeVisible();
    expect(screen.queryByText('/1.2K')).toBeNull();
  });

  it('does not display the total when truncated total equals truncated value', () => {
    renderBigNumber({ total: 1234, value: 1233 });
    expect(screen.getByText('1.2K')).toBeVisible();
    expect(screen.queryByText('/1.2K')).toBeNull();
  });

  it('renders a tooltip trigger when tooltipDescription is provided', () => {
    renderBigNumber({
      tooltipDescription: 'Tooltip description',
      'data-testid': dataTestId,
    });
    const element = screen.getByTestId(dataTestId);
    expect(
      element.querySelector(`.${blockClass}__tooltip-trigger`)
    ).toBeInTheDocument();
  });

  it('formats a value using the specified locale', () => {
    renderBigNumber({ value: 12345.678, locale: 'fr-CA', truncate: false });
    // fr-CA uses narrow no-break space (U+202F) as thousands separator
    expect(
      screen.getByText((text) => text.replace(/\s/g, ' ') === '12 345,678')
    ).toBeVisible();
  });

  it('renders a size-20 trending arrow for size "lg"', () => {
    const { container } = renderBigNumber({ size: 'lg', trending: true });
    const icon = container.querySelector(`.${blockClass}__trend`);
    expect(icon).toHaveAttribute('height', '20');
  });

  it('renders a size-24 trending arrow for size "xl"', () => {
    const { container } = renderBigNumber({ size: 'xl', trending: true });
    const icon = container.querySelector(`.${blockClass}__trend`);
    expect(icon).toHaveAttribute('height', '24');
  });

  it('falls back to DefaultLocale ("en-US") when an unsupported locale is given', () => {
    const result = getSupportedLocale('this-is-not-a-locale');
    expect(result).toEqual('en-US');
  });
});
