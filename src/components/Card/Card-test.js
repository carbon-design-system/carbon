import React from 'react';
import Card from '../Card';
import { shallow, mount } from 'enzyme';

describe('Card', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Card className="extra-class">
        <div className="child">Test</div>
      </Card>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--card')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('has default tabIndex of 0', () => {
      expect(wrapper.props().tabIndex).toEqual(0);
    });
  });

  describe('Check that functions passed in as props are called', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Card onClick={onClick} />);

    it('should call onClick', () => {
      wrapper.simulate('click');
      expect(onClick).toBeCalled();
    });
  });
});
