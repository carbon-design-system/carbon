import React from 'react';
import { Module, ModuleBody } from '../Module';
import { shallow } from 'enzyme';

describe('Module', () => {
  describe('Renders as expected', () => {
    const testModule = shallow(
      <Module className="extra-class">
        <ModuleBody>Body</ModuleBody>
      </Module>
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

  describe('ModuleBody', () => {
    describe('Renders as expected', () => {
      const moduleBody = shallow(
        <ModuleBody className="extra-class" centered>
          Body
        </ModuleBody>
      );

      it('renders a ModuleBody', () => {
        expect(moduleBody.length).toEqual(1);
      });

      it('has the expected class', () => {
        expect(moduleBody.hasClass('bx--module__content')).toEqual(true);
        expect(moduleBody.hasClass('extra-class')).toEqual(true);
      });

      it('has the centered class when centered prop is true', () => {
        expect(moduleBody.hasClass('bx--module__content--centered')).toEqual(
          true
        );
      });

      it('should render children as expected', () => {
        expect(moduleBody.text()).toEqual('Body');
      });
    });
  });
});
