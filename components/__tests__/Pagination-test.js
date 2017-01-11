import React from 'react';
import Icon from '../Icon';
import Pagination from '../Pagination';
import Select from '../Select';
import SelectItem from '../SelectItem';
import { shallow, mount } from 'enzyme';

describe('Pagination', () => {
  describe('renders as expected', () => {
    const pagination = shallow(
      <Pagination className="extra-class" pageSizes={[5, 10]} totalItems={50} />
    );

    describe('icons', () => {
      const icons = pagination.find(Icon);

      it('should have 3 icons', () => {
        expect(icons.length).toEqual(2);
      });

      it('should use correct "backward" icon', () => {
        expect(icons.first().props().name).toEqual('chevron--left');
      });

      it('should use correct "forward" icon', () => {
        expect(icons.last().props().name).toEqual('chevron--right');
      });
    });

    describe('pagination container', () => {
      it('should render the expected classes', () => {
        expect(pagination.hasClass('bx--pagination')).toBe(true);
        expect(pagination.hasClass('extra-class')).toBe(true);
      });
    });

    describe('pagination size container', () => {
      const left = pagination.find('.bx--pagination__left');
      it('should render a left container', () => {
        expect(left.length).toBe(1);
      });
      it('should have a size dropdown', () => {
        const select = left.find(Select);
        const items = select.find(SelectItem);
        expect(select.length).toBe(1);
        expect(items.length).toBe(2);
        expect(items.at(0).props().value).toBe(5);
        expect(items.at(1).props().value).toBe(10);
      });
      it('should label the dropdown', () => {
        const label = left.find('.bx--pagination__text').first();
        expect(label.text()).toBe('Items per page\u00a0\u00a0|\u00a0\u00a0');
      });
      it('should show the item range out of the total', () => {
        const label = left.find('.bx--pagination__text').at(1);
        expect(label.text()).toBe('1-5 of 50 items');
      });

      describe('pagination sizing', () => {
        it('should respond to page size changes', () => {
          let actualPageSize;
          const handler = ({ pageSize }) => {
            actualPageSize = pageSize;
          };
          const pager = mount(
            <Pagination pageSizes={[5, 10]} totalItems={50} onChange={handler} />
          );
          expect(pager.state().pageSize).toBe(5);
          pager.find('select').simulate('change', { target: { value: 10 } });
          expect(actualPageSize).toBe(10);
          expect(pager.state().pageSize).toBe(10);

          // Text updates after change
          const labels = pager.find('.bx--pagination__text');
          expect(labels.at(1).text()).toBe('1-10 of 50 items');
          expect(labels.at(2).text()).toBe('1 of 5 pages');
        });
        it('should reset the page when page size changes', () => {
          let actualPage;
          const handler = ({ page }) => {
            actualPage = page;
          };
          const pager = mount(
            <Pagination pageSizes={[5, 10]} totalItems={50} onChange={handler} />
          );
          pager.setState({ page: 2 });
          expect(pager.state().page).toBe(2);
          pager.find('select').simulate('change', { target: { value: 10 } });
          expect(actualPage).toBe(1);
          expect(pager.state().page).toBe(1);
        });
        it('should return to first page on changes to pageSizes', () => {
          const pager = mount(
            <Pagination pageSizes={[5, 10]} totalItems={50} />
          );
          pager.setState({ page: 2 });
          pager.setProps({ pageSizes: [3, 6] });
          expect(pager.state().page).toEqual(1);
        });
      });
    });

    describe('pagination paging container', () => {
      const right = pagination.find('.bx--pagination__right');
      it('should render a right container', () => {
        expect(right.length).toBe(1);
      });
      it('should show the current page out of the total number of pages', () => {
        const label = right.find('.bx--pagination__text').first();
        expect(label.text()).toBe('1 of 10 pages');
      });
      it('should have two buttons for navigation', () => {
        const buttons = right.find('.bx--pagination__button');
        expect(buttons.length).toBe(2);
        expect(buttons.at(0).hasClass('bx--pagination__button--backward')).toBe(true);
        expect(buttons.at(1).hasClass('bx--pagination__button--forward')).toBe(true);
      });
      it('should disable backward navigation for the first page', () => {
        const buttons = right.find('.bx--pagination__button');
        expect(buttons.at(0).props().disabled).toBe(true);
        expect(buttons.at(1).props().disabled).toBe(false);
      });
      it('should disable forward navigation for the last page', () => {
        const smallPage = shallow(
          <Pagination className="extra-class" pageSizes={[100]} totalItems={50} />
        );
        const buttons = smallPage.find('.bx--pagination__button');
        expect(buttons.at(0).props().disabled).toBe(true);
        expect(buttons.at(1).props().disabled).toBe(true);
      });

      describe('pagination navigation', () => {
        it('should go to the next page when clicking forward', () => {
          let actualPage;
          const handler = ({ page }) => {
            actualPage = page;
          };
          const pager = mount(
            <Pagination pageSizes={[5, 10]} totalItems={50} onChange={handler} />
          );
          expect(pager.state().page).toBe(1);
          pager.find('.bx--pagination__button--forward').simulate('click');
          expect(actualPage).toBe(2);
          expect(pager.state().page).toBe(2);
        });
        it('should go to the previous page when clicking backward', () => {
          let actualPage;
          const handler = ({ page }) => {
            actualPage = page;
          };
          const pager = mount(
            <Pagination pageSizes={[5, 10]} totalItems={50} onChange={handler} />
          );
          pager.setState({ page: 2 });
          expect(pager.state().page).toBe(2);
          pager.find('.bx--pagination__button--backward').simulate('click');
          expect(actualPage).toBe(1);
          expect(pager.state().page).toBe(1);
        });
        it('should jump to the page entered in the input field', () => {
          let actualPage;
          const handler = ({ page }) => {
            actualPage = page;
          };
          const pager = mount(
            <Pagination pageSizes={[5, 10]} totalItems={50} onChange={handler} />
          );
          expect(pager.state().page).toBe(1);
          pager.find('.bx--text__input').simulate('change', { target: { value: 2 } });
          expect(actualPage).toBe(2);
          expect(pager.state().page).toBe(2);
        });
      });
    });
  });
});
