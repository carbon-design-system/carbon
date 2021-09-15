/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Switch from '../Switch';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Switch', () => {
  describe('component rendering', () => {
    const buttonWrapper = shallow(
      <Switch kind="button" icon={<svg />} text="test" />
    );

    it('should render a button when kind is button', () => {
      expect(buttonWrapper.is('button')).toEqual(true);
    });

    it('should have the expected text', () => {
      expect(buttonWrapper.text()).toEqual('test');
    });

    it('label should have the expected class', () => {
      const className = `${prefix}--content-switcher__label`;
      expect(buttonWrapper.find('span').hasClass(className)).toEqual(true);
    });

    it('should have the expected class', () => {
      const cls = `${prefix}--content-switcher-btn`;

      expect(buttonWrapper.hasClass(cls)).toEqual(true);
    });

    it('should not have selected class', () => {
      const selectedClass = `${prefix}--content-switcher--selected`;

      expect(buttonWrapper.hasClass(selectedClass)).toEqual(false);
    });

    it('should have a selected class when selected is set to true', () => {
      const selected = true;

      buttonWrapper.setProps({ selected });

      expect(
        buttonWrapper.hasClass(`${prefix}--content-switcher--selected`)
      ).toEqual(true);
    });
  });

  describe('events', () => {
    const buttonOnClick = jest.fn();
    const linkOnClick = jest.fn();
    const buttonOnKey = jest.fn();
    const linkOnKey = jest.fn();
    const index = 1;
    const name = 'first';
    const text = 'test';

    const buttonWrapper = shallow(
      <Switch
        index={index}
        name={name}
        kind="button"
        onClick={buttonOnClick}
        onKeyDown={buttonOnKey}
        text={text}
      />
    );

    const linkWrapper = shallow(
      <Switch
        index={index}
        name={name}
        kind="anchor"
        onClick={linkOnClick}
        onKeyDown={linkOnKey}
        text={text}
      />
    );

    it('should invoke button onClick handler', () => {
      buttonWrapper.simulate('click', { preventDefault() {} });
      expect(buttonOnClick).toHaveBeenCalledWith({ index, name, text });
    });

    it('should invoke link onClick handler', () => {
      linkWrapper.simulate('click', { preventDefault() {} });
      expect(buttonOnClick).toHaveBeenCalledWith({ index, name, text });
    });
  });
});
