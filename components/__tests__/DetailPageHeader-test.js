import React from 'react';
import { mount, shallow } from 'enzyme';
import DetailPageHeader from '../DetailPageHeader';
import Icon from '../Icon';
import Breadcrumb from '../Breadcrumb';
import BreadcrumbItem from '../BreadcrumbItem';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import Tab from '../Tab';
import Tabs from '../Tabs';

describe('DetailPageHeader', () => {
  describe('component is rendered correctly without tabs', () => {
    const wrapper = mount(
      <DetailPageHeader title="test" statusText="Stopped" statusColor="#BADA55">
        <Icon description="watson" name="watson" />
        <Breadcrumb>
          <BreadcrumbItem href="www.google.com">Breadcrumb 1</BreadcrumbItem>
          <BreadcrumbItem href="www.google.com">Breadcrumb 2</BreadcrumbItem>
          <BreadcrumbItem href="www.google.com">Breadcrumb 3</BreadcrumbItem>
        </Breadcrumb>
        <OverflowMenu>
          <OverflowMenuItem itemText="Stop App" />
          <OverflowMenuItem itemText="Restart App" />
          <OverflowMenuItem itemText="Rename App" />
          <OverflowMenuItem itemText="Edit Routes and Access" />
          <OverflowMenuItem itemText="Delete App" isDelete />
        </OverflowMenu>
      </DetailPageHeader>
    );

    it('should render wrapper with the correct class', () => {
      expect(wrapper.hasClass('bx--detail-page-header')).toEqual(true);
      expect(wrapper.hasClass('bx--detail-page-header--no-tabs')).toEqual(true);
    });

    it('should render an icon', () => {
      const container = wrapper.find('.bx--detail-page-header-icon-container');
      const icon = container.find(Icon);
      const hasIcon = icon.length === 1;
      expect(hasIcon).toEqual(true);
    });

    it('should render an icon, even without one passed in', () => {
      const noIcon = shallow(<DetailPageHeader title="test" />);
      const container = noIcon.find('.bx--detail-page-header-icon-container');
      const icon = container.find('svg');
      const hasIcon = icon.length === 1;
      expect(hasIcon).toEqual(true);
    });

    it('should render correct icon', () => {
      expect(wrapper.find(Icon).at(0).props().name).toEqual('watson');
    });

    it('should render Breadcrumb', () => {
      const breadcrumb = wrapper.find(Breadcrumb).length === 1;
      expect(breadcrumb).toEqual(true);
    });

    it('should render BreadcrumbItem', () => {
      const breadcrumbItem = wrapper.find(BreadcrumbItem).length === 3;
      expect(breadcrumbItem).toEqual(true);
    });

    it('should render OverflowMenu', () => {
      const overflow = wrapper.find(OverflowMenu).length === 1;
      expect(overflow).toEqual(true);
    });

    it('should render an element with a title class', () => {
      const hasTitle =
        wrapper.find('.bx--detail-page-header-title').length === 1;
      expect(hasTitle).toEqual(true);
    });

    it('should render the correct title', () => {
      expect(wrapper.props().title).toEqual('test');
    });

    it('should render the correct status text', () => {
      expect(wrapper.props().statusText).toEqual('Stopped');
    });

    it('should render the correct status color', () => {
      expect(wrapper.props().statusColor).toEqual('#BADA55');
    });
  });

  describe('component is rendered correctly with tabs', () => {
    const wrapper = shallow(
      <DetailPageHeader hasTabs title="test">
        <Icon description="watson" name="watson" />
        <Breadcrumb>
          <BreadcrumbItem href="www.google.com">Breadcrumb 1</BreadcrumbItem>
          <BreadcrumbItem href="www.google.com">Breadcrumb 2</BreadcrumbItem>
          <BreadcrumbItem href="www.google.com">Breadcrumb 3</BreadcrumbItem>
        </Breadcrumb>
        <OverflowMenu>
          <OverflowMenuItem itemText="Stop App" />
          <OverflowMenuItem itemText="Restart App" />
          <OverflowMenuItem itemText="Rename App" />
          <OverflowMenuItem itemText="Edit Routes and Access" />
          <OverflowMenuItem itemText="Delete App" isDelete />
        </OverflowMenu>
        <Tabs>
          <Tab label="Overview" />
          <Tab label="Apple" />
          <Tab label="Banana" />
          <Tab label="Orange" />
        </Tabs>
      </DetailPageHeader>
    );

    it('should render a wrapper with the correct class', () => {
      expect(wrapper.hasClass('bx--detail-page-header--with-tabs')).toEqual(
        true
      );
    });

    it('should render Tabs', () => {
      const tabs = wrapper.find(Tabs).length === 1;
      expect(tabs).toEqual(true);
    });

    it('should render 4 Tab', () => {
      const tabs = wrapper.find(Tab).length === 4;
      expect(tabs).toEqual(true);
    });
  });
});
