/**
 * Copyright IBM Corp. 2016, 2025
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
    deprecate = require('../deprecate').deprecate;
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

  it('should not call `warning` or the prop type checker if the property is `undefined`', () => {
    const checker = deprecate(mockPropType);
    const undefinedPropsArgs = [{}, 'propName', 'ComponentName'];

    checker(...undefinedPropsArgs);
    expect(warning).not.toHaveBeenCalled();
    expect(mockPropType).not.toHaveBeenCalled();
  });

  it('should use the custom warning message when provided', () => {
    const customMessage = '⚠️ Warning: 🚫 is deprecated.';
    const checker = deprecate(mockPropType, customMessage);

    checker(...mockArgs);
    expect(warning).toHaveBeenCalledWith(false, customMessage);
  });

  it('should return the same value as the original prop type checker', () => {
    const returnVal = 'expectedReturn';
    mockPropType.mockReturnValue(returnVal);
    const checker = deprecate(mockPropType);
    const result = checker(...mockArgs);

    expect(result).toEqual(returnVal);
  });

  it('should handle `__proto__` as component and prop name without prototype pollution', () => {
    const checker = deprecate(mockPropType);
    const maliciousArgs = [{ __proto__: true }, '__proto__', '__proto__'];
    const standardProtoProps = Object.getOwnPropertyNames(Object.prototype);

    // Execute the checker with malicious args twice to ensure the warning is
    // only issued once.
    checker(...maliciousArgs);
    expect(warning).toHaveBeenCalledTimes(1);
    expect(mockPropType).toHaveBeenCalledTimes(1);

    checker(...maliciousArgs);
    expect(warning).toHaveBeenCalledTimes(1);
    expect(mockPropType).toHaveBeenCalledTimes(2);

    // After calling with '__proto__' keys, make sure Object.prototype has not
    // been polluted.
    const currentProtoProps = Object.getOwnPropertyNames(Object.prototype);
    expect(currentProtoProps.sort()).toEqual(standardProtoProps.sort());
  });
});
