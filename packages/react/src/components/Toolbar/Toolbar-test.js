/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OverflowMenu from '../OverflowMenu';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('[Deprecated] Toolbar', () => {
  let Toolbar;
  let ToolbarItem;
  let ToolbarTitle;
  let ToolbarOption;
  let ToolbarDivider;
  let ToolbarSearch;

  beforeEach(() => {
    // Toolbar is deprecated
    jest.mock('../../internal/warning');

    Toolbar = require('../Toolbar').default;
    ToolbarItem = require('../Toolbar').ToolbarItem;
    ToolbarTitle = require('../Toolbar').ToolbarTitle;
    ToolbarOption = require('../Toolbar').ToolbarOption;
    ToolbarDivider = require('../Toolbar').ToolbarDivider;
    ToolbarSearch = require('../ToolbarSearch').default;
  });

  describe('renders as expected', () => {
    describe('toolbar container', () => {
      it('should render the expected classes', () => {
        const toolbar = mount(<Toolbar className="extra-class" />);
        expect(toolbar.children().hasClass(`${prefix}--toolbar`)).toEqual(true);
        expect(toolbar.children().hasClass('extra-class')).toEqual(true);
      });
    });
  });

  describe('Toolbar Search Item', () => {
    let toolbar;
    let toolbarSearch;
    let expandBtn;

    beforeEach(() => {
      toolbar = mount(
        <Toolbar className="extra-class">
          <ToolbarItem type="search" />
        </Toolbar>
      );

      toolbarSearch = mount(
        <ToolbarSearch placeHolderText="Test placeholder" />
      );

      expandBtn = toolbarSearch.find('button');
    });

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
      expandBtn.simulate('click');
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
    let toolbarItem;

    beforeEach(() => {
      toolbarItem = mount(
        <ToolbarItem>
          <OverflowMenu />
        </ToolbarItem>
      );
    });

    it('should render an overflow menu inside a toolbar item', () => {
      expect(toolbarItem.find(OverflowMenu).length).toEqual(1);
    });

    describe('with ToolbarTitle', () => {
      let withToolbarTitle;
      let toolbarTitle;

      beforeEach(() => {
        withToolbarTitle = mount(
          <ToolbarItem>
            <OverflowMenu open={true}>
              <ToolbarTitle title="Test title" />
            </OverflowMenu>
          </ToolbarItem>
        );

        toolbarTitle = withToolbarTitle.find(ToolbarTitle);
      });

      it('should render a toolbar title with the expected className', () => {
        expect(
          toolbarTitle.children().hasClass(`${prefix}--toolbar-menu__title`)
        ).toEqual(true);
      });

      it('should render a toolbar title with the expected title', () => {
        expect(toolbarTitle.props().title).toEqual('Test title');
      });
    });

    describe('with ToolbarOption', () => {
      let withToolbarOption;
      let toolbarOption;

      beforeEach(() => {
        withToolbarOption = mount(
          <ToolbarItem>
            <OverflowMenu open={true}>
              <ToolbarOption>
                <div>Test child</div>
              </ToolbarOption>
            </OverflowMenu>
          </ToolbarItem>
        );

        toolbarOption = withToolbarOption.find(ToolbarOption);
      });

      it('should render a toolbar option with the expected className', () => {
        expect(
          toolbarOption.children().hasClass(`${prefix}--toolbar-menu__option`)
        ).toEqual(true);
      });

      it('should render with the expected children', () => {
        expect(toolbarOption.find('div').length).toEqual(1);
      });
    });

    describe('with ToolbarDivider', () => {
      let withToolbarDivider;
      let toolbarDivider;

      beforeEach(() => {
        withToolbarDivider = mount(
          <ToolbarItem>
            <OverflowMenu open={true}>
              <ToolbarDivider />
            </OverflowMenu>
          </ToolbarItem>
        );

        toolbarDivider = withToolbarDivider.find(ToolbarDivider);
      });

      it('should render a toolbar divider with the expected className', () => {
        expect(
          toolbarDivider.children().hasClass(`${prefix}--toolbar-menu__divider`)
        ).toEqual(true);
      });
    });
  });
});
