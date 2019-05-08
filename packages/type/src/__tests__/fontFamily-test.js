/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { fontFamilies, fontFamily } from '../fontFamily';
import { print } from '../print';

describe('fontFamily', () => {
  it('should export the supported font families', () => {
    expect(fontFamilies).toMatchSnapshot();
  });

  it('should support getting the quoted string for a font family', () => {
    expect(fontFamily('mono')).toEqual({
      fontFamily: fontFamilies.mono,
    });
  });

  it('should error out if trying to get a font that does not exist', () => {
    expect(() => {
      fontFamily('<unknown>');
    }).toThrow();
  });

  it('should be printable', () => {
    expect(print(fontFamily('mono'))).toMatchSnapshot();
  });
});
