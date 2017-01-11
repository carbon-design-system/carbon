import React from 'react';
import ProgressIndicator from '../ProgressIndicator';
import ProgressIndicatorStep from '../ProgressIndicatorStep';
import { shallow, mount } from 'enzyme';

describe('ProgressIndicator', () => {
  describe('Renders as expected', () => {
    const list = shallow(
      <ProgressIndicator className="some-class"><ProgressIndicatorStep>Step 1</ProgressIndicatorStep></ProgressIndicator>
    );

    it('should be a ul element', () => {
      expect(list.find('ul').length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(list.hasClass('bx--progress-indicator')).toEqual(true);
      expect(list.hasClass('some-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(list.find(ProgressIndicatorStep).length).toEqual(1);
    });

    it('should flag steps before the active one as complete', () => {
      const indicator = mount(
        <ProgressIndicator className="some-class">
          <ProgressIndicatorStep>Step 1</ProgressIndicatorStep>
          <ProgressIndicatorStep active>Step 2</ProgressIndicatorStep>
          <ProgressIndicatorStep>Step 3</ProgressIndicatorStep>
        </ProgressIndicator>
      );
      const steps = indicator.find(ProgressIndicatorStep);
      expect(steps.at(0).props().complete).toBe(true);
      expect(steps.at(1).props().complete).toBe(false);
      expect(steps.at(2).props().complete).toBe(false);
    });
  });
});
