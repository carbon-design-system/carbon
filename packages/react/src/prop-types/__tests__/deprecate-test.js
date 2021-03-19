/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('deprecate', () => {
  let warning;
  let deprecate;
  let mockPropType;
  let mockArgs;

  beforeEach(() => {
    jest.resetModules();
    jest.mock('../../internal/warning');
    warning = require('../../internal/warning').warning;
    deprecate = require('../deprecate').default;
    mockPropType = jest.fn();
    mockArgs = [{ propName: true }, 'propName', 'ComponentName'];
  });

  it('should call warning and prop type checker if the prop type is called', () => {
    deprecate(mockPropType)(...mockArgs);
    expect(warning).toHaveBeenCalledTimes(1);
    expect(mockPropType).toHaveBeenCalledTimes(1);
  });

  it('should not call warning more than once for a component and prop name', () => {
    // Default mock args for component `ComponentName` and prop `propName`
    // It should only display warning once
    const checker = deprecate(mockPropType);
    checker(...mockArgs);
    expect(warning).toHaveBeenCalledTimes(1);
    expect(mockPropType).toHaveBeenCalledTimes(1);

    checker(...mockArgs);
    expect(warning).toHaveBeenCalledTimes(1);
    expect(mockPropType).toHaveBeenCalledTimes(2);

    // Update to a new set of mock args to show that warning should be called
    // again, but only once for this other variant
    const otherMockArgs = [
      { otherPropName: true },
      'otherPropName',
      'OtherComponentName',
    ];

    checker(...otherMockArgs);
    expect(warning).toHaveBeenCalledTimes(2);
    expect(mockPropType).toHaveBeenCalledTimes(3);

    checker(...otherMockArgs);
    expect(warning).toHaveBeenCalledTimes(2);
    expect(mockPropType).toHaveBeenCalledTimes(4);
  });
});
