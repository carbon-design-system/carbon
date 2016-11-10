import React from 'react';
import CardStatus from '../CardStatus';
import { shallow } from 'enzyme';

describe('CardStatus', () => {
  describe('Renders as expected with defaultProps', () => {
    const wrapper = shallow(
      <CardStatus className="extra-class" />
    );

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--card-footer__app-status')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('renders status div', () => {
      const statusDiv = wrapper.childAt(0);
      expect(statusDiv.hasClass('bx--card-footer__app-status--running active')).toBe(true);

      const status = statusDiv.childAt(0);
      expect(status.hasClass('bx--running__text')).toBe(true);
      expect(status.props().children).toBe('Running');
    });
  });

  describe('Renders as expected with specified props', () => {
    const wrapper = shallow(
      <CardStatus status={1} />
    );

    it('renders status div', () => {
      const statusDiv = wrapper.childAt(0);
      expect(statusDiv.hasClass('bx--card-footer__app-status--not-running active')).toBe(true);

      const status = statusDiv.childAt(0);
      expect(status.hasClass('bx--not-running__text')).toBe(true);
      expect(status.props().children).toBe('Not Running');
    });

    it('renders nothing for invalid status (not between 0-2)', () => {
      wrapper.setProps({ status: 3 });
      expect(wrapper.props().children).toBe('');
    });
  });

  describe('updates appropriately on prop changes', () => {
    const wrapper = shallow(
      <CardStatus />
    );

    it('updates from Running to Not Running', () => {
      const oldStatus = wrapper.childAt(0).childAt(0);
      expect(oldStatus.hasClass('bx--running__text')).toBe(true);
      expect(oldStatus.props().children).toBe('Running');

      wrapper.setProps({ status: 1 });
      const newStatus = wrapper.childAt(0).childAt(0);
      expect(newStatus.hasClass('bx--not-running__text')).toBe(true);
      expect(newStatus.props().children).toBe('Not Running');
    });

    it('updates from Not Running to Stopped', () => {
      const oldStatus = wrapper.childAt(0).childAt(0);
      expect(oldStatus.hasClass('bx--not-running__text')).toBe(true);
      expect(oldStatus.props().children).toBe('Not Running');

      wrapper.setProps({ status: 2 });
      const newStatus = wrapper.childAt(0).childAt(0);
      expect(newStatus.hasClass('bx--stopped__text')).toBe(true);
      expect(newStatus.props().children).toBe('Stopped');
    });
  });
});
