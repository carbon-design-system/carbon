import React from 'react';
import { OrderSummaryFooter } from '../OrderSummary';
import Link from '../Link';
import { mount } from 'enzyme';

describe('OrderSummaryFooter', () => {
  describe('Renders as expected', () => {
    const orderSummaryFooter = mount(
      <OrderSummaryFooter
        className="some-class"
        footerText="Need Help?"
        linkText="Contact Bluemix Sales"
        href="www.google.com"
      />
    );

    it('renders Order Summary Footer', () => {
      expect(orderSummaryFooter.length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(
        orderSummaryFooter.children().hasClass('bx--order-footer')
      ).toEqual(true);
      expect(orderSummaryFooter.children().hasClass('some-class')).toEqual(
        true
      );
    });

    it('should render with the correct footer text', () => {
      expect(orderSummaryFooter.find('.bx--order-footer-text').text()).toEqual(
        'Need Help?'
      );
    });

    it('should pass down the correct link props', () => {
      expect(orderSummaryFooter.props().linkText).toEqual(
        'Contact Bluemix Sales'
      );
      expect(orderSummaryFooter.props().href).toEqual('www.google.com');
      expect(orderSummaryFooter.props().target).toEqual('_blank');
      expect(orderSummaryFooter.props().rel).toEqual('noreferrer noopener');
    });

    it('should render children as expected', () => {
      expect(orderSummaryFooter.find(Link).length).toEqual(1);
    });
  });
});
