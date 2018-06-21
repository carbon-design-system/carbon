import React from 'react';
import InlineLoading from '../InlineLoading';
import Loading from '../Loading';
import { mount } from 'enzyme';

describe('Loading', () => {
  describe('Default state renders as expected', () => {
    const wrapper = mount(<InlineLoading className="extra-class" />);
    const container = wrapper.find('.bx--inline-loading');

    it('should render with a container', () => {
      expect(container.length).toEqual(1);
    });

    it('shoud render a loader by default', () => {
      expect(wrapper.find(Loading).length).toEqual(1);
    });

    it('container has the expected classes', () => {
      expect(container.hasClass('bx--inline-loading')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(container.hasClass('extra-class')).toEqual(true);
    });

    it('should render an animation container', () => {
      expect(wrapper.find('.bx--inline-loading__animation').length).toEqual(1);
    });

    it('should not render any text', () => {
      expect(wrapper.find('.bx--inline-loading__text').length).toEqual(0);
    });

    it('should not render the SUCCESS state', () => {
      expect(
        wrapper.find('.bx--inline-loading__checkmark-container').length
      ).toEqual(0);
    });
  });

  describe('Text rendered as expected', () => {
    const wrapper = mount(
      <InlineLoading className="extra-class" description="Loading Things..." />
    );

    it('should render the provided description', () => {
      expect(wrapper.find('.bx--inline-loading__text').length).toEqual(1);
      expect(wrapper.find('.bx--inline-loading__text').text()).toEqual(
        'Loading Things...'
      );
    });
  });

  describe('Success state should render properly', () => {
    const wrapper = mount(<InlineLoading success />);

    it('should render the success animation', () => {
      expect(
        wrapper.find('.bx--inline-loading__checkmark-container').length
      ).toEqual(1);
    });

    it('should render the checkmark within the success animation', () => {
      expect(wrapper.find('.bx--inline-loading__checkmark').length).toEqual(1);
    });

    it('should not render the loading component', () => {
      expect(wrapper.find(Loading).length).toEqual(0);
    });

    it('should call the onSuccess function after a delay', done => {
      mount(
        <InlineLoading
          success
          onSuccess={() => {
            done();
          }}
        />
      );
    });
  });
});
