import React from 'react';
import { Module, ModuleBody } from '../Module';
import { shallow } from 'enzyme';

describe('Module', () => {
  describe('Renders as expected', () => {
    const testModule = shallow(
      <Module className="extra-class"><ModuleBody>Body</ModuleBody></Module>
    );

    it('renders a Module', () => {
      expect(testModule.length).toEqual(1);
    });

    it('should render the appropriate classes', () => {
      expect(testModule.hasClass('bx--module--double')).toEqual(true);
      expect(testModule.hasClass('extra-class')).toEqual(true);
    });

    it('should render with specified class', () => {
      testModule.setProps({ size: 'single' });
      expect(testModule.hasClass('bx--module--single')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(testModule.find(ModuleBody).length).toEqual(1);
    });
  });
});
