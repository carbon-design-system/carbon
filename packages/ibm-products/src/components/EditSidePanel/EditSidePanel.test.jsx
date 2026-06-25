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

import { EditSidePanel } from '.';

const blockClass = `${pkg.prefix}--edit-side-panel`;
const componentName = EditSidePanel.displayName;

// values to use
const childrenContent = `hello, world (${uuidv4()})`;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const title = uuidv4();
const subtitle = uuidv4();
const formDescription = uuidv4();
const formTitle = uuidv4();
const selectorPrimaryFocus = `.${carbon.prefix}--text-input`;
const primaryButtonText = 'Save';
const secondaryButtonText = 'Cancel';
const onRequestSubmitFn = jest.fn();
const onRequestCloseFn = jest.fn();

const renderEditPanel = ({ ...rest } = {}, children = childrenContent) =>
  render(
    <EditSidePanel
      open
      id="edit-sidepanel-id"
      {...{
        title,
        subtitle,
        formDescription,
        formTitle,
        selectorPrimaryFocus,
        primaryButtonText,
        secondaryButtonText,
        onRequestSubmit: onRequestSubmitFn,
        onRequestClose: onRequestCloseFn,
        ...rest,
      }}
    >
      {children}
    </EditSidePanel>
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders a component EditSidePanel', async () => {
    renderEditPanel();
    expect(screen.getByRole('complementary')).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderEditPanel();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('renders children', async () => {
    renderEditPanel();
    screen.getByText(childrenContent);
  });

  it('applies className to the containing node', async () => {
    renderEditPanel({
      className,
    });
    expect(screen.getByRole('complementary')).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    renderEditPanel({
      'data-testid': dataTestId,
    });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderEditPanel({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderEditPanel({
      'data-testid': dataTestId,
    });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('clicks on the primary action button', async () => {
    const { click } = userEvent;
    renderEditPanel();
    const primaryActionButton = screen.getByText(primaryButtonText);
    await act(() => click(primaryActionButton));
    expect(onRequestSubmitFn).toHaveBeenCalledTimes(1);
  });
});
