//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { AddSelectMetaPanel } from './AddSelectMetaPanel';
import { pkg } from '../../settings';

const blockClass = `${pkg.prefix}--add-select__meta-panel`;
const componentName = AddSelectMetaPanel.name;
const defaultProps = {
  closeIconDescription: 'test close icon',
  setDisplayMetaPanel: () => {},
  title: 'test title',
  meta: [],
};

describe(componentName, () => {
  it('renders', async () => {
    render(<AddSelectMetaPanel {...defaultProps} />);
  });

  it('has no accessibility violations', async () => {
    render(<AddSelectMetaPanel {...defaultProps} />);
    const AddSelectElement = document.querySelector(`.${blockClass}`);
    await expect(AddSelectElement).toBeAccessible(componentName);
    await expect(AddSelectElement).toHaveNoAxeViolations();
  });

  it('renders without html', async () => {
    const entry = {
      id: 'test-id',
      title: 'test title',
      value: 'test value',
    };
    const newProps = {
      ...defaultProps,
      meta: [entry],
    };
    render(<AddSelectMetaPanel {...newProps} />);
    expect(
      document.querySelector(`.${blockClass}-entry-title`).textContent
    ).toBe('test title');
    expect(
      document.querySelector(`.${blockClass}-entry-body`).textContent
    ).toBe('test value');
  });

  it('renders with html', async () => {
    const meta = (
      <div className={`${blockClass}-entry`}>
        <p className={`${blockClass}-entry-title`}>html title</p>
        <p className={`${blockClass}-entry-body`}>html value</p>
      </div>
    );
    const newProps = {
      ...defaultProps,
      meta,
    };
    render(<AddSelectMetaPanel {...newProps} />);
    expect(
      document.querySelector(`.${blockClass}-entry-title`).textContent
    ).toBe('html title');
    expect(
      document.querySelector(`.${blockClass}-entry-body`).textContent
    ).toBe('html value');
  });

  it('triggers the onCloseHandler', async () => {
    const setDisplayMetaPanel = jest.fn();
    const newProps = {
      ...defaultProps,
      setDisplayMetaPanel,
    };
    render(<AddSelectMetaPanel {...newProps} />);
    const btn = document.querySelector(`.${blockClass}-close`);
    fireEvent.click(btn);
    expect(setDisplayMetaPanel).toHaveBeenCalled();
  });
});
