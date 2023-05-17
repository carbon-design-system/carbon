/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { fontWeights, fontWeight } from '../fontWeight';
import { print } from '../print';

describe('fontWeight', () => {
  it('should export the supported font weights', () => {
    expect(fontWeights).toMatchSnapshot();
  });

  it('should support getting the quoted string for a font weight', () => {
    expect(fontWeight('light')).toEqual({
      fontWeight: fontWeights.light,
    });
  });

  it('should error out if trying to get a font weight that does not exist', () => {
    expect(() => {
      fontWeight('<unknown>');
    }).toThrow();
  });

  it('should be printable', () => {
    expect(print(fontWeight('regular'))).toMatchSnapshot();
  });
});
