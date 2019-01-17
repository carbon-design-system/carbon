/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import childrenOfType from '../childrenOfType';

const Element = <span />;
const StatelessComponent = () => <div />;
class ClassComponent extends React.Component {
  render() {
    return <div />;
  }
}

// Note: when testing here, each component that passes children should have a
// unique name. Otherwise, React will not report all invalid prop types because
// it believes the name has already reported an issue in an earlier test.
describe('childrenOfType', () => {
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

  it('should validate children of a given element type', () => {
    const ChildElementValidTest = ({ children }) => <div>{children}</div>;
    ChildElementValidTest.propTypes = {
      children: childrenOfType(Element),
    };
    <ChildElementValidTest>
      <span />
      <span />
      <span />
    </ChildElementValidTest>;
    expect(spy).not.toHaveBeenCalled();
  });

  it('should warn with an invalid prop type for an invalid element child type', () => {
    const ChildElementInvalidTest = ({ children }) => <div>{children}</div>;
    ChildElementInvalidTest.propTypes = {
      children: childrenOfType(Element),
    };
    <ChildElementInvalidTest>
      <div />
      <span />
      <span />
    </ChildElementInvalidTest>;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Invalid prop `children` of type `div` supplied to ' +
          '`ChildElementInvalidTest`, expected each child to be a ' +
          '`span` component.'
      )
    );
  });

  it('should validate children of a given stateless functional component type', () => {
    const ChildSFCValidTest = ({ children }) => <div>{children}</div>;
    ChildSFCValidTest.propTypes = {
      children: childrenOfType(StatelessComponent),
    };
    <ChildSFCValidTest>
      <StatelessComponent />
      <StatelessComponent />
      <StatelessComponent />
    </ChildSFCValidTest>;
    expect(spy).not.toHaveBeenCalled();
  });

  it('should warn with an invalid prop type for an invalid SFC child type', () => {
    const BadStatelessComponent = () => <div />;
    const ChildSFCInvalidTest = ({ children }) => <div>{children}</div>;
    ChildSFCInvalidTest.propTypes = {
      children: childrenOfType(StatelessComponent),
    };
    <ChildSFCInvalidTest>
      <BadStatelessComponent />
      <StatelessComponent />
      <StatelessComponent />
      <StatelessComponent />
    </ChildSFCInvalidTest>;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Invalid prop `children` of type `BadStatelessComponent` supplied to ' +
          '`ChildSFCInvalidTest`, expected each child to be a ' +
          '`StatelessComponent` component.'
      )
    );
  });

  it('should validate children of a given class component type', () => {
    const ChildClassValidTest = ({ children }) => <div>{children}</div>;
    ChildClassValidTest.propTypes = {
      children: childrenOfType(ClassComponent),
    };
    <ChildClassValidTest>
      <ClassComponent />
      <ClassComponent />
      <ClassComponent />
    </ChildClassValidTest>;
    expect(spy).not.toHaveBeenCalled();
  });

  it('should warn with an invalid prop type for an invalid class component child type', () => {
    class BadClassComponent extends React.Component {
      render() {
        return <div />;
      }
    }
    const ChildClassInvalidTest = ({ children }) => <div>{children}</div>;
    ChildClassInvalidTest.propTypes = {
      children: childrenOfType(ClassComponent),
    };
    <ChildClassInvalidTest>
      <BadClassComponent />
      <ClassComponent />
      <ClassComponent />
    </ChildClassInvalidTest>;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Invalid prop `children` of type `BadClassComponent` supplied to ' +
          '`ChildClassInvalidTest`, expected each child to be a ' +
          '`ClassComponent` component.'
      )
    );
  });

  it('should work with `isRequired`', () => {
    const RequiredTest = ({ children }) => <div>{children}</div>;
    RequiredTest.propTypes = {
      children: childrenOfType(StatelessComponent).isRequired,
    };
    <RequiredTest />;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'The prop `children` is marked as required in RequiredTest, but its ' +
          'value is `undefined`.'
      )
    );
  });
});
