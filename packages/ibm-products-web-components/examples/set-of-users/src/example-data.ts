/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const namesString =
  'Alice Bob Charlie Diana Ethan Fiona George Hannah Ian Julia Kevin Laura Mike Nina Oscar Paula Quentin Rachel Steve Tina Uma Victor Wendy Xavier Yvonne Zach';

const backgroundColors = [
  'order-1-cyan',
  'order-2-gray',
  'order-3-green',
  'order-4-magenta',
  'order-5-purple',
  'order-6-teal',
  'order-7-cyan',
  'order-8-gray',
  'order-9-green',
  'order-10-magenta',
  'order-11-purple',
  'order-12-teal',
];

const userNames: string[] = namesString.split(/\s+/);

export interface User {
  name: string;
  size: string;
  backgroundColor: string;
}

interface GenerateUsersOptions {
  count: number;
  size?: string;
}

export function generateUsers({
  count,
  size = 'md',
}: GenerateUsersOptions): User[] {
  return Array.from({ length: count }, (_, index) => {
    const name = userNames[index % userNames.length];
    const backgroundColor = backgroundColors[index % backgroundColors.length];

    return {
      name,
      size,
      backgroundColor,
    };
  });
}

export const usersData = generateUsers({
  count: 50,
  size: 'md',
});
