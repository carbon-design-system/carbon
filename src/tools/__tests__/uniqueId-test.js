import uniqueId from '../uniqueId';

describe('uniqueId', () => {
  it('increments unique id as expected', () => {
    const uniqueIdOne = uniqueId();
    const uniqueIdTwo = uniqueId();

    expect(uniqueIdOne).toEqual('id1');
    expect(uniqueIdTwo).toEqual('id2');
  });

  it('accepts a custom prefix', () => {
    const uniqueIdThree = uniqueId('customPrefix');
    expect(uniqueIdThree).toEqual('customPrefix3');
  });
});
