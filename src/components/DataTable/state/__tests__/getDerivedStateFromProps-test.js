import getDerivedStateFromProps from '../getDerivedStateFromProps';

const props = {
  rows: [],
  headers: [],
};

describe('getDerivedStateFromProps', () => {
  it('uses prevState if available', () => {
    const prevState = { sortDirection: 'DESC', sortHeaderKey: 'mockKey' };
    expect(getDerivedStateFromProps(props, prevState)).toEqual(
      expect.objectContaining({
        ...prevState,
      })
    );
  });

  it('has default values if prevState is not available', () => {
    expect(getDerivedStateFromProps(props, {})).toEqual(
      expect.objectContaining({
        sortDirection: 'NONE',
        sortHeaderKey: null,
      })
    );
  });
});
