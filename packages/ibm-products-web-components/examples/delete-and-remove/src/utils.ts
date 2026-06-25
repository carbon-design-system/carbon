// cspell:words ampm
/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const getCurrentTime = (): string => {
  const now = new Date();
  let hours: number | string = now.getHours();
  const minutes: string = now.getMinutes().toString().padStart(2, '0');
  const seconds: string = now.getSeconds().toString().padStart(2, '0');
  const ampm: string = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  return formattedTime;
};
