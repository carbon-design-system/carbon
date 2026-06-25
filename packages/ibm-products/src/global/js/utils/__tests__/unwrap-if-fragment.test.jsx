/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import unwrapIfFragment from '../unwrap-if-fragment';

const AChild = () => <div>A child</div>;

describe('unwrap-if-fragment', () => {
  it('Should handle a fragment with one child', async () => {
    const result = unwrapIfFragment(
      // The following disable is for test purposes
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        <AChild />
      </>
    );

    // The following disable is for test purposes
    // eslint-disable-next-line react/jsx-key
    expect(result).toHaveLength(1);
    expect(typeof result[0].type === 'function');
    expect(result[0].type.name === 'AChild');
  });

  it('Should handle a fragment with one child array', async () => {
    // The following disable is for test purposes
    // eslint-disable-next-line react/jsx-no-useless-fragment
    const result = unwrapIfFragment(<>{[<AChild key="1" />]}</>);

    expect(result).toHaveLength(1);
  });

  it('Should handle a fragment with multiple children without key', async () => {
    const result = unwrapIfFragment(
      <>
        <AChild />
        <AChild />
        <AChild />
      </>
    );

    expect(result).toHaveLength(3);
  });

  it('Should handle a fragment with multiple children with key', async () => {
    const result = unwrapIfFragment(
      <>
        <AChild key="1" />
        <AChild key="2" />
        <AChild key="3" />
      </>
    );

    expect(result).toHaveLength(3);
  });

  it('Should handle a multiple fragments and children', async () => {
    const result = unwrapIfFragment(
      <>
        <AChild key="1" />
        <AChild key="2" />
        <AChild key="3" />
        <>
          <AChild key="4" />
          <AChild key="5" />
          <AChild key="6" />
        </>
      </>
    );

    expect(result).toHaveLength(6);
  });

  it('Should handle a nested fragments and children', async () => {
    const result = unwrapIfFragment(
      <>
        <AChild key="1" />
        <AChild key="2" />
        <AChild key="3" />
        <>
          <AChild key="4" />
          <AChild key="5" />
          <AChild key="6" />
        </>
        <AChild key="7" />
      </>
    );

    expect(result).toHaveLength(7);
  });

  it('Should handle a lone child', async () => {
    const result = unwrapIfFragment(<AChild />);

    expect(result).toHaveLength(1);
  });

  it('Should handle an array with one child', async () => {
    const result = unwrapIfFragment([<AChild key="1" />]);

    expect(result).toHaveLength(1);
  });

  it('Should handle an array with multiple children', async () => {
    const children = [
      <AChild key="1" />,
      <AChild key="2" />,
      <AChild key="3" />,
    ];
    const result = unwrapIfFragment(children);

    expect(result).toHaveLength(3);
  });

  it('Should handle an array with multiple children and levels', async () => {
    const children = [
      <AChild key="1" />,
      <AChild key="2" />,
      <AChild key="3" />,
      [<AChild key="4" />, <AChild key="5" />, <AChild key="6" />],
    ];
    const result = unwrapIfFragment(children);

    expect(result).toHaveLength(6);
  });
});
