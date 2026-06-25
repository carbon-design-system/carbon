/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';

import { pkg, carbon } from '../../settings';

import uuidv4 from '../../global/js/utils/uuidv4';

import { Add } from '@carbon/react/icons';

import { ButtonMenu, ButtonMenuItem } from '.';

const blockClass = `${pkg.prefix}--button-menu`;
const componentName = ButtonMenu.displayName;

// values to use
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const icon = (props) => <Add size={16} {...props} />;
const iconDescription = `Icon ${uuidv4()}`;
const itemText = `Option ${uuidv4()}`;
const label = `Button ${uuidv4()}`;
const menuAriaLabel = `aria ${label} label`;

const renderMenu = async (menuProps = {}, itemProps = {}) => {
  const container = render(
    <main>
      <ButtonMenu {...{ menuAriaLabel, label }} {...menuProps}>
        <ButtonMenuItem itemText="Option 1" />
        <ButtonMenuItem {...{ itemText }} {...itemProps} />
        <ButtonMenuItem itemText="Option 3" />
      </ButtonMenu>
    </main>
  );
  await act(() => userEvent.click(screen.getByRole('button')));
  return container;
};

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component ButtonMenu', async () => {
    await renderMenu();
    expect(
      screen.getByText(label, {
        selector: `.${blockClass} .${blockClass}__trigger`,
      })
    ).toBeInTheDocument();
  });

  it.skip('has no accessibility violations', async () => {
    const { container } = await renderMenu();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, async () => {
    await renderMenu();
    screen.getByText(itemText);
  });

  it('applies className to the containing node', async () => {
    await renderMenu({ className });
    expect(screen.getByText(label).closest('button')).toHaveClass(className);
  });

  it('renders icon and description', async () => {
    await renderMenu({ iconDescription, renderIcon: icon });
    const svg = screen.getByText(label).closest('button').querySelector('svg');
    expect(svg).toHaveClass(`${carbon.prefix}--btn__icon`);
  });

  it('renders label prop', async () => {
    await renderMenu({ label });
    screen.getByText(label);
  });

  it('renders size prop', async () => {
    const ref = React.createRef();
    await renderMenu({ ref, size: 'lg' });
    expect(ref.current).toHaveClass(`${carbon.prefix}--btn--lg`);
  });

  it('adds additional props to the containing node', async () => {
    await renderMenu({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    await renderMenu({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });
});
