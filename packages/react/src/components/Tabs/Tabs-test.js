/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ChevronDownGlyph } from '@carbon/icons-react';
import Tabs from '../Tabs';
import Tab from '../Tab';
import TabsSkeleton from '../Tabs/Tabs.Skeleton';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

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
        expect(
          wrapper
            .find('div')
            .first()
            .hasClass(`${prefix}--tabs`)
        ).toBe(true);
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
    });

    describe('Trigger (<div>)', () => {
      const wrapper = shallow(
        <Tabs className="extra-class">
          <Tab label="firstTab">content1</Tab>
          <Tab label="lastTab">content2</Tab>
        </Tabs>
      );

      const trigger = wrapper.find(`div.${prefix}--tabs-trigger`);
      const tablist = wrapper.find('ul');

      it('renders default className for trigger', () => {
        expect(trigger.hasClass(`${prefix}--tabs-trigger`)).toBe(true);
      });

      it('renders hidden className by default', () => {
        expect(tablist.hasClass(`${prefix}--tabs__nav--hidden`)).toBe(true);
      });

      it('renders default className for triggerText', () => {
        expect(trigger.find('a').hasClass(`${prefix}--tabs-trigger-text`)).toBe(
          true
        );
      });

      it('renders <Icon>', () => {
        expect(trigger.find(ChevronDownGlyph).length).toBe(1);
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
      const hiddenProp = wrapper
        .find('TabContent')
        .first()
        .props().hidden;
      expect(typeof hiddenProp).toBe('boolean');
    });

    it('renders selected props with boolean value', () => {
      const selectedProp = wrapper
        .find('TabContent')
        .first()
        .props().hidden;
      expect(typeof selectedProp).toBe('boolean');
    });
  });

  describe('events', () => {
    describe('click', () => {
      const wrapper = mount(
        <Tabs>
          <Tab label="firstTab" className="firstTab">
            content1
          </Tab>
          <Tab label="lastTab" className="lastTab">
            content2
          </Tab>
        </Tabs>
      );

      describe('state: dropdownHidden', () => {
        it('toggles dropdownHidden state after trigger is clicked', () => {
          const trigger = wrapper.find(`.${prefix}--tabs-trigger`);

          trigger.simulate('click');
          expect(wrapper.state().dropdownHidden).toEqual(false);
          trigger.simulate('click');
          expect(wrapper.state().dropdownHidden).toEqual(true);
        });

        it('toggles hidden state after trigger-text is clicked', () => {
          const triggerText = wrapper.find(`.${prefix}--tabs-trigger-text`);

          triggerText.simulate('click');
          expect(wrapper.state().dropdownHidden).toEqual(false);
          triggerText.simulate('click');
          expect(wrapper.state().dropdownHidden).toEqual(true);
        });
      });
    });

    describe('keydown', () => {
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

      const firstTab = wrapper.find('.firstTab').last();
      const lastTab = wrapper.find('.lastTab').last();
      const leftKey = 37;
      const rightKey = 39;
      const spaceKey = 32;
      const enterKey = 13;

      describe('state: selected', () => {
        it('updates selected state when pressing arrow keys', () => {
          firstTab.simulate('keydown', { which: rightKey });
          expect(wrapper.state().selected).toEqual(1);
          lastTab.simulate('keydown', { which: leftKey });
          expect(wrapper.state().selected).toEqual(0);
        });

        it('loops focus and selected state from lastTab to firstTab', () => {
          lastTab.simulate('keydown', { which: rightKey });
          expect(wrapper.state().selected).toEqual(0);
        });

        it('loops focus and selected state from firstTab to lastTab', () => {
          firstTab.simulate('keydown', { which: leftKey });
          expect(wrapper.state().selected).toEqual(1);
        });

        it('updates selected state when pressing space or enter key', () => {
          firstTab.simulate('keydown', { which: spaceKey });
          expect(wrapper.state().selected).toEqual(0);
          lastTab.simulate('keydown', { which: enterKey });
          expect(wrapper.state().selected).toEqual(1);
        });
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

    describe('dropdownHidden', () => {
      it('should be true', () => {
        expect(wrapper.state().dropdownHidden).toEqual(true);
      });
    });

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
    wrapper
      .find('.secondTab')
      .last()
      .simulate('click');
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
