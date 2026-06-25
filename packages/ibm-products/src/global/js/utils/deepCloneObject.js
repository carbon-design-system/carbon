/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Utility to return a deep clone of a nested object or array.
export const deepCloneObject = (objectToClone) => {
  // Return the value if objectToClone is not an object
  if (typeof objectToClone !== 'object' || objectToClone === null) {
    return objectToClone;
  }
  // Create a new array/object to hold the values
  const clonedObject = Array.isArray(objectToClone) ? [] : {};
  for (const key in objectToClone) {
    const value = objectToClone[key];
    // Recursively check for nested objects/arrays
    clonedObject[key] = deepCloneObject(value);
  }
  return clonedObject;
};
