/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { CardHeader } from '.';
import { AILabel } from '@carbon/react';
import { pkg } from '../../settings';

const { name } = CardHeader;
const blockClass = `${pkg.prefix}--card`;

describe(name, () => {
  it('renders', async () => {
    render(<CardHeader />);
  });

  it('renders a description', async () => {
    const { getByText } = render(<CardHeader description="description" />);
    expect(getByText('description')).toBeVisible();
  });

  it('renders a label', async () => {
    const { getByText } = render(<CardHeader label="label" />);
    expect(getByText('label')).toBeVisible();
  });

  it('renders a title', async () => {
    const { getByText } = render(<CardHeader title="title" />);
    expect(getByText('title')).toBeVisible();
  });

  it('renders a large title', async () => {
    const props = {
      title: 'large title',
      titleSize: 'large',
    };
    const { container } = render(<CardHeader {...props} />);
    expect(container.querySelector(`.${blockClass}__title-lg`)).toBeVisible();
  });

  it('renders actions', async () => {
    const props = {
      hasActions: true,
      actions: <p key={1}>action 1</p>,
    };
    const { getByText } = render(<CardHeader {...props} />);
    expect(getByText('action 1')).toBeVisible();
  });

  it('should respect decorator prop', () => {
    const { container } = render(<CardHeader decorator={<AILabel />} />);
    expect(
      container.querySelector(
        `.${blockClass}__header__inner-wrapper--decorator`
      )
    ).not.toBeNull();
  });
});
