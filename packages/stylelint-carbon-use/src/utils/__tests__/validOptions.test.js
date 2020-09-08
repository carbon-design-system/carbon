import { isValidOption } from '..';

describe('isValidOptions', () => {
  it('Option to be invalid', () => {
    expect(isValidOption(['/expected to cause warning during test'])).toEqual(
      false
    );
  });
});
