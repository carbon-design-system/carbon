/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { getAnnouncement } from '../getAnnouncement';

describe('getAnnouncement', () => {
  it('should emit announcement for characters', () => {
    let value = null;

    function TestComponent() {
      value = getAnnouncement(9, 10);
      return null;
    }

    render(<TestComponent />);
    expect(value).toBe('1 character left.');
  });

  it('should emit announcement for words', () => {
    let value = null;

    function TestComponent() {
      value = getAnnouncement(9, 10, 'word', 'words');
      return null;
    }

    render(<TestComponent />);
    expect(value).toBe('1 word left.');
  });

  it('should emit announcement for maximum words reached', () => {
    let value = null;

    function TestComponent() {
      value = getAnnouncement(10, 10, 'word', 'words');
      return null;
    }

    render(<TestComponent />);
    expect(value).toBe('Maximum words reached.');
  });

  it('should emit announcement for maximum characters reached', () => {
    let value = null;

    function TestComponent() {
      value = getAnnouncement(10, 10, 'character', 'characters');
      return null;
    }

    render(<TestComponent />);
    expect(value).toBe('Maximum characters reached.');
  });
});
