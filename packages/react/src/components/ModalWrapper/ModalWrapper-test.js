/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import ModalWrapper from '../ModalWrapper';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('ModalWrapper', () => {
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      id: 'modal',
      buttonTriggerText: 'Test Modal',
      buttonTriggerClassName: 'btn-trigger',
      modalHeading: 'Transactional Modal',
      modalLabel: 'Test Modal Label',
      primaryButtonText: 'Save',
      secondaryButtonText: 'Cancel',
      handleSubmit: jest.fn(() => true),
      shouldCloseAfterSubmit: true,
      'aria-label': 'test modal',
    };
  });

  it('should render', () => {
    const wrapper = mount(
      <ModalWrapper {...mockProps}>
        <p className={`${prefix}--modal-content__text`}>Text</p>
      </ModalWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should close after a successful submit action', () => {
    const wrapper = mount(
      <ModalWrapper {...mockProps}>
        <p className={`${prefix}--modal-content__text`}>Text</p>
      </ModalWrapper>
    );
    wrapper.find({ children: mockProps.buttonTriggerText }).simulate('click');
    expect(wrapper.state('isOpen')).toBe(true);

    wrapper.find({ children: mockProps.primaryButtonText }).simulate('click');
    expect(wrapper.state('isOpen')).toBe(false);
  });

  it('should return focus to the trigger button after closing', () => {
    const wrapper = mount(
      <ModalWrapper {...mockProps}>
        <p className={`${prefix}--modal-content__text`}>Text</p>
      </ModalWrapper>
    );
    const { triggerButton } = wrapper.instance();
    jest.spyOn(triggerButton.current, 'focus');
    wrapper.find({ children: mockProps.buttonTriggerText }).simulate('click');
    wrapper.find({ children: mockProps.primaryButtonText }).simulate('click');
    expect(triggerButton.current.focus).toHaveBeenCalledTimes(1);
  });

  it('should not close after an unsuccessful submit action', () => {
    mockProps.handleSubmit = jest.fn(() => false);
    const wrapper = mount(
      <ModalWrapper {...mockProps}>
        <p className={`${prefix}--modal-content__text`}>Text</p>
      </ModalWrapper>
    );
    wrapper.find({ children: mockProps.buttonTriggerText }).simulate('click');
    expect(wrapper.state('isOpen')).toBe(true);

    wrapper.find({ children: mockProps.primaryButtonText }).simulate('click');
    expect(wrapper.state('isOpen')).toBe(true);
  });
});
