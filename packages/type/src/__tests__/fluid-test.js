/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { fluid } from '../fluid';
import { display04 } from '../styles';

describe('fluid', () => {
  it('should return back a token if no breakpoints available', () => {
    const token = {
      fontSize: '1rem',
    };
    expect(fluid(token)).toEqual(token);
  });

  it('should include the default styles for each breakpoint as a media key', () => {
    const token = {
      fontSize: '1rem',
      letterSpacing: 0,
      breakpoints: {
        md: {
          fontSize: '1.5rem',
          letterSpacing: '100%',
        },
      },
    };
    expect(fluid(token)).toEqual(
      expect.objectContaining({
        letterSpacing: token.letterSpacing,
        '@media (min-width: 42rem)': expect.objectContaining({
          letterSpacing: token.breakpoints.md.letterSpacing,
        }),
      })
    );
  });

  it('should compute the fluid styles for a token', () => {
    expect(fluid(display04)).toMatchInlineSnapshot(`
      Object {
        "@media (min-width: 42rem)": Object {
          "fontSize": "calc(4.25rem + 1.5 * ((100vw - 42rem) / 24))",
          "lineHeight": 1.15,
        },
        "@media (min-width: 66rem)": Object {
          "fontSize": "calc(5.75rem + 1.875 * ((100vw - 66rem) / 16))",
          "letterSpacing": "-0.64px",
          "lineHeight": 1.11,
        },
        "@media (min-width: 82rem)": Object {
          "fontSize": "calc(7.625rem + 2.125 * ((100vw - 82rem) / 17))",
          "letterSpacing": "-0.64px",
          "lineHeight": 1.07,
        },
        "@media (min-width: 99rem)": Object {
          "fontSize": "9.75rem",
          "letterSpacing": "-0.96px",
          "lineHeight": 1.05,
        },
        "fontSize": "calc(2.625rem + 1.625 * ((100vw - 20rem) / 22))",
        "fontWeight": 600,
        "letterSpacing": 0,
        "lineHeight": 1.19,
      }
    `);
  });
});
