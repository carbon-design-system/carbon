/**
 * @jest-environment node
 */

import * as tokens from '../styles';
import { print } from '../print';

describe('styles', () => {
  test.each(Object.keys(tokens))('%s should be printable', key => {
    const token = tokens[key];
    expect(token).toMatchSnapshot();
    expect(print(token)).toMatchSnapshot();
  });
});
