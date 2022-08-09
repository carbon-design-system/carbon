/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import ComposedModal from './ComposedModal';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';

const prefix = 'cds';

describe('<ComposedModal />', () => {
  let container;

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    container = null;
  });

  it('renders', () => {
    const wrapper = mount(<ComposedModal open />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with a ref', () => {
    const ref = React.createRef();
    mount(<ComposedModal open ref={ref} />);
    expect(ref.current).toHaveClass(`${prefix}--modal`);
  });

  it('changes the open state upon change in props', () => {
    const wrapper = mount(<ComposedModal open />);

    expect(
      document.body.classList.contains('cds--body--with-modal-open')
    ).toEqual(true);
    wrapper.setProps({ open: false });
    expect(
      document.body.classList.contains('cds--body--with-modal-open')
    ).toEqual(false);
  });

  it('should change class of <body> upon open state', () => {
    const wrapper = mount(<ComposedModal open />);
    expect(
      document.body.classList.contains('cds--body--with-modal-open')
    ).toEqual(true);
    wrapper.unmount();
    expect(
      document.body.classList.contains('cds--body--with-modal-open')
    ).toEqual(false);
    mount(<ComposedModal open={false} />);
    expect(
      document.body.classList.contains('cds--body--with-modal-open')
    ).toEqual(false);
  });

  it('calls onClick upon user-initiated closing', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <ComposedModal open onClose={onClose}>
        <ModalHeader />
      </ComposedModal>
    );
    const button = wrapper.find(`.${prefix}--modal-close`).first();
    button.simulate('click');
    expect(
      document.body.classList.contains('cds--body--with-modal-open')
    ).toEqual(false);
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('provides a way to prevent upon user-initiated closing', () => {
    const onClose = jest.fn(() => false);
    const wrapper = mount(
      <ComposedModal open onClose={onClose}>
        <ModalHeader />
      </ComposedModal>
    );
    const button = wrapper.find(`.${prefix}--modal-close`).first();
    button.simulate('click');
    expect(
      document.body.classList.contains('cds--body--with-modal-open')
    ).toEqual(true);
  });

  it('should focus on the primary actionable button in ModalFooter by default', () => {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
    mount(
      <ComposedModal open>
        <ModalFooter primaryButtonText="Save" />
      </ComposedModal>,
      { attachTo: document.querySelector('#container') }
    );
    expect(
      document.activeElement.classList.contains(`${prefix}--btn--primary`)
    ).toEqual(true);
  });

  it('should focus on the element that matches selectorPrimaryFocus', () => {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
    mount(
      <ComposedModal open selectorPrimaryFocus={`.${prefix}--modal-close`}>
        <ModalHeader label="Optional Label" title="Example" />
        <ModalFooter primaryButtonText="Save" />
      </ComposedModal>,
      { attachTo: document.querySelector('#container') }
    );
    expect(
      document.activeElement.classList.contains(`${prefix}--modal-close`)
    ).toEqual(true);
  });
});
