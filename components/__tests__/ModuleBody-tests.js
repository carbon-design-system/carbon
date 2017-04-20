import React from 'react';
import { ModuleBody } from '../Module';
import { shallow } from 'enzyme';

describe('ModuleBody', () => {
  describe('Renders as expected', () => {
    const moduleBody = shallow(
      <ModuleBody className="extra-class" centered>Body</ModuleBody>,
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
        true,
      );
    });

    it('should render children as expected', () => {
      expect(moduleBody.text()).toEqual('Body');
    });
  });
});
