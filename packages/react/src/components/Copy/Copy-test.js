/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Copy from '../Copy';
import { shallow, mount } from 'enzyme';

const prefix = 'cds';

jest.useFakeTimers();

describe('Copy', () => {
  describe('Renders common props as expected', () => {
    const wrapper = shallow(
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      <Copy tabIndex={2} className="extra-class" />
    );

    it('Should set tabIndex if one is passed via props', () => {
      expect(wrapper.props().tabIndex).toEqual(2);
    });

    it('Should add extra classes via className', () => {
      expect(wrapper.hasClass('extra-class')).toBe(true);
    });
  });

  describe('Renders button props as expected', () => {
    const wrapper = shallow(<Copy />);

    it('Should be able to disable the button', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.props().disabled).toBe(true);
      wrapper.setProps({ disabled: false });
    });

    it('Should have a default feedback timeout', () => {
      const timeoutWrapper = mount(<Copy />);
      expect(timeoutWrapper.props().feedbackTimeout).toBe(2000);
    });

    it('Should be able to set the timeout for displaying feedback', () => {
      const timeoutWrapper = mount(<Copy feedbackTimeout={5000} />);
      expect(timeoutWrapper.props().feedbackTimeout).toBe(5000);
    });

    it('Should be able to specify the feedback message', () => {
      const feedbackWrapper = mount(<Copy feedback="Copied!" />);
      expect(
        feedbackWrapper.find(`.${prefix}--copy-btn__feedback`).text()
      ).toBe('Copied!');
    });
  });

  describe('Renders feedback as expected', () => {
    it('Should make the feedback visible', () => {
      const feedbackWrapper = mount(<Copy feedback="Copied!" />);
      const feedback = feedbackWrapper.find(`.${prefix}--copy-btn__feedback`);
      expect(feedback).toEqual({});
      feedbackWrapper.simulate('click');
      expect(feedback).toBeTruthy();
    });

    it('Should show feedback for a limited amount of time', () => {
      const feedbackWrapper = mount(
        <Copy feedback="Copied!" feedbackTimeout={5000} />
      );
      feedbackWrapper.simulate('click');
      const copyButton = feedbackWrapper.find('button');
      expect(copyButton.hasClass(`${prefix}--copy-btn--animating`)).toBe(true);
      setTimeout(() => {
        expect(copyButton.hasClass(`${prefix}--copy-btn--animating`)).toBe(
          false
        );
      }, 5220); // 5000 + 2 * 110 (transition duration)
    });
  });

  describe('Triggers appropriate events', () => {
    it('should call the click handler', () => {
      const onClick = jest.fn();
      const clickWrapper = mount(<Copy onClick={onClick} />);
      clickWrapper.simulate('click');
      expect(onClick).toHaveBeenCalled();
    });
  });
});
