import { defaultSortRow } from '../sorting';
import { sortStates } from '../../state/sorting';

describe('defaultSortRow', () => {
  it('should sort data in ascending order', () => {
    const sortProps = {
      sortDirection: sortStates.ASC,
      sortStates: sortStates,
      locale: 'en',
    };
    expect(defaultSortRow('a', 'b', sortProps)).toBeGreaterThan(0);
    expect(defaultSortRow('1', '2', sortProps)).toBeGreaterThan(0);
  });

  it('should sort data in descending order', () => {
    const sortProps = {
      sortDirection: sortStates.DESC,
      sortStates: sortStates,
      locale: 'en',
    };
    expect(defaultSortRow('a', 'b', sortProps)).toBeLessThan(0);
    expect(defaultSortRow('1', '2', sortProps)).toBeLessThan(0);
  });
});
