import React from 'react';
import Icon from '../Icon';
import Modal from '../Modal';
import ModalWrapper from '../ModalWrapper';
import { shallow, mount } from 'enzyme';

describe('Modal', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Modal className="extra-class" />);
    const mounted = mount(<Modal className="extra-class" />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--modal')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should not be a passive modal by default', () => {
      expect(wrapper.hasClass('bx--modal-tall')).toEqual(true);
    });

    it('should be a passive modal when passiveModal is passed', () => {
      wrapper.setProps({ passiveModal: true });
      expect(wrapper.hasClass('bx--modal-tall')).toEqual(false);
    });

    it('should set id if one is passed via props', () => {
      const modal = shallow(<Modal id="modal-1" />);
      expect(modal.props().id).toEqual('modal-1');
    });

    it('has the expected default iconDescription', () => {
      expect(mounted.props().iconDescription).toEqual('close the modal');
    });

    it('adds new iconDescription when passed via props', () => {
      mounted.setProps({ iconDescription: 'new description' });
      expect(mounted.props().iconDescription).toEqual('new description');
    });

    it('should have iconDescription match Icon component description prop', () => {
      const matches =
        mounted.props().iconDescription ===
        mounted.find(Icon).props().description;
      expect(matches).toEqual(true);
    });

    it('enables primary button by default', () => {
      const primaryButton = mounted
        .find('.bx--modal__buttons-container .bx--btn')
        .at(0);
      expect(primaryButton.prop('disabled')).toEqual(false);
    });

    it('disables primary button when diablePrimaryButton prop is passed', () => {
      mounted.setProps({ primaryButtonDisabled: true });
      const primaryButton = mounted
        .find('.bx--modal__buttons-container .bx--btn')
        .at(1);
      expect(primaryButton.props().disabled).toEqual(true);
    });
  });

  describe('Adds props as expected to the right children', () => {
    it('should set label if one is passed via props', () => {
      const wrapper = shallow(<Modal modalLabel="modal-1" />);
      const label = wrapper.find('.bx--modal-header__label');
      expect(label.props().children).toEqual('modal-1');
    });

    it('should set modal heading if one is passed via props', () => {
      const wrapper = shallow(<Modal modalHeading="modal-1" />);
      const heading = wrapper.find('.bx--modal-header__heading');
      expect(heading.props().children).toEqual('modal-1');
    });

    it('should set button text if one is passed via props', () => {
      const wrapper = shallow(
        <Modal primaryButtonText="Submit" secondaryButtonText="Cancel" />
      );
      const modalButtons = wrapper.find('.bx--modal__buttons-container').props()
        .children;
      expect(modalButtons[0].props.children).toEqual('Cancel');
      expect(modalButtons[1].props.children).toEqual('Submit');
    });
  });

  describe('events', () => {
    it('should set expected class when state is open', () => {
      const wrapper = mount(<ModalWrapper />);
      const modal = wrapper.find(Modal);
      const modalContainer = modal.find('.bx--modal');
      const openClass = 'is-visible';

      expect(modalContainer.hasClass(openClass)).not.toEqual(true);
      wrapper.setState({ open: true });
      expect(wrapper.find('.bx--modal').hasClass(openClass)).toEqual(true);
    });

    it('should set state to open when trigger button is clicked', () => {
      const wrapper = mount(<ModalWrapper />);
      const triggerBtn = wrapper.children().childAt(0);
      expect(wrapper.state().open).not.toEqual(true);
      triggerBtn.simulate('click');
      expect(wrapper.state().open).toEqual(true);
    });

    it('should set open state to false when close button is clicked', () => {
      const wrapper = mount(<ModalWrapper />);
      const modal = wrapper.find(Modal);
      const closeBtn = modal.find('.bx--modal-close');
      wrapper.setState({ open: true });
      expect(wrapper.state().open).toEqual(true);
      closeBtn.simulate('click');
      expect(wrapper.state().open).not.toEqual(true);
    });

    it('should stay open when "inner modal" is clicked', () => {
      const wrapper = mount(<ModalWrapper />);
      const modal = wrapper.find(Modal);
      const div = modal.find('.bx--modal-container');
      wrapper.setState({ open: true });
      div.simulate('click');
      expect(wrapper.state().open).toEqual(true);
    });

    it('should close when "outer modal" is clicked...not "inner modal"', () => {
      const wrapper = mount(<ModalWrapper />);
      const modal = wrapper.find(Modal);
      const div = modal.find('.bx--modal');
      wrapper.setState({ open: true });
      div.simulate('click');
      expect(wrapper.state().open).toEqual(false);
    });

    it('should handle keyDown events', () => {
      const onRequestClose = jest.fn();
      const wrapper = mount(<Modal onRequestClose={onRequestClose} />);
      wrapper.simulate('keyDown', { which: 26 });
      expect(onRequestClose).not.toBeCalled();
      wrapper.simulate('keyDown', { which: 27 });
      expect(onRequestClose).toBeCalled();
    });

    it('should close by default on secondary button click', () => {
      const onRequestClose = jest.fn();
      const modal = mount(<Modal onRequestClose={onRequestClose} />);
      const secondaryBtn = modal.find('.bx--btn--secondary');
      secondaryBtn.simulate('click');
      expect(onRequestClose).toBeCalled();
    });

    it('should handle custom secondary button events', () => {
      const onSecondarySubmit = jest.fn();
      const modal = mount(<Modal onSecondarySubmit={onSecondarySubmit} />);
      const secondaryBtn = modal.find('.bx--btn--secondary');
      secondaryBtn.simulate('click');
      expect(onSecondarySubmit).toBeCalled();
    });
  });
});
describe('Modal Wrapper', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(<ModalWrapper />);

    it('should default to primary button', () => {
      expect(wrapper.find('.bx--btn--primary').length).toEqual(2);
    });

    it('should render ghost button when ghost is passed', () => {
      wrapper.setProps({ triggerButtonkind: 'ghost' });
      expect(wrapper.find('.bx--btn--ghost').length).toEqual(1);
    });

    it('should render danger button when danger is passed', () => {
      wrapper.setProps({ triggerButtonkind: 'danger' });
      expect(wrapper.find('.bx--btn--danger').length).toEqual(1);
    });

    it('should render secondary button when secondary is passed', () => {
      wrapper.setProps({ triggerButtonkind: 'secondary' });
      expect(wrapper.find('.bx--btn--secondary').length).toEqual(2);
    });
  });
});
