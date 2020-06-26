/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PaginationNav from '../PaginationNav';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';
import { expect } from 'window-or-global';

const { prefix } = settings;

describe('PaginationNav', () => {
  const props = {
    className: 'extra-class',
    totalItems: 24,
    itemsShown: 8,
    page: 1,
  };

  const renderPaginationNav = (additionalProps = {}) =>
    mount(<PaginationNav {...props} {...additionalProps} />);

  describe('renders as expected', () => {
    const pagination = renderPaginationNav();

    describe('container', () => {
      it('should render the expected classes', () => {
        const container = pagination.childAt(0);
        expect(container.hasClass(`${prefix}--pagination-nav`)).toBe(true);
        expect(container.hasClass(`extra-class`)).toBe(true);
      });
    });

    describe('items', () => {
      it('should render n page items, where n = props.itemsShown', () => {
        const pages = pagination.find(`.${prefix}--pagination-nav__page`);
        expect(pages.length).toBe(props.itemsShown);
      });

      it('should render a "previous" button as first item', () => {
        const button = pagination
          .find(`.${prefix}--pagination-nav__list-item`)
          .first()
          .childAt(0)
          .render();

        expect(button.hasClass(`${prefix}--btn`)).toBe(true);
        expect(button.text()).toBe('Previous');
      });

      it('should render a "Next" button as last item', () => {
        const button = pagination
          .find(`.${prefix}--pagination-nav__list-item`)
          .last()
          .childAt(0)
          .render();

        expect(button.hasClass(`${prefix}--btn`)).toBe(true);
        expect(button.text()).toBe('Next');
      });

      it('should render the expected classes for the active page', () => {
        const activePage = pagination
          .find(`.${prefix}--pagination-nav__page`)
          .at(props.page);
        expect(
          activePage.hasClass(`${prefix}--pagination-nav__page--active`)
        ).toBe(true);
      });

      it('should disable "Previous" button when on first page and props.loop = false', () => {
        let i = 0;

        const pNav = renderPaginationNav({
          page: 0,
          loop: false,
          onChange: () => {
            i++;
          },
        });

        const button = pNav
          .find(`.${prefix}--pagination-nav__list-item`)
          .first()
          .childAt(0);

        expect(button.props().disabled).toBe(true);
        expect(i).toBe(0);
        button.simulate('click');
        expect(i).toBe(0);
      });
    });

    it('should disable "Next" button when on last page and props.loop = false', () => {
      let i = 0;

      const pNav = renderPaginationNav({
        page: 23,
        loop: false,
        onChange: () => {
          i++;
        },
      });

      const button = pNav
        .find(`.${prefix}--pagination-nav__list-item`)
        .last()
        .childAt(0);

      expect(button.props().disabled).toBe(true);
      expect(i).toBe(0);
      button.simulate('click');
      expect(i).toBe(0);
    });
  });

  describe('behaves as expected', () => {
    describe('direction buttons', () => {
      it('should move to next page when "Next" button is pressed', () => {
        const pagination = renderPaginationNav();

        let pages = pagination.find(`.${prefix}--pagination-nav__page`);
        let activePage = pagination.find(
          `.${prefix}--pagination-nav__page--active`
        );
        expect(activePage.matchesElement(pages.get(props.page))).toBe(true);

        pagination
          .find(`.${prefix}--pagination-nav__list-item`)
          .last()
          .childAt(0)
          .simulate('click');

        pages = pagination.find(`.${prefix}--pagination-nav__page`);
        activePage = pagination.find(
          `.${prefix}--pagination-nav__page--active`
        );
        expect(activePage.matchesElement(pages.get(props.page + 1))).toBe(true);
      });

      it('should move to previous page when "Previous" button is pressed', () => {
        const pagination = renderPaginationNav();

        let pages = pagination.find(`.${prefix}--pagination-nav__page`);
        let activePage = pagination.find(
          `.${prefix}--pagination-nav__page--active`
        );
        expect(activePage.matchesElement(pages.get(props.page))).toBe(true);

        pagination
          .find(`.${prefix}--pagination-nav__list-item`)
          .first()
          .childAt(0)
          .simulate('click');

        pages = pagination.find(`.${prefix}--pagination-nav__page`);
        activePage = pagination.find(
          `.${prefix}--pagination-nav__page--active`
        );
        expect(activePage.matchesElement(pages.get(props.page - 1))).toBe(true);
      });

      it('should move to page when user clicks on one', () => {
        const pagination = renderPaginationNav();

        let pages = pagination.find(`.${prefix}--pagination-nav__page`);
        let activePage = pagination.find(
          `.${prefix}--pagination-nav__page--active`
        );
        expect(activePage.matchesElement(pages.get(props.page))).toBe(true);

        pagination
          .find(`.${prefix}--pagination-nav__page`)
          .at(4)
          .simulate('click');

        pages = pagination.find(`.${prefix}--pagination-nav__page`);
        activePage = pagination.find(
          `.${prefix}--pagination-nav__page--active`
        );
        expect(activePage.matchesElement(pages.get(4))).toBe(true);
      });

      it('should emit onChange when moved to new page', () => {
        let i = 0;

        const pagination = renderPaginationNav({
          onChange: () => {
            i++;
          },
        });

        expect(i).toBe(0);
        pagination
          .find(`.${prefix}--pagination-nav__list-item`)
          .first()
          .childAt(0)
          .simulate('click');
        expect(i).toBe(1);
        pagination
          .find(`.${prefix}--pagination-nav__list-item`)
          .last()
          .childAt(0)
          .simulate('click');
        expect(i).toBe(2);
        pagination
          .find(`.${prefix}--pagination-nav__list-item`)
          .at(2)
          .childAt(0)
          .simulate('click');
        expect(i).toBe(3);
      });

      it('should move to last page when "Previous" button is pressed on first page and props.loop = true', () => {
        const pagination = renderPaginationNav({
          page: 0,
          loop: true,
        });

        let pages = pagination.find(`.${prefix}--pagination-nav__page`);
        let activePage = pagination.find(
          `.${prefix}--pagination-nav__page--active`
        );
        expect(activePage.matchesElement(pages.get(0))).toBe(true);

        pagination
          .find(`.${prefix}--pagination-nav__list-item`)
          .first()
          .childAt(0)
          .simulate('click');

        pages = pagination.find(`.${prefix}--pagination-nav__page`);
        activePage = pagination.find(
          `.${prefix}--pagination-nav__page--active`
        );
        expect(activePage.matchesElement(pages.get(pages.length - 1))).toBe(
          true
        );
      });

      it('should move to first page when "Next" button is pressed on last page and props.loop = true', () => {
        const pagination = renderPaginationNav({
          page: 23,
          loop: true,
        });

        let pages = pagination.find(`.${prefix}--pagination-nav__page`);
        let activePage = pagination.find(
          `.${prefix}--pagination-nav__page--active`
        );
        expect(activePage.matchesElement(pages.get(pages.length - 1))).toBe(
          true
        );

        pagination
          .find(`.${prefix}--pagination-nav__list-item`)
          .last()
          .childAt(0)
          .simulate('click');

        pages = pagination.find(`.${prefix}--pagination-nav__page`);
        activePage = pagination.find(
          `.${prefix}--pagination-nav__page--active`
        );
        expect(activePage.matchesElement(pages.get(0))).toBe(true);
      });
    });
  });
});
