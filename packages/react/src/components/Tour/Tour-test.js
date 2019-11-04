import React from 'react';
import Tour from '../Tour';
import TourTooltip from '../TourTooltip';
import { mount } from 'enzyme';

const description = 'Tooltip description for a tour step.';

const steps = {
  default: () => [
    {
      selector: null,
      description: description,
    },
  ],
};

describe('Tour', () => {
  describe('renders as expected', () => {
    const wrapper = mount(<Tour steps={steps.default()} />);

    it('renders the tooltip', () => {
      expect(wrapper.find(TourTooltip).length).toEqual(1);
    });

    it('passes content to tooltip through steps', () => {
      const descRegExp = new RegExp(description);
      expect(descRegExp.test(wrapper.text())).toEqual(true);
    });
  });
});
