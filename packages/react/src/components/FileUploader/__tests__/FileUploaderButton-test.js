/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { FileUploaderButton } from '../';

const { prefix } = settings;

describe('FileUploaderButton', () => {
  const button = <FileUploaderButton className="extra-class" />;
  const mountWrapper = mount(button);

  describe('Renders as expected with default props', () => {
    it('renders with expected className', () => {
      expect(mountWrapper.find('label').hasClass(`${prefix}--btn`)).toBe(true);
    });

    it('renders with given className', () => {
      expect(mountWrapper.hasClass('extra-class')).toBe(true);
    });

    it('renders with default labelText prop', () => {
      expect(mountWrapper.props().labelText).toEqual('Add file');
    });

    it('renders with default buttonKind prop', () => {
      expect(mountWrapper.props().buttonKind).toEqual('primary');
    });

    it('renders with expected button className', () => {
      expect(mountWrapper.find(`.${prefix}--btn--primary`).exists()).toBe(true);
    });

    it('renders with default multiple prop', () => {
      expect(mountWrapper.props().multiple).toEqual(false);
    });

    it('renders with default disableLabelChanges prop', () => {
      expect(mountWrapper.props().disableLabelChanges).toEqual(false);
    });

    it('renders with default accept prop', () => {
      expect(mountWrapper.props().accept).toEqual([]);
    });

    it('renders with default disabled prop', () => {
      expect(mountWrapper.props().disabled).toBe(false);
    });

    it('disables file upload input', () => {
      const wrapper = shallow(button);
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('input').prop('disabled')).toEqual(true);
    });

    it('does have default role', () => {
      expect(mountWrapper.props().role).toBeTruthy();
    });

    it('resets the input value onClick', () => {
      const input = mountWrapper.find(`.${prefix}--visually-hidden`);
      input.instance().value = '';
      const evt = { target: { value: input.instance().value } };
      input.simulate('click', evt);

      expect(evt.target.value).toEqual(null);
    });
  });

  describe('Unique id props', () => {
    it('each FileUploaderButton should have a unique ID', () => {
      const mountedButtons = mount(
        <div>
          <FileUploaderButton className="extra-class" />
          <FileUploaderButton className="extra-class" />
        </div>
      );
      const firstButton = mountedButtons.find(FileUploaderButton).at(0);
      const lastButton = mountedButtons.find(FileUploaderButton).at(1);
      const isEqual = firstButton === lastButton;
      expect(isEqual).toBe(false);
    });
  });

  describe('Update labelText', () => {
    it('should have equal state and props', () => {
      expect(
        shallow(<FileUploaderButton labelText="foo" />).state().labelText
      ).toEqual('foo');
    });

    it('should change the label text upon change in props', () => {
      mountWrapper.setProps({ labelText: 'foo' });
      mountWrapper.setState({ labelText: 'foo' });
      mountWrapper.setProps({ labelText: 'bar' });
      expect(mountWrapper.state().labelText).toEqual('bar');
    });

    it('should avoid change the label text upon setting props, unless there the value actually changes', () => {
      mountWrapper.setProps({ labelText: 'foo' });
      mountWrapper.setState({ labelText: 'bar' });
      mountWrapper.setProps({ labelText: 'foo' });
      expect(mountWrapper.state().labelText).toEqual('bar');
    });
  });
});
