import React from 'react';
import TourTooltip from '../TourTooltip';
import { shallow } from 'enzyme';

describe('TourTooltip', () => {
  describe('default configuration', () => {
    const description = "This is the tooltip's description.";
    const wrapper = shallow(
      <TourTooltip
        onNext={() => alert('next')}
        onClose={() => alert('close')}
        onPrev={() => alert('prev')}
        description={description}
      />
    );

    it('renders the tooltip as expected', () => {
      expect(wrapper.children.length).toEqual(1);
    });

    it('contains two buttons by default', () => {
      expect(wrapper.find('button').length).toEqual(2);
    });
  });

  describe('hide functionality options', () => {
    const description = "This is the tooltip's description.";
    const wrapper = shallow(
      <TourTooltip
        onNext={() => alert('next')}
        onClose={() => alert('close')}
        onPrev={() => alert('prev')}
        hidePrev
        description={description}
      />
    );

    it('still renders the tooltip', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('only has a single button', () => {
      expect(wrapper.find('button').length).toEqual(1);
    });
  });
});
