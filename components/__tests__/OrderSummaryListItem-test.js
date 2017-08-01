import React from 'react';
import { OrderSummaryListItem } from '../OrderSummary';
import { shallow } from 'enzyme';

describe('OrderSummaryListItem', () => {
  describe('Renders as expected', () => {
    const orderSummaryListItem = shallow(
      <OrderSummaryListItem
        className="some-class"
        text="Item 1"
        price="$50.00"
      />
    );

    it('renders Order Summary List Item', () => {
      expect(orderSummaryListItem.length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(orderSummaryListItem.hasClass('bx--order-item')).toEqual(true);
      expect(orderSummaryListItem.hasClass('some-class')).toEqual(true);
    });

    it('should render with the correct label', () => {
      expect(orderSummaryListItem.find('.bx--order-detail').text()).toEqual(
        'Item 1'
      );
    });

    it('should render with the correct price', () => {
      expect(orderSummaryListItem.find('.bx--order-price').text()).toEqual(
        '$50.00'
      );
    });
  });
});
