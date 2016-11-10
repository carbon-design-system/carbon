import React from 'react';
import { mount, shallow } from 'enzyme';
import DetailPageHeader from '../DetailPageHeader';
import Icon from '../Icon';

describe('DetailPageHeader', () => {
  describe('component is rendered correctly when no child is passed', () => {
    const wrapper = shallow(
      <DetailPageHeader
        title="test"
        onBackLinkClick={() => {}}
      />
    );

    it('should render wrapper with the correct class', () => {
      expect(wrapper.hasClass('bx--detail-page-header--no-tabs')).toEqual(true);
    });

    it('should render a link with the correct class', () => {
      const link = wrapper.find('a');
      const hasLinkWrapperClass = link.hasClass('bx--detail-page-header--no-tabs__link-wrapper');

      expect(hasLinkWrapperClass).toEqual(true);
    });

    it('should render an icon with the correct class', () => {
      const link = wrapper.find('a');
      const icon = link.find(Icon);
      const hasIcon = icon.length === 1;
      const hasIconClass = hasIcon && icon.props().className === 'bx--detail-page-header--no-tabs__arrow';

      expect(hasIcon).toEqual(true);
      expect(hasIconClass).toEqual(true);
    });

    it('should render an element with a link text class', () => {
      const link = wrapper.find('a');
      const hasLinkText = link.find('.bx--detail-page-header--no-tabs__link-text').length === 1;

      expect(hasLinkText).toEqual(true);
    });


    it('should render an element with a title class', () => {
      const hasTitle = wrapper.find('.bx--detail-page-header--no-tabs__info-title').length === 1;
      expect(hasTitle).toEqual(true);
    });
  });

  describe('component is rendered correctly when a child is passed', () => {
    const wrapper = shallow(
      <DetailPageHeader
        title="test"
        onBackLinkClick={() => {}}
      >
        <div className="child"></div>
      </DetailPageHeader>
    );

    it('should render a wrapper with the correct class', () => {
      expect(wrapper.hasClass('bx--detail-page-header--with-tabs')).toEqual(true);
    });

    it('should render an element with a container class', () => {
      expect(wrapper.find('.bx--detail-page-header--with-tabs__container').length).toEqual(1);
    });

    it('should render a tabs container with a child element within it', () => {
      const tabsContainer = wrapper.find('.bx--detail-page-header--with-tabs__tabs-container');

      expect(tabsContainer.length).toEqual(1);
      expect(tabsContainer.find('.child').length).toEqual(1);
    });

    it('should render an element with the breadcrumb class and expected child elements', () => {
      const breadcrumb = wrapper.find('.bx--detail-page-header--with-tabs__breadcrumb');
      const link = breadcrumb.find('a');
      const icon = breadcrumb.find(Icon);

      expect(breadcrumb.length).toEqual(1);
      expect(link.hasClass('bx--detail-page-header--with-tabs__link-wrapper')).toEqual(true);
      expect(icon.props().className).toEqual('bx--detail-page-header--with-tabs__arrow');
      expect(link.find('.bx--detail-page-header--with-tabs__breadcrumb-title').length).toEqual(1);
    });
  });

  describe('props with no child passed', () => {
    const onBackLinkClick = jest.fn();
    const wrapper = mount(
      <DetailPageHeader
        title="test"
        onBackLinkClick={onBackLinkClick}
      />
    );

    it('should invoke onBackLinkClick when link is clicked', () => {
      wrapper.find('a').simulate('click');
      expect(onBackLinkClick).toBeCalled();
    });

    it('should display title when one is passed as props', () => {
      const title = wrapper.find('.bx--detail-page-header--no-tabs__info-title');
      expect(title.text()).toEqual('test');
    });

    it('should set breadcrumbTitle when one is passed as props', () => {
      const link = wrapper.find('.bx--detail-page-header--no-tabs__link-text');
      const icon = wrapper.find(Icon);

      expect(link.text()).toEqual('back');
      expect(icon.props().description).toEqual('back');

      wrapper.setProps({ breadcrumbTitle: 'test breadcrumb' });
      expect(link.text()).toEqual('test breadcrumb');
      expect(icon.props().description).toEqual('test breadcrumb');
    });
  });

  describe('props when a child is passed', () => {
    const onBackLinkClick = jest.fn();
    const wrapper = mount(
      <DetailPageHeader
        title="test title"
        onBackLinkClick={onBackLinkClick}
      >
        <div className="child"></div>
      </DetailPageHeader>
    );

    it('should invoke onBackLinkClick when link is clicked', () => {
      wrapper.find('a').simulate('click');
      expect(onBackLinkClick).toBeCalled();
    });

    it('should set breadcrumbTitle when one is passed as props', () => {
      const breadcrumb = wrapper.find('.bx--detail-page-header--with-tabs__breadcrumb-title');
      const icon = wrapper.find(Icon);

      expect(breadcrumb.text()).toEqual('back');
      expect(icon.props().description).toEqual('back');

      wrapper.setProps({ breadcrumbTitle: 'test breadcrumb' });
      expect(breadcrumb.text()).toEqual('test breadcrumb');
      expect(icon.props().description).toEqual('test breadcrumb');
    });

    it('should display title when one is passed as props', () => {
      const title = wrapper.find('.bx--detail-page-header--with-tabs__info-title');
      expect(title.text()).toEqual('test title');
    });
  });
});
