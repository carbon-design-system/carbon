/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TableBody from '../TableBody';
import { shallow } from 'enzyme';

describeBreakingChangesXFeatures('TableBody', () => {
  describe('Renders as expected', () => {
    const rootWrapper = shallow(
      <TableBody className="extra-class">
        <td>Sample</td>
      </TableBody>
    );

    it('has the expected classes', () => {
      expect(rootWrapper.hasClass('bx--table-body')).toEqual(true);
    });

    it('should render a tbody', () => {
      const tbody = rootWrapper.find('tbody');
      expect(tbody.length).toEqual(1);
    });

    it('should render children as expected', () => {
      expect(rootWrapper.find('td').length).toEqual(1);
    });
  });
});
