import { render } from '@testing-library/react';
import React from 'react';
import { useAnnouncer } from '../useAnnouncer';

describe('useAnnouncer', () => {
  it('should emit announcement for characters', () => {
    let value = null;

    function TestComponent() {
      value = useAnnouncer(9, 10);
      return null;
    }

    render(<TestComponent />);
    expect(value).toBe('1 characters left.');
  });

  it('should emit announcement for words', () => {
    let value = null;

    function TestComponent() {
      value = useAnnouncer(9, 10, 'words');
      return null;
    }

    render(<TestComponent />);
    expect(value).toBe('1 words left.');
  });
});
