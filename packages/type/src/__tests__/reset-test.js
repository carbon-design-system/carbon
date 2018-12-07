/**
 * @jest-environment node
 */

import { reset } from '../reset';
import { print } from '../print';

describe('reset', () => {
  it('should set styles for `html` and `body`', () => {
    expect(reset.html).toBeDefined();
    expect(reset.body).toBeDefined();
  });

  it('should be printable', () => {
    expect(print(reset.html)).toMatchSnapshot();
    expect(print(reset.body)).toMatchSnapshot();
  });
});
