import React from 'react';
import Footer from '../Footer';
import { mount } from 'enzyme';

describe('Footer', () => {
  describe('Renders as expected', () => {
    const footer = mount(
      <Footer
        className="some-class"
        labelOne="Need Help?"
        linkTextOne="Contact Bluemix Sales"
        linkHrefOne="www.google.com"
        labelTwo="Estimate Monthly Cost"
        linkTextTwo="Cost Calculator"
        linkHrefTwo="www.bing.com"
        buttonText="Create"
      />
    );

    it('should use the appropriate footer class', () => {
      expect(footer.children().hasClass('bx--footer')).toEqual(true);
    });

    it('should send the first link the correct label', () => {
      expect(footer.props().labelOne).toEqual('Need Help?');
    });

    it('should send the first link the correct title', () => {
      expect(footer.props().linkTextOne).toEqual('Contact Bluemix Sales');
    });

    it('should send the first link the href property', () => {
      expect(footer.props().linkHrefOne).toEqual('www.google.com');
    });

    it('should send the second link the correct label', () => {
      expect(footer.props().labelTwo).toEqual('Estimate Monthly Cost');
    });

    it('should send the second link the correct title', () => {
      expect(footer.props().linkTextTwo).toEqual('Cost Calculator');
    });

    it('should send the second link the href property', () => {
      expect(footer.props().linkHrefTwo).toEqual('www.bing.com');
    });

    it('should send the button the correct text', () => {
      expect(footer.props().buttonText).toEqual('Create');
    });

    it('should all for custom classes to be applied', () => {
      expect(footer.hasClass('some-class')).toEqual(true);
    });
  });

  describe('Renders children as expected', () => {
    const footer = mount(
      <Footer>
        <div className="test">This is a test.</div>
        <div className="test">This is a test.</div>
      </Footer>
    );

    it('should render children as expected', () => {
      expect(footer.find('.test').length).toBe(2);
    });
  });
});
