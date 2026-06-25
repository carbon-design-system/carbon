/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { pkg, carbon } from '../settings';

const name = 'settings';

describe(name, () => {
  it('uses the default css prefix', async () => {
    expect(pkg.prefix).toEqual('c4p');
  });

  it('can use custom prefix with a react component', async () => {
    const prefix = 'my-prefix';
    pkg.prefix = prefix;

    // dynamic import so we can modify the import on the component before using it
    const { StatusIcon } = await import('../components/StatusIcon');
    const { container } = render(
      <StatusIcon
        kind="fatal"
        size="sm"
        theme="light"
        iconDescription="Fatal"
      />
    );

    expect(
      container.querySelector(`.${prefix}--status-icon`)
    ).toBeInTheDocument();
  });

  it('Supplies carbon theme token values', async () => {
    expect(carbon.themes.g10.textPrimary).not.toBe(null);
    expect(carbon.themes.g10.textPrimary).toMatch(/#[0-9a-fA-F]+/);
  });

  it('Supplies carbon layout token values', async () => {
    expect(carbon.themes.g10.spacing01).not.toBe(null);
    expect(carbon.themes.g10.spacing01).toMatch(/[0-9.]+rem/);
  });

  it('Supplies carbon type', async () => {
    expect(carbon.themes.g10.caption01).not.toBe(null);
    expect(carbon.themes.g10.caption01.fontSize).toMatch(/[0-9.]+rem/);
    expect(carbon.themes.g10.caption01.fontWeight).toBeGreaterThan(0);
    expect(carbon.themes.g10.caption01.letterSpacing).toMatch(/[0-9.]+px/);
    expect(carbon.themes.g10.caption01.lineHeight).toBeGreaterThan(0);
  });
});
