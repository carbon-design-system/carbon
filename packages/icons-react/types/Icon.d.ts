/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

type IconSize = 16 | 20 | 24 | 32 | '16' | '20' | '24' | '32' | number | string;

// Inspired by the original types defined in DefinitelyTyped:
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/31fb0ded56cff23b7e6693bd673b00f41dc00bbe/types/carbon__icons-react/index.d.ts
interface IconProps
  extends Omit<
    React.SVGProps<React.ReactSVGElement>,
    'ref' | 'tabIndex' | 'aria-hidden'
  > {
  /**
   * @default "currentColor"
   */
  fill: string;

  /**
   * Specify the size of the icon. This value can be one of the predetermined
   * sizes for this icon (16, 20, 24, 32) or it can be a custom value that is
   * used for the width and height of the element
   *
   * @default 16
   */
  size?: IconSize;

  /**
   * @default "http://www.w3.org/2000/svg"
   */
  xmlns?: string;
}

export type Icon = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;
