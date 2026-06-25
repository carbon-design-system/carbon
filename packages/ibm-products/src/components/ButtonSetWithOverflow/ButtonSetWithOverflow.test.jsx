/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ButtonSetWithOverflow } from '.';
import { Bee } from '@carbon/react/icons';
import { mockHTMLElement } from '../../global/js/utils/test-helper';

import { carbon } from '../../settings';

const buttons = (handleClick) =>
  [1, 2, 3].map((num) => ({
    renderIcon: !(num % 3) ? Bee : null,
    iconDescription: !(num % 3) ? 'Busy bee' : null,
    label: `Action ${num}`,
    key: `key-${num}`,
    kind: 'default',
    onClick: () => {
      handleClick(`Action ${num}`);
    },
    className: 'button-class-test',
  }));

import { pkg } from '../../settings';
const blockClass = `${pkg.prefix}--button-set-with-overflow`;

const buttonWidth = 200;

describe(ButtonSetWithOverflow.displayName, () => {
  let mockElement;

  beforeEach(() => {
    mockElement = mockHTMLElement({
      offsetWidth: {
        get: function () {
          let width = 0;

          if (this.classList.contains(`${carbon.prefix}--btn`)) {
            width = buttonWidth;
          } else {
            width = window.innerWidth;
          }

          return width;
        },
      },
    });
  });

  afterEach(() => {
    mockElement.mockRestore();
  });

  it('Works with button shape array', async () => {
    window.innerWidth = buttonWidth * 3.5;

    const myOnClick = jest.fn();

    render(
      <ButtonSetWithOverflow
        buttons={buttons(myOnClick)}
        buttonSetOverflowLabel="overflow label"
      />
    );

    const action1 = screen.getByText(/Action 1/, {
      selector: `.${blockClass}__button-container--visible .${carbon.prefix}--btn`,
    });
    screen.getByText(/Action 2/, {
      selector: `.${blockClass}__button-container--visible .${carbon.prefix}--btn`,
    });
    screen.getByText(/Action 3/, {
      selector: `.${blockClass}__button-container--visible .${carbon.prefix}--btn`,
    });

    await act(() => userEvent.click(action1));
    expect(myOnClick).toBeCalled();
  });

  it('Renders as ComboButton when not enough space', async () => {
    window.innerWidth = buttonWidth * 2.5;

    const myOnClick = jest.fn();
    const buttonMenuLabel = 'button menu label';

    render(
      <ButtonSetWithOverflow
        buttons={buttons(myOnClick)}
        buttonSetOverflowLabel={buttonMenuLabel}
      />
    );

    const action1 = screen.queryByText(/Action 1/, {
      selector: `.${blockClass}__button-container--visible .${pkg.prefix}--menu-button__trigger`,
    });
    expect(action1).toBeNull();

    const comboButton = screen.getByText(buttonMenuLabel, {
      selector: `.${pkg.prefix}--button-set-with-overflow__button-container.${pkg.prefix}--button-set-with-overflow__button-container--visible button`,
    });
    await act(() => userEvent.click(comboButton));

    const action1a = screen.getByText(/Action 1/, {
      selector: `.button-class-test .${carbon.prefix}--menu-item__label`,
    });

    await act(() => userEvent.click(action1a));
    expect(myOnClick).toBeCalled();
  });

  it('Applies right align class when requested', async () => {
    window.innerWidth = buttonWidth * 3.5;
    const myOnClick = jest.fn();

    const { container } = render(
      <ButtonSetWithOverflow
        buttons={buttons(myOnClick)}
        rightAlign={true}
        buttonSetOverflowLabel="overflow label"
      />
    );

    expect(container.querySelector(`.${blockClass}--right`)).not.toBeNull();
  });
});
