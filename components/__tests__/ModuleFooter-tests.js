import React from 'react';
import ModuleFooter from '../ModuleFooter';
import { shallow } from 'enzyme';

describe('ModuleFooter', () => {
  describe('Renders as expected', () => {
    const moduleFooter = shallow(
      <ModuleFooter className="extra-class">Footer</ModuleFooter>
    );

    it('renders a ModuleFooter', () => {
      expect(moduleFooter.length).toEqual(1);
    });

    it('has the expected class', () => {
      expect(moduleFooter.hasClass('bx--module__footer')).toEqual(true);
      expect(moduleFooter.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(moduleFooter.text()).toEqual('Footer');
    });
  });
});
