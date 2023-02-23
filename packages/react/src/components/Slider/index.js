/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import SliderComponent from './Slider';
import { createClassWrapper } from '../../internal/createClassWrapper';

const Slider = createClassWrapper(SliderComponent);

export { default as SliderSkeleton } from './Slider.Skeleton';
export default Slider;
export { Slider };
