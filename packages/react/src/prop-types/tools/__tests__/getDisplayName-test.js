/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import getDisplayName from '../getDisplayName';

describe('getDisplayName', () => {
  it('should get the name from a React element', () => {
    const element = <span />;
    expect(getDisplayName(element.type)).toBe('span');
  });

  it('should get the name from a Stateless Functional Component', () => {
    const Child = () => <div />;
    expect(getDisplayName(React.createElement(Child).type)).toBe('Child');
  });

  it('should get the displayName from a class Component', () => {
    class Child extends React.Component {
      static displayName = 'ChildDisplayName';
      render() {
        return null;
      }
    }
    expect(getDisplayName(React.createElement(Child).type)).toBe(
      Child.displayName
    );
  });
});
