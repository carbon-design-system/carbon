/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg } from '../../settings';

import { DecoratorIcon } from './DecoratorIcon';

const blockClass = `${pkg.prefix}--decorator-icon`;
const componentName = DecoratorIcon.displayName;

describe(componentName, () => {
  it('renders a "benign" icon', async () => {
    const { container } = render(<DecoratorIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(`${blockClass}__magnitude-unknown`);
  });

  it('renders a "benign" icon', async () => {
    const { container } = render(<DecoratorIcon magnitude="benign" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(`${blockClass}__magnitude-benign`);
  });

  it('renders a "low" icon', async () => {
    const { container } = render(<DecoratorIcon magnitude="low" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(`${blockClass}__magnitude-low`);
  });

  it('renders a "medium" icon', async () => {
    const { container } = render(<DecoratorIcon magnitude="medium" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(`${blockClass}__magnitude-medium`);
  });

  it('renders a "high" icon', async () => {
    const { container } = render(<DecoratorIcon magnitude="high" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(`${blockClass}__magnitude-high`);
  });

  it('renders a "critical" icon', async () => {
    const { container } = render(<DecoratorIcon magnitude="critical" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(`${blockClass}__magnitude-critical`);
  });
});
