/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import childrenOf from '../childrenOf';

const StatelessComponent = () => <div />;
class ClassComponent extends React.Component {
  render() {
    return <div />;
  }
}

// Note: when testing here, each component that passes children should have a
// unique name. Otherwise, React will not report all invalid prop types because
// it believes the name has already reported an issue in an earlier test.
describe('childrenOf', () => {
  let spy;

  beforeEach(() => {
    // We create a spy on `console.error` here since this is the vehicle React
    // uses to communicate invalid prop types. Tests should make sure to assert
    // on the number of times this is called to make sure we aren't swallowing
    // any errors unexpectedly.
    spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should validate children of a given enum of types', () => {
    const ChildEnumValid = ({ children }) => <div>{children}</div>;
    ChildEnumValid.propTypes = {
      children: childrenOf([StatelessComponent, ClassComponent]),
    };
    <ChildEnumValid>
      <StatelessComponent />
      <ClassComponent />
    </ChildEnumValid>;
    expect(spy).not.toHaveBeenCalled();
  });

  it('should warn with an invalid prop type for an invalid type', () => {
    const ChildEnumInvalid = ({ children }) => <div>{children}</div>;
    ChildEnumInvalid.propTypes = {
      children: childrenOf([StatelessComponent, ClassComponent]),
    };
    <ChildEnumInvalid>
      <div />
      <StatelessComponent />
      <ClassComponent />
    </ChildEnumInvalid>;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Invalid prop `children` of type `div` supplied to ' +
          '`ChildEnumInvalid`, expected each child to be one of: ' +
          '`[StatelessComponent, ClassComponent]`.'
      )
    );
  });

  it('should work with `isRequired`', () => {
    const RequiredChildrenOfTest = ({ children }) => <div>{children}</div>;
    RequiredChildrenOfTest.propTypes = {
      children: childrenOf([StatelessComponent, ClassComponent]).isRequired,
    };
    <RequiredChildrenOfTest />;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'The prop `children` is marked as required in ' +
          'RequiredChildrenOfTest, but its value is `undefined`.'
      )
    );
  });
});
