import React from 'react';
import ModuleBody from '../ModuleBody';
import { shallow } from 'enzyme';

describe('ModuleBody', () => {
  describe('Renders as expected', () => {
    const moduleBody = shallow(
      <ModuleBody className="extra-class">Body</ModuleBody>
    );

    it('renders a ModuleBody', () => {
      expect(moduleBody.length).toEqual(1);
    });

    it('has the expected class', () => {
      expect(moduleBody.hasClass('bx--module__body')).toEqual(true);
      expect(moduleBody.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(moduleBody.text()).toEqual('Body');
    });
  });
});
