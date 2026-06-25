/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Example usage for custom filter tag labels, in practice this
// is where a translation service would be utilized. This
// utility is for storybook demonstration purposes only.
export const handleFilterTagLabelText = (key, value) => {
  switch (key) {
    case 'role':
      return `Role: ${value}`;
    case 'joined':
      return `Joined: ${value}`;
    case 'visits':
      return `Visits: ${value}`;
    case 'passwordStrength':
      return `Password strength: ${value}`;
    case 'status':
      return `Status: ${value}`;
    default:
      return `${key}: ${value}`;
  }
};
