import React from 'react';
import InternalButton from '../InternalButton';
import { shallow } from 'enzyme';

describe('InternalButton', () => {
  describe('Renders common props as expected', () => {
    const wrapper = shallow(
      <InternalButton tabIndex={2} className="extra-class">
        <div className="child">child</div>
        <div className="child">child</div>
      </InternalButton>
    );

    const wrapperHref = shallow(
      <InternalButton tabIndex={2} className="extra-class" href="/home">
        <div className="child">child</div>
        <div className="child">child</div>
      </InternalButton>
    );

    it('Renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(2);
      expect(wrapperHref.find('.child').length).toBe(2);
    });

    it('Should set tabIndex if one is passed via props', () => {
      expect(wrapper.props().tabIndex).toEqual(2);
      expect(wrapperHref.props().tabIndex).toEqual(2);
    });

    it('Should add extra classes via className', () => {
      expect(wrapper.hasClass('extra-class')).toBe(true);
      expect(wrapperHref.hasClass('extra-class')).toBe(true);
    });
  });

  describe('Renders <button> props as expected', () => {
    const wrapper = shallow(
      <InternalButton tabIndex={2}>
        <div className="child">child</div>
        <div className="child">child</div>
      </InternalButton>
    );

    it('Renders as a <button> element without an href', () => {
      expect(wrapper.is('button')).toBe(true);
    });

    it('Should set disabled to false by default', () => {
      expect(wrapper.props().disabled).toBe(false);
    });

    it('Should set disabled if one is passed via props', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.props().disabled).toBe(true);
    });

    it('Should set type to button by default', () => {
      expect(wrapper.props().type).toEqual('button');
    });

    it('Should only set type to [button, reset or submit] if one is passed via props', () => {
      wrapper.setProps({ type: 'reset' });
      expect(wrapper.props().type).toEqual('reset');
      wrapper.setProps({ type: 'submit' });
      expect(wrapper.props().type).toEqual('submit');
    });
  });

  describe('Renders <a> props as expected', () => {
    const wrapper = shallow(
      <InternalButton href="#" tabIndex={2}>
        <div className="child">child</div>
        <div className="child">child</div>
      </InternalButton>
    );

    it('Renders as an <a> element with an href', () => {
      expect(wrapper.is('a')).toBe(true);
    });

    it('Should always render with [role="button"] by default', () => {
      expect(wrapper.props().role).toEqual('button');
    });
  });
});
