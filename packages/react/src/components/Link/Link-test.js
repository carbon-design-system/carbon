/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Link', () => {
  describe('Renders as expected', () => {
    const link = shallow(
      <Link href="www.google.com" className="some-class">
        A simple link
      </Link>
    );
    it('should use the appropriate link class', () => {
      expect(link.hasClass(`${prefix}--link`)).toEqual(true);
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
