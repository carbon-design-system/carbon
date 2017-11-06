import React from 'react';
import { OrderSummaryList, OrderSummaryListItem } from '../OrderSummary';
import { shallow } from 'enzyme';

describe('OrderSummaryList', () => {
  describe('Renders as expected', () => {
    const orderSummaryList = shallow(
      <OrderSummaryList className="some-class">
        <OrderSummaryListItem />
        <OrderSummaryListItem />
        <OrderSummaryListItem />
      </OrderSummaryList>
    );

    it('renders Order Summary List', () => {
      expect(orderSummaryList.length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(orderSummaryList.hasClass('bx--order-list')).toEqual(true);
      expect(orderSummaryList.hasClass('some-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(orderSummaryList.find(OrderSummaryListItem).length).toEqual(3);
    });
  });
});
