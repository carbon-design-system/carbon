import React from 'react';
import Breadcrumb from '../Breadcrumb';
import BreadcrumbItem from '../BreadcrumbItem';
import { mount } from 'enzyme';

describe('Breadcrumb', () => {
  describe('Renders as expected', () => {
    const breadcrumb = mount(
      <Breadcrumb className="parent-class">
        <BreadcrumbItem className="some-class" href="www.google.com">
          Breadcrumb 1
        </BreadcrumbItem>
      </Breadcrumb>
    );

    const breadcrumbItem = breadcrumb.find(BreadcrumbItem);

    it('renders a breadcrumb', () => {
      expect(breadcrumb.length).toEqual(1);
    });

    it('should use the appropriate breadcrumb class', () => {
      expect(breadcrumb.children().hasClass('bx--breadcrumb')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(breadcrumb.hasClass('parent-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(breadcrumb.find(BreadcrumbItem).length).toEqual(1);
    });

    it('should render children content as expected', () => {
      expect(breadcrumbItem.text()).toEqual('Breadcrumb 1');
    });
  });
});
