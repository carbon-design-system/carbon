import React from 'react';
import { OrderSummaryTotal } from '../OrderSummary';
import Button from '../Button';
import { shallow } from 'enzyme';

describe('OrderSummaryTotal', () => {
  describe('Renders as expected', () => {
    const orderSummaryTotal = shallow(
      <OrderSummaryTotal
        summaryText="Total due now:"
        summaryPrice="$0.00"
        summaryDetails="estimated"
        className="some-class">
        <Button>Primary Button</Button>
        <Button kind="secondary">Primary Button</Button>
      </OrderSummaryTotal>
    );

    it('renders Order Summary Total', () => {
      expect(orderSummaryTotal.length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(orderSummaryTotal.hasClass('bx--order-total-container')).toEqual(
        true
      );
      expect(orderSummaryTotal.hasClass('some-class')).toEqual(true);
    });

    it('should render with the correct summary text', () => {
      expect(orderSummaryTotal.find('.bx--order-total-text').text()).toEqual(
        'Total due now:'
      );
    });

    it('should render with the correct price', () => {
      expect(
        orderSummaryTotal
          .find('.bx--order-total-price')
          .children()
          .first()
          .text()
      ).toEqual('$0.00');
    });

    it('should render with the correct details', () => {
      expect(
        orderSummaryTotal
          .find('.bx--order-total-price')
          .children()
          .last()
          .text()
      ).toEqual('estimated');
    });

    it('should render children as expected', () => {
      expect(orderSummaryTotal.find(Button).length).toEqual(2);
    });
  });
});
