import React from 'react';
import Link from '../Link';
import { shallow } from 'enzyme';

describe('Link', () => {
  describe('Renders as expected', () => {
    const link = shallow(
      <Link href="www.google.com" className="some-class">
        A simple link
      </Link>
    );
    it('should use the appropriate link class', () => {
      expect(link.hasClass('bx--link')).toEqual(true);
    });
    it('should inherit the href property', () => {
      expect(link.props().href).toEqual('www.google.com');
    });
    it('should include child content', () => {
      expect(link.text()).toEqual('A simple link');
    });
    it('should all for custom classes to be applied', () => {
      expect(link.hasClass('some-class')).toEqual(true);
    });
  });
});
