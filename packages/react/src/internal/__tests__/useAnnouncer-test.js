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
    expect(value).toBe('1 character left.');
  });

  it('should emit announcement for words', () => {
    let value = null;

    function TestComponent() {
      value = useAnnouncer(9, 10, 'words');
      return null;
    }

    render(<TestComponent />);
    expect(value).toBe('1 word left.');
  });

  it('should emit announcement for maximum words reached', () => {
    let value = null;

    function TestComponent() {
      value = useAnnouncer(10, 10, 'words');
      return null;
    }

    render(<TestComponent />);
    expect(value).toBe('Maximum words reached.');
  });

  it('should emit announcement for maximum characters reached', () => {
    let value = null;

    function TestComponent() {
      value = useAnnouncer(10, 10, 'characters');
      return null;
    }

    render(<TestComponent />);
    expect(value).toBe('Maximum characters reached.');
  });
});
