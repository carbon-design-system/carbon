import React from 'react';
import TourTooltip from '../TourTooltip';
import { shallow } from 'enzyme';
import Checkbox from '../Checkbox';

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

    it('contains a checkbox by default', () => {
      expect(wrapper.find(Checkbox).length).toEqual(1);
    });

    it('contains three buttons by default', () => {
      expect(wrapper.find('button').length).toEqual(3);
    });

    it('contains the description text', () => {
      const descRegExp = new RegExp(description);
      expect(descRegExp.test(wrapper.text())).toEqual(true);
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
        hideClose
        hideCheckbox
        description={description}
      />
    );

    it('still renders the tooltip', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('only has a single button', () => {
      expect(wrapper.find('button').length).toEqual(1);
    });

    it('does not have a checkbox', () => {
      expect(wrapper.find(Checkbox).length).toEqual(0);
    });
  });
});
