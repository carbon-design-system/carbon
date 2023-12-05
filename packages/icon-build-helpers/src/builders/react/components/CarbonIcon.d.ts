/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IconProps } from './Icon';

export interface CarbonIconProps extends IconProps {
  size?: number | string;
}

export type CarbonIconType = React.ForwardRefExoticComponent<
  CarbonIconProps & React.RefAttributes<React.ReactSVGElement>
>;
