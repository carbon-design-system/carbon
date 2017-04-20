import React from 'react';
import { ModuleHeader } from '../Module';
import { shallow } from 'enzyme';

describe('ModuleHeader', () => {
  describe('Renders as expected', () => {
    const moduleHeader = shallow(
      <ModuleHeader className="extra-class">Header</ModuleHeader>,
    );

    it('renders a ModuleHeader', () => {
      expect(moduleHeader.length).toEqual(1);
    });

    it('has the expected class', () => {
      expect(moduleHeader.hasClass('bx--module__header')).toEqual(true);
      expect(moduleHeader.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(moduleHeader.text()).toEqual('Header');
    });
  });
});
