/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import { shallow, mount } from 'enzyme';
import Tabs from '../Tabs';
import Tab from '../Tab';
import TabsSkeleton from '../Tabs/Tabs.Skeleton';

const { prefix } = settings;

Element.prototype.scrollIntoView = jest.fn();

describe('Tabs', () => {
  describe('renders as expected', () => {
    describe('navigation (<div>)', () => {
      const wrapper = shallow(
        <Tabs className="extra-class">
          <Tab label="firstTab">content1</Tab>
          <Tab label="lastTab">content2</Tab>
        </Tabs>
      );

      it('renders [role="navigation"] props on wrapping <div> by default', () => {
        expect(wrapper.find(`.${prefix}--tabs`).props().role).toEqual(
          'navigation'
        );
      });

      it('renders [role="tablist"] props on <ul> by default', () => {
        expect(wrapper.find('ul').props().role).toEqual('tablist');
      });

      it('renders extra classes on wrapping <div> via className prop', () => {
        expect(wrapper.find(`.${prefix}--tabs`).hasClass('extra-class')).toBe(
          true
        );
      });

      it('renders expected classes on wrapping <div> by default', () => {
        expect(wrapper.find('div').first().hasClass(`${prefix}--tabs`)).toBe(
          true
        );
      });

      it('supports container variant', () => {
        expect(
          shallow(
            <Tabs className="extra-class" type="container">
              <Tab label="firstTab">content1</Tab>
              <Tab label="lastTab">content2</Tab>
            </Tabs>
          )
            .find('div')
            .first()
            .hasClass(`${prefix}--tabs--container`)
        ).toBe(true);
      });

      it('has no selectionMode prop', () => {
        expect(
          'selectionMode' in wrapper.find(`.${prefix}--tabs`).props()
        ).toBe(false);
      });
    });

    describe('Children (<Tab>)', () => {
      const wrapper = shallow(
        <Tabs>
          <Tab label="firstTab">content1</Tab>
          <Tab label="lastTab">content2</Tab>
        </Tabs>
      );

      const firstTab = wrapper.find('[label="firstTab"]');
      const lastTab = wrapper.find('[label="lastTab"]');

      it('renders children as expected', () => {
        expect(wrapper.props().children.length).toEqual(2);
      });

      it('renders index prop', () => {
        expect(firstTab.props().index).toEqual(0);
        expect(lastTab.props().index).toEqual(1);
      });

      it('renders selected prop (where firstTab is selected by default)', () => {
        expect(firstTab.props().selected).toEqual(true);
        expect(lastTab.props().selected).toEqual(false);
      });
    });
  });

  describe('Children (<TabContent>)', () => {
    const wrapper = shallow(
      <Tabs>
        <Tab label="firstTab">content1</Tab>
        <Tab label="lastTab">content2</Tab>
      </Tabs>
    );

    it('renders content children as expected', () => {
      expect(wrapper.find('TabContent').length).toEqual(2);
    });

    it('allows for custom classNames on <TabContent>', () => {
      const customTabContentClassWrapper = shallow(
        <Tabs tabContentClassName="tab-content">
          <Tab label="firstTab">content1</Tab>
          <Tab label="lastTab">content2</Tab>
        </Tabs>
      );
      expect(customTabContentClassWrapper.find('.tab-content').length).toEqual(
        2
      );
    });

    it('renders hidden props with boolean value', () => {
      const hiddenProp = wrapper.find('TabContent').first().props().hidden;
      expect(typeof hiddenProp).toBe('boolean');
    });

    it('renders selected props with boolean value', () => {
      const selectedProp = wrapper.find('TabContent').first().props().hidden;
      expect(typeof selectedProp).toBe('boolean');
    });
  });

  describe('events', () => {
    describe('keydown', () => {
      const leftKey = 37;
      const rightKey = 39;
      const spaceKey = 32;
      const enterKey = 13;

      let wrapper;
      let firstTab;
      let lastTab;
      let anchorInFirstTab;
      let anchorInLastTab;
      let spyFocusAnchorInFirstTab;
      let spyFocusAnchorInLastTab;

      describe('state: selected', () => {
        beforeEach(() => {
          wrapper = mount(
            <Tabs selected={0}>
              <Tab label="firstTab" className="firstTab">
                content
              </Tab>
              <Tab label="lastTab" className="lastTab">
                content
              </Tab>
            </Tabs>
          );
          firstTab = wrapper.find('.firstTab').last();
          lastTab = wrapper.find('.lastTab').last();
          anchorInFirstTab = firstTab.find('a').getDOMNode();
          anchorInLastTab = lastTab.find('a').getDOMNode();
        });

        it('updates selected state when pressing arrow keys', () => {
          spyFocusAnchorInFirstTab = jest.spyOn(anchorInFirstTab, 'focus');
          spyFocusAnchorInLastTab = jest.spyOn(anchorInLastTab, 'focus');
          firstTab.simulate('keydown', { which: rightKey });
          expect(spyFocusAnchorInLastTab).toHaveBeenCalled();
          lastTab.simulate('keydown', { which: leftKey });
          expect(spyFocusAnchorInFirstTab).toHaveBeenCalled();
        });

        it('loops focus and selected state from lastTab to firstTab', () => {
          spyFocusAnchorInFirstTab = jest.spyOn(anchorInFirstTab, 'focus');
          lastTab.simulate('keydown', { which: rightKey });
          expect(spyFocusAnchorInFirstTab).toHaveBeenCalled();
        });

        it('loops focus and selected state from firstTab to lastTab', () => {
          spyFocusAnchorInLastTab = jest.spyOn(anchorInLastTab, 'focus');
          firstTab.simulate('keydown', { which: leftKey });
          expect(spyFocusAnchorInLastTab).toHaveBeenCalled();
        });

        it('updates selected state when pressing space or enter key', () => {
          firstTab.simulate('keydown', { which: spaceKey });
          expect(wrapper.state().selected).toEqual(0);
          lastTab.simulate('keydown', { which: enterKey });
          expect(wrapper.state().selected).toEqual(1);
        });
      });

      describe('ignore disabled child tab', () => {
        beforeEach(() => {
          wrapper = mount(
            <Tabs>
              <Tab label="firstTab" className="firstTab">
                content1
              </Tab>
              <Tab label="middleTab" className="middleTab" disabled>
                content2
              </Tab>
              <Tab label="lastTab" className="lastTab">
                content3
              </Tab>
            </Tabs>
          );
          firstTab = wrapper.find('.firstTab').last();
          lastTab = wrapper.find('.lastTab').last();
          anchorInFirstTab = firstTab.find('a').getDOMNode();
          anchorInLastTab = lastTab.find('a').getDOMNode();
        });
        it('updates selected state when pressing arrow keys', () => {
          spyFocusAnchorInFirstTab = jest.spyOn(anchorInFirstTab, 'focus');
          spyFocusAnchorInLastTab = jest.spyOn(anchorInLastTab, 'focus');
          firstTab.simulate('keydown', { which: rightKey });
          expect(spyFocusAnchorInLastTab).toHaveBeenCalled();
          lastTab.simulate('keydown', { which: leftKey });
          expect(spyFocusAnchorInFirstTab).toHaveBeenCalled();
        });

        it('loops focus and selected state from lastTab to firstTab', () => {
          spyFocusAnchorInFirstTab = jest.spyOn(anchorInFirstTab, 'focus');
          wrapper.setState({ selected: 2 });
          lastTab.simulate('keydown', { which: rightKey });
          expect(spyFocusAnchorInFirstTab).toHaveBeenCalled();
        });

        it('loops focus and selected state from firstTab to lastTab', () => {
          spyFocusAnchorInLastTab = jest.spyOn(anchorInLastTab, 'focus');
          firstTab.simulate('keydown', { which: leftKey });
          expect(spyFocusAnchorInLastTab).toHaveBeenCalled();
        });

        it('updates selected state when pressing space or enter key', () => {
          firstTab.simulate('keydown', { which: spaceKey });
          expect(wrapper.state().selected).toEqual(0);
          lastTab.simulate('keydown', { which: enterKey });
          expect(wrapper.state().selected).toEqual(2);
        });
      });

      afterEach(() => {
        if (spyFocusAnchorInLastTab) {
          spyFocusAnchorInLastTab.mockRestore();
          spyFocusAnchorInLastTab = null;
        }
        if (spyFocusAnchorInFirstTab) {
          spyFocusAnchorInFirstTab.mockRestore();
          spyFocusAnchorInFirstTab = null;
        }
      });
    });
  });

  describe('default state', () => {
    const wrapper = mount(
      <Tabs>
        <Tab label="firstTab" className="firstTab">
          content
        </Tab>
        <Tab label="lastTab" className="lastTab">
          content
        </Tab>
      </Tabs>
    );

    describe('selected', () => {
      it('should be 0', () => {
        expect(wrapper.state().selected).toEqual(0);
      });
    });
  });

  describe('Allow initial state to draw from props', () => {
    const wrapper = mount(
      <Tabs selected={1}>
        <Tab label="firstTab" className="firstTab">
          content
        </Tab>
        <Tab label="lastTab" className="lastTab">
          content
        </Tab>
      </Tabs>
    );

    const children = wrapper.find(Tab);

    it('Should apply the selected property on the selected tab', () => {
      expect(children.first().props().selected).toEqual(false);
      expect(children.last().props().selected).toEqual(true);
    });
  });
});

describe('props update', () => {
  const wrapper = mount(
    <Tabs selected={0}>
      <Tab label="firstTab" className="firstTab">
        content
      </Tab>
      <Tab label="lastTab" className="lastTab">
        content
      </Tab>
    </Tabs>
  );

  it('updates selected state when selected prop changes', () => {
    wrapper.setProps({ selected: 1 });
    expect(wrapper.state().selected).toEqual(1);
    wrapper.setProps({ selected: 0 });
    expect(wrapper.state().selected).toEqual(0);
  });

  it('avoids updating state upon setting props, unless there the value actually changes', () => {
    wrapper.setProps({ selected: 1 });
    wrapper.setState({ selected: 2 });
    wrapper.setProps({ selected: 1 });
    expect(wrapper.state().selected).toEqual(2);
  });
});

describe('selection change', () => {
  const wrapper = mount(
    <Tabs selected={0} onSelectionChange={jest.fn()}>
      <Tab label="firstTab">content</Tab>
      <Tab label="lastTab" className="secondTab">
        content
      </Tab>
    </Tabs>
  );

  it('updates selected state when selected prop changes', () => {
    wrapper.find('.secondTab').last().simulate('click');
    expect(wrapper.props().onSelectionChange).toHaveBeenCalledWith(1);
  });
});

describe('TabsSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<TabsSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--tabs`)).toEqual(true);
    });
  });
});
