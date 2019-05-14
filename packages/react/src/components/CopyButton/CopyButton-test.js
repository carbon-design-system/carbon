/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import CopyButton from '../CopyButton';
import Copy16 from '@carbon/icons-react/lib/copy/16';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;
jest.useFakeTimers();

describe('CopyButton', () => {
  describe('Renders common props as expected', () => {
    const wrapper = shallow(
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      <CopyButton tabIndex={2} className="extra-class" />
    );

    it('Should set tabIndex if one is passed via props', () => {
      expect(wrapper.props().tabIndex).toEqual(2);
    });

    it('Should add extra classes via className', () => {
      expect(wrapper.hasClass('extra-class')).toBe(true);
    });
  });

  describe('Renders button props as expected', () => {
    const wrapper = shallow(<CopyButton />);

    it('Renders children as expected', () => {
      expect(wrapper.is('button')).toBe(true);
      expect(wrapper.hasClass(`${prefix}--snippet-button`)).toBe(true);
      expect(wrapper.find(`.${prefix}--btn--copy__feedback`).length).toBe(1);
      expect(wrapper.find(Copy16).length).toBe(1);
    });

    it('Should be able to disable the button', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.props().disabled).toBe(true);
      wrapper.setProps({ disabled: false });
    });

    it('Should have a default feedback timeout', () => {
      const timeoutWrapper = mount(<CopyButton />);
      expect(timeoutWrapper.props().feedbackTimeout).toBe(2000);
    });

    it('Should be able to set the timeout for displaying feedback', () => {
      const timeoutWrapper = mount(<CopyButton feedbackTimeout={5000} />);
      expect(timeoutWrapper.props().feedbackTimeout).toBe(5000);
    });

    it('Should be able to specify the feedback message', () => {
      const feedbackWrapper = mount(<CopyButton feedback="Copied!" />);
      expect(
        feedbackWrapper.find(`.${prefix}--btn--copy__feedback`).props()[
          'data-feedback'
        ]
      ).toBe('Copied!');
    });
  });

  describe('Renders feedback as expected', () => {
    it('Should make the feedback visible', () => {
      const feedbackWrapper = mount(<CopyButton feedback="Copied!" />);
      const feedback = () =>
        feedbackWrapper.find(`.${prefix}--btn--copy__feedback`);
      expect(
        feedback().hasClass(`${prefix}--btn--copy__feedback--displayed`)
      ).toBe(false);
      feedbackWrapper.setState({ showFeedback: true });
      expect(
        feedback().hasClass(`${prefix}--btn--copy__feedback--displayed`)
      ).toBe(true);
    });

    it('Should show feedback for a limited amount of time', () => {
      const feedbackWrapper = mount(
        <CopyButton feedback="Copied!" feedbackTimeout={5000} />
      );
      expect(feedbackWrapper.state().showFeedback).toBe(false);
      feedbackWrapper.simulate('click');
      expect(feedbackWrapper.state().showFeedback).toBe(true);
      expect(setTimeout.mock.calls.length).toBe(1);
      expect(setTimeout.mock.calls[0][1]).toBe(5000);
      jest.runAllTimers();
      expect(feedbackWrapper.state().showFeedback).toBe(false);
    });
  });

  describe('Triggers appropriate events', () => {
    it('should call the click handler', () => {
      const onClick = jest.fn();
      const clickWrapper = mount(<CopyButton onClick={onClick} />);
      clickWrapper.simulate('click');
      expect(onClick).toBeCalled();
    });
  });
});
