import React from 'react';
import { ProgressIndicator, ProgressStep } from '../ProgressIndicator';
import ProgressIndicatorSkeleton from '../ProgressIndicator/ProgressIndicator.Skeleton';
import { shallow, mount } from 'enzyme';

describe('ProgressIndicator', () => {
  describe('Renders as expected', () => {
    const progress = (
      <ProgressIndicator className="some-class" currentIndex={3}>
        <ProgressStep
          label="label"
          description="Step 1: Getting Started with Node.js"
        />
        <ProgressStep
          label="label"
          description="Step 2: Getting Started with Node.js"
        />
        <ProgressStep
          label="label"
          description="Step 3: Getting Started with Node.js"
        />
        <ProgressStep
          label="label"
          description="Step 4: Getting Started with Node.js"
        />
        <ProgressStep
          label="label"
          description="Step 5: Getting Started with Node.js"
        />
        <ProgressStep
          label="label"
          description="Step 6: Getting Started with Node.js"
        />
      </ProgressIndicator>
    );
    const list = shallow(progress);
    const mountedList = mount(progress);

    it('should be a ul element', () => {
      expect(list.find('ul').length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(list.hasClass('bx--progress')).toEqual(true);
      expect(list.hasClass('some-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(list.find(ProgressStep).length).toEqual(6);
    });

    it('should update state when currentIndex is changed', () => {
      mountedList.setProps({ currentIndex: 1 });
      expect(mountedList.state().currentIndex).toEqual(
        mountedList.props().currentIndex
      );
      mountedList.setProps({ currentIndex: 3 });
    });

    describe('ProgressStep', () => {
      it('should render with correct base className', () => {
        expect(
          mountedList
            .find(ProgressStep)
            .at(0)
            .children()
            .hasClass('bx--progress-step')
        ).toEqual(true);
      });

      it('should render with a label', () => {
        expect(
          mountedList
            .find(ProgressStep)
            .at(0)
            .prop('label')
        ).toEqual('label');
      });

      it('should render with a description', () => {
        expect(
          mountedList
            .find(ProgressStep)
            .at(0)
            .prop('description')
        ).toEqual('Step 1: Getting Started with Node.js');
      });

      it('should render description in <title> node', () => {
        expect(
          mountedList
            .find('ProgressStep title')
            .at(0)
            .text()
        ).toEqual('Step 1: Getting Started with Node.js');
      });

      describe('current', () => {
        it('should render a current ProgressStep with correct className', () => {
          expect(
            mountedList
              .find(ProgressStep)
              .at(3)
              .children()
              .hasClass('bx--progress-step--current')
          ).toEqual(true);
        });

        it('should render a current ProgressStep with correct props', () => {
          expect(
            list
              .find(ProgressStep)
              .at(3)
              .prop('current')
          ).toBe(true);
        });
      });

      describe('complete', () => {
        it('should render any completed ProgressSteps with correct className', () => {
          expect(
            mountedList
              .find(ProgressStep)
              .at(0)
              .children()
              .hasClass('bx--progress-step--complete')
          ).toEqual(true);
        });
        it('should render any completed ProgressSteps with correct props', () => {
          expect(
            list
              .find(ProgressStep)
              .at(0)
              .prop('complete')
          ).toBe(true);
        });
      });

      describe('incomplete', () => {
        it('should render any incompleted ProgressSteps with correct className', () => {
          expect(
            mountedList
              .find(ProgressStep)
              .at(5)
              .children()
              .hasClass('bx--progress-step--incomplete')
          ).toEqual(true);
        });
        it('should render any incompleted ProgressSteps with correct className', () => {
          expect(
            list
              .find(ProgressStep)
              .at(5)
              .prop('complete')
          ).toBe(false);
        });
      });
    });
  });
});

describe('ProgressIndicatorSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<ProgressIndicatorSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton')).toEqual(true);
      expect(wrapper.hasClass('bx--progress')).toEqual(true);
    });
  });
});
