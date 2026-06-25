/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { CardFooter } from '.';
import { carbon } from '../../settings';

const { name } = CardFooter;

describe(name, () => {
  it('renders', async () => {
    render(<CardFooter />);
  });

  it('renders actions', async () => {
    const props = {
      hasActions: true,
      actions: <p>action 1</p>,
    };
    const { getByText } = render(<CardFooter {...props} />);
    expect(getByText('action 1')).toBeVisible();
  });

  it('renders primary button', async () => {
    const props = {
      hasButton: true,
      primaryButtonPlacement: 'bottom',
      primaryButtonText: 'primary button',
    };
    const { getByText } = render(<CardFooter {...props} />);
    expect(getByText(props.primaryButtonText)).toBeVisible();
  });

  it('renders secondary button', async () => {
    const props = {
      hasButton: true,
      secondaryButtonPlacement: 'bottom',
      secondaryButtonText: 'secondary button',
    };
    const { getByText } = render(<CardFooter {...props} />);
    expect(getByText(props.secondaryButtonText)).toBeVisible();
  });

  it('renders productive', async () => {
    const props = {
      hasButton: true,
      primaryButtonPlacement: 'bottom',
      primaryButtonText: 'primary button',
      productive: true,
    };
    const { getByText, container } = render(<CardFooter {...props} />);
    expect(getByText(props.primaryButtonText)).toBeVisible();
    expect(
      container.querySelector(`.${carbon.prefix}--btn--ghost`)
    ).toBeVisible();
  });
});
