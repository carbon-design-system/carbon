import React from 'react';
import { OrderSummary, OrderSummaryHeader } from '../OrderSummary';
import { shallow } from 'enzyme';

describe('OrderSummary', () => {
  describe('Renders as expected', () => {
    const orderSummary = shallow(
      <OrderSummary className="some-class">
        <OrderSummaryHeader />
      </OrderSummary>
    );

    it('renders Order Summary', () => {
      expect(orderSummary.length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(orderSummary.hasClass('bx--order-summary')).toEqual(true);
      expect(orderSummary.hasClass('some-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(orderSummary.find(OrderSummaryHeader).length).toEqual(1);
    });
  });
});
