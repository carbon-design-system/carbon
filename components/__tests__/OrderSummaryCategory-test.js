import React from 'react';
import { OrderSummaryCategory, OrderSummaryListItem } from '../OrderSummary';
import { shallow } from 'enzyme';

describe('OrderSummaryCategory', () => {
  describe('Renders as expected', () => {
    const orderSummaryCategory = shallow(
      <OrderSummaryCategory className="some-class" categoryText="Category 1">
        <OrderSummaryListItem />
        <OrderSummaryListItem />
        <OrderSummaryListItem />
      </OrderSummaryCategory>
    );

    it('renders Order Summary Category', () => {
      expect(orderSummaryCategory.length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(orderSummaryCategory.hasClass('bx--order-category')).toEqual(true);
      expect(orderSummaryCategory.hasClass('some-class')).toEqual(true);
    });

    it('should render with the correct title', () => {
      expect(
        orderSummaryCategory.find('.bx--order-category-title').text()
      ).toEqual('Category 1');
    });

    it('should render children as expected', () => {
      expect(orderSummaryCategory.find(OrderSummaryListItem).length).toEqual(3);
    });
  });
});
