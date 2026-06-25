/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import { Button } from '@carbon/react';
import { Edit } from '@carbon/react/icons';
import { pkg, carbon } from '../../settings';
import { getSupportedLocale } from '../../global/js/utils/getSupportedLocale';
import uuidv4 from '../../global/js/utils/uuidv4';
import { BigNumber } from '.';
import { BigNumberSkeleton } from './BigNumberSkeleton';

const blockClass = `${pkg.prefix}--big-number`;
const skeletonBlockClass = `${pkg.prefix}--big-number-skeleton`;
const componentName = BigNumber.displayName;
const componentNameSkeleton = BigNumberSkeleton.displayName;

// values to use
const iconButtonClassName = `iconButtonClass-${uuidv4()}`;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

const renderBigNumber = ({ ...rest } = {}) =>
  render(<BigNumber label="Label" value={12345} {...rest} />);

describe(componentName, () => {
  it('renders a component BigNumber', async () => {
    renderBigNumber({ className, 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderBigNumber();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    renderBigNumber({ className, 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    renderBigNumber({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderBigNumber({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderBigNumber({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('adds the Devtools attribute to the containing node when loading', async () => {
    renderBigNumber({ 'data-testid': dataTestId, loading: true });
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentNameSkeleton
    );
  });

  it('forwards a ref to an appropriate node when loading', async () => {
    const ref = React.createRef();
    renderBigNumber({ loading: true, ref });
    expect(ref.current).toHaveClass(skeletonBlockClass);
  });

  it('renders an icon button', async () => {
    renderBigNumber({
      iconButton: (
        <Button
          className={iconButtonClassName}
          data-testid={dataTestId}
          hasIconOnly
          iconDescription="Icon Description"
          kind="ghost"
          renderIcon={Edit}
          size={'sm'}
        />
      ),
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(iconButtonClassName);
  });

  it('should render en dash when `value` is `null`', async () => {
    renderBigNumber({ value: null });
    expect(screen.queryByText('–')).toBeVisible();
  });

  it('should render a number with a percent sign', async () => {
    renderBigNumber({ fractionDigits: 0, percentage: true, value: 34 });
    expect(screen.queryByText('34')).toBeVisible();
    expect(screen.queryByText('%')).toBeVisible();
  });

  it('should render "Unknown" when `total` is undefined and `forceShowTotal` is true', async () => {
    renderBigNumber({ forceShowTotal: true, total: undefined });
    expect(screen.queryByText('/Unknown')).toBeVisible();
  });

  it('should render a large value with a single decimal value by default', async () => {
    renderBigNumber({ value: 1234567 });
    expect(screen.queryByText('1.2M')).toBeVisible();
  });

  it('should render a large value with no decimal values', async () => {
    renderBigNumber({ fractionDigits: 0, value: 1234567 });
    expect(screen.queryByText('1M')).toBeVisible();
  });

  it('should not display the total if the total is less than the value', async () => {
    renderBigNumber({ total: 678, value: 1234 });
    expect(screen.queryByText('678')).toBeNull();
  });

  it('should display the total if the total is less than the value if forceShowTotal is true', async () => {
    const { container } = renderBigNumber({
      forceShowTotal: true,
      total: 678,
      value: 1234,
    });
    expect(container.querySelector(`.${blockClass}__total`)).toBeVisible();
  });

  it('should not display the total if total is the same as value', async () => {
    renderBigNumber({ total: 1234, value: 1234 });
    // find value
    expect(screen.queryByText('1.2K')).toBeVisible();
    // and don't find total
    expect(screen.queryByText('/1.2K')).toBeNull();
  });

  it('should not display the total if truncated total is the same as truncated value', async () => {
    renderBigNumber({ total: 1234, value: 1233 });
    // find value
    expect(screen.queryByText('1.2K')).toBeVisible();
    // and don't find total
    expect(screen.queryByText('/1.2K')).toBeNull();
  });

  it('should render a tooltip ', async () => {
    renderBigNumber({
      tooltipDescription: 'Tooltip description',
      trending: true,
      'data-testid': dataTestId,
    });
    const element = screen.getByTestId(dataTestId);
    const tooltipElement = element
      .querySelector(`.${blockClass}__label`)
      .getElementsByClassName(`span.${carbon.prefix}--tooltip`);
    expect(tooltipElement).toBeTruthy();
  });

  it('should format a value in a different locale', async () => {
    renderBigNumber({ value: 12345.678, locale: 'fr-CA', truncate: false });
    expect(screen.queryByText('12 345,678')).toBeVisible();
  });

  it('should render a large trending arrow', async () => {
    const { container } = renderBigNumber({
      size: 'lg',
      trending: true,
    });
    const element = container.querySelector(`.${blockClass}__trend`);
    const iconHeight = element.getAttribute('height');
    expect(iconHeight).toEqual('20');
  });

  it('should render an extra-large trending arrow', async () => {
    const { container } = renderBigNumber({
      size: 'xl',
      trending: true,
    });
    const element = container.querySelector(`.${blockClass}__trend`);
    const iconHeight = element.getAttribute('height');
    expect(iconHeight).toEqual('24');
  });

  it('should return the DefaultLocale ("en-US") if locale is unsupported', async () => {
    const supportedLocale = getSupportedLocale(
      'this string is not a supported locale'
    );
    expect(supportedLocale).toEqual('en-US');
  });
});
