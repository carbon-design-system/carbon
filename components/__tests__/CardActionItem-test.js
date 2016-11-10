import React from 'react';
import CardActionItem from '../CardActionItem';
import { shallow } from 'enzyme';

describe('CardActionItem', () => {
  describe('Renders as expected', () => {
    const props = {
      className: 'extra-class',
      id: 'testId',
      ariaLabel: 'testLabel',
      iconName: 'testName',
      description: 'testDescription',
    };
    const wrapper = shallow(
      <CardActionItem {...props} />
    );

    describe('Renders button as expected', () => {
      it('has the expected classes', () => {
        expect(wrapper.hasClass('bx--app-actions__button')).toEqual(true);
      });

      it('renders extra classes passed in via className', () => {
        expect(wrapper.hasClass('extra-class')).toEqual(true);
      });

      it('has id passed in via props', () => {
        expect(wrapper.props().id).toEqual('testId');
      });

      it('has ariaLabel passed in via props', () => {
        expect(wrapper.props()['aria-label']).toEqual('testLabel');
      });
    });

    describe('Renders Icon as expected', () => {
      const Icon = wrapper.find('Icon');

      it('Icon should have expected class', () => {
        expect(Icon.hasClass('bx--app-actions__button--icon')).toEqual(true);
      });

      it('Icon has specified name', () => {
        expect(Icon.props().name).toEqual('testName');
      });

      it('Icon has specified description', () => {
        expect(Icon.props().description).toEqual('testDescription');
      });
    });
  });
});
