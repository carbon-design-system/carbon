//
// Copyright IBM Corp. 2023, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import { getNodeTextContent } from './getNodeTextContent';

describe('getNodeTextContent successfully returns a converted string', () => {
  it('returns a string as-is', async () => {
    const result = getNodeTextContent('Hello');
    expect(result).toEqual('Hello');
  });

  it('returns a number as a string', async () => {
    const result = getNodeTextContent(2);
    expect(result).toEqual('2');
  });

  it('converts a single node as a string', async () => {
    const result = getNodeTextContent(<span>Hello</span>);
    expect(result).toEqual('Hello');
  });

  it('converts child nodes as a string', async () => {
    const result = getNodeTextContent(
      <span>
        Hello <i>there</i>.
      </span>
    );
    expect(result).toEqual('Hello there.');
  });

  it('calls function if node is typeof function', () => {
    const TestComponent = () => (
      <div>
        Hello <span>there</span>.
      </div>
    );
    const result = getNodeTextContent(TestComponent);
    expect(result).toEqual('Hello there.');
  });
});

describe('getNodeTextContent exception handling', () => {
  it('returns an empty string if null', async () => {
    const result = getNodeTextContent();
    expect(result).toEqual('');
  });

  it('returns an empty string if is a boolean', async () => {
    const result = getNodeTextContent(true);
    expect(result).toEqual('');
  });

  it('returns an empty string if is a JavaScript object', async () => {
    const result = getNodeTextContent({ a: 'b' });
    expect(result).toEqual('');
  });
});
