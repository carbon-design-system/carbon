/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Toggle from './Toggle';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const prefix = 'cds';

describe('Toggle', () => {
  const props = {
    id: 'toggle-id',
    labelA: 'labelA-unchecked',
    labelB: 'labelB-checked',
    labelText: 'Toggle label',
    toggled: false,
    onToggle: () => {},
  };
  let wrapper;

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper = render(<Toggle {...props} />);
  });

  describe('renders as expected', () => {
    it('button and label ids should match', () => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const button = wrapper.getByRole('switch');
      // eslint-disable-next-line testing-library/no-node-access
      const label = wrapper.container.querySelector('label');
      expect(button.id).toBe(label.htmlFor);
    });

    it('renders labelA when unchecked', () => {
      wrapper.rerender(<Toggle {...props} toggled={false} />);
      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(wrapper.queryByText(props.labelA)).toBeInTheDocument();
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.queryByText(props.labelB)).not.toBeInTheDocument();
    });

    it('renders labelB when checked', () => {
      wrapper.rerender(<Toggle {...props} toggled={true} />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.queryByText(props.labelA)).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(wrapper.queryByText(props.labelB)).toBeInTheDocument();
    });

    it('supports additional css class names', () => {
      const className = 'some-additional-class';
      wrapper.rerender(<Toggle {...props} className={className} />);

      // eslint-disable-next-line testing-library/no-node-access
      expect(wrapper.container.querySelector(`.${prefix}--toggle`)).toHaveClass(
        className
      );
    });

    it('supports sm size', () => {
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--toggle__appearance`)
      ).not.toHaveClass(`${prefix}--toggle__appearance--sm`);
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--toggle__check`)
      ).toBeNull();

      wrapper.rerender(<Toggle {...props} size="sm" />);

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--toggle__appearance`)
      ).toHaveClass(`${prefix}--toggle__appearance--sm`);
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--toggle__check`)
      ).toBeTruthy();
    });

    it('supports to use top label as side label', () => {
      wrapper.rerender(<Toggle {...props} hideLabel />);

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--toggle__label-text`)
      ).toHaveClass(`${prefix}--visually-hidden`);
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--toggle__text`)
      ).toHaveTextContent(props.labelText);
    });

    it("doesn't render sideLabel if props.hideLabel and no props.labelText is provided", () => {
      const externalElementId = 'external-element-id';
      wrapper.rerender(
        <Toggle
          {...props}
          hideLabel
          labelText={null}
          aria-labelledby={externalElementId}
        />
      );

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--toggle__text`)
      ).toBeNull();

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('switch')).toHaveAttribute(
        'aria-labelledby',
        externalElementId
      );

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--toggle__label`).tagName
      ).toBe('DIV');
    });
  });

  describe('behaves as expected', () => {
    it('supports to be disabled', () => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('switch')).toBeEnabled();
      wrapper.rerender(<Toggle {...props} disabled />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('switch')).toBeDisabled();
    });

    it('can be controlled with props.toggled', () => {
      wrapper.rerender(<Toggle {...props} toggled={false} />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('switch')).not.toBeChecked();
      wrapper.rerender(<Toggle {...props} toggled={true} />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('switch')).toBeChecked();
    });

    it('does not change value when readonly', async () => {
      const onClick = jest.fn();
      const onToggle = jest.fn();
      wrapper.rerender(
        <Toggle {...props} onClick={onClick} onToggle={onToggle} readOnly />
      );

      expect(onClick).not.toHaveBeenCalled();
      // eslint-disable-next-line testing-library/prefer-screen-queries
      await userEvent.click(wrapper.getByRole('switch'));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onToggle).not.toHaveBeenCalled();
    });
  });

  describe('emits events as expected', () => {
    it('passes along props.onClick to button', async () => {
      const onClick = jest.fn();
      wrapper.rerender(<Toggle {...props} onClick={onClick} />);

      expect(onClick).not.toHaveBeenCalled();
      // eslint-disable-next-line testing-library/prefer-screen-queries
      await userEvent.click(wrapper.getByRole('switch'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('emits props.onToggle when toggled and passes current state', async () => {
      const onToggle = jest.fn();

      wrapper.rerender(
        <Toggle {...props} onToggle={onToggle} toggled={false} />
      );
      expect(onToggle).not.toHaveBeenCalled();
      // eslint-disable-next-line testing-library/prefer-screen-queries
      await userEvent.click(wrapper.getByRole('switch'));
      expect(onToggle).toHaveBeenCalledTimes(1);
      expect(onToggle.mock.calls[0][0]).toBe(true);

      wrapper.rerender(
        <Toggle {...props} onToggle={onToggle} toggled={true} />
      );
      // eslint-disable-next-line testing-library/prefer-screen-queries
      await userEvent.click(wrapper.getByRole('switch'));
      expect(onToggle).toHaveBeenCalledTimes(2);
      expect(onToggle.mock.calls[1][0]).toBe(false);
    });
  });
});
