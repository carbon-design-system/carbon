import React from 'react';
import ModulesContainer from '../ModulesContainer';
import Module from '../Module';
import { shallow } from 'enzyme';

describe('ModuleContainer', () => {
  describe('Renders as expected', () => {
    const modulesContainer = shallow(
      <ModulesContainer className="extra-class"><Module /></ModulesContainer>
    );

    it('renders a ModuleContainer', () => {
      expect(modulesContainer.length).toEqual(1);
    });

    it('has the expected class', () => {
      expect(modulesContainer.hasClass('bx--module')).toEqual(true);
      expect(modulesContainer.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(modulesContainer.find('Module').length).toEqual(1);
    });
  });
});
