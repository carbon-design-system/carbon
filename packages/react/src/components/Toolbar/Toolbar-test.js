/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Toolbar, {
  ToolbarItem,
  ToolbarTitle,
  ToolbarOption,
  ToolbarDivider,
} from '../Toolbar';
import OverflowMenu from '../OverflowMenu';
import ToolbarSearch from '../ToolbarSearch';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Toolbar', () => {
  describe('renders as expected', () => {
    const toolbar = mount(<Toolbar className="extra-class" />);

    describe('toolbar container', () => {
      it('should render the expected classes', () => {
        expect(toolbar.children().hasClass(`${prefix}--toolbar`)).toEqual(true);
        expect(toolbar.children().hasClass('extra-class')).toEqual(true);
      });
    });
  });

  describe('Toolbar Search Item', () => {
    const toolbar = mount(
      <Toolbar className="extra-class">
        <ToolbarItem type="search" />
      </Toolbar>
    );

    const toolbarSearch = mount(
      <ToolbarSearch placeHolderText="Test placeholder" />
    );

    const expandBtn = toolbarSearch.find('button');

    it('should render the toolbar search item inside the toolbar', () => {
      expect(toolbar.find(ToolbarItem).length).toEqual(1);
    });

    it('should have the expected placeholder text', () => {
      expect(toolbarSearch.props().placeHolderText).toEqual('Test placeholder');
    });

    it('should expand the search item when the search icon is clicked', () => {
      expect(toolbarSearch.state().expanded).toEqual(false);
      expandBtn.simulate('click');
      expect(toolbarSearch.state().expanded).toEqual(true);
    });

    it('should minimize the search item when the search icon is clicked when the state is expanded', () => {
      expect(toolbarSearch.state().expanded).toEqual(true);
      expandBtn.simulate('click');
      expect(toolbarSearch.state().expanded).toEqual(false);
    });

    it('should minimize the search when clicking outside of the search item', () => {
      const rootWrapper = shallow(<ToolbarSearch />);
      expect(rootWrapper.state().expanded).toEqual(false);
      rootWrapper.setState({ expanded: true });
      rootWrapper.props().onClickOutside();
      expect(rootWrapper.state().expanded).toEqual(false);
    });
  });

  describe('ToolbarItem with an overflow menu', () => {
    const toolbarItem = mount(
      <ToolbarItem>
        <OverflowMenu />
      </ToolbarItem>
    );

    it('should render an overflow menu inside a toolbar item', () => {
      expect(toolbarItem.find(OverflowMenu).length).toEqual(1);
    });

    describe('with ToolbarTitle ', () => {
      const withToolbarTitle = mount(
        <ToolbarItem>
          <OverflowMenu open={true}>
            <ToolbarTitle title="Test title" />
          </OverflowMenu>
        </ToolbarItem>
      );

      const toolbarTitle = withToolbarTitle.find(ToolbarTitle);

      it('should render a toolbar title with the expected className', () => {
        expect(
          toolbarTitle.children().hasClass(`${prefix}--toolbar-menu__title`)
        ).toEqual(true);
      });

      it('should render a toolbar title with the expected title', () => {
        expect(toolbarTitle.props().title).toEqual('Test title');
      });
    });

    describe('with ToolbarOption ', () => {
      const withToolbarOption = mount(
        <ToolbarItem>
          <OverflowMenu open={true}>
            <ToolbarOption>
              <div>Test child</div>
            </ToolbarOption>
          </OverflowMenu>
        </ToolbarItem>
      );

      const toolbarOption = withToolbarOption.find(ToolbarOption);

      it('should render a toolbar option with the expected className', () => {
        expect(
          toolbarOption.children().hasClass(`${prefix}--toolbar-menu__option`)
        ).toEqual(true);
      });

      it('should render with the expected children', () => {
        expect(toolbarOption.find('div').length).toEqual(1);
      });
    });

    describe('with ToolbarDivider ', () => {
      const withToolbarDivider = mount(
        <ToolbarItem>
          <OverflowMenu open={true}>
            <ToolbarDivider />
          </OverflowMenu>
        </ToolbarItem>
      );

      const toolbarDivider = withToolbarDivider.find(ToolbarDivider);

      it('should render a toolbar divider with the expected className', () => {
        expect(
          toolbarDivider.children().hasClass(`${prefix}--toolbar-menu__divider`)
        ).toEqual(true);
      });
    });
  });
});
