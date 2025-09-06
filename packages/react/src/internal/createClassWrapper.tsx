/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO: @AdamAlston - Delete this file after part 3 of
// https://github.com/carbon-design-system/carbon/issues/18868. That should be
// the last thing in https://github.com/carbon-design-system/carbon/issues/18870
// which will itself be the last thing in
// https://github.com/carbon-design-system/carbon/issues/15498.

import React, {
  type ComponentClass,
  type ForwardRefExoticComponent,
  type FunctionComponent,
  type PropsWithChildren,
} from 'react';

/**
 * Wrap a class component with a functional component. This prevents an end-user
 * from being able to pass `ref` and access the underlying class instance.
 */
export const createClassWrapper = <Props extends PropsWithChildren>(
  Component: ComponentClass<Props> | ForwardRefExoticComponent<Props>
): FunctionComponent<Props> => {
  const ClassWrapper = (props: Props) => {
    return <Component {...props} />;
  };

  const name = Component.displayName || Component.name;
  ClassWrapper.displayName = `ClassWrapper(${name})`;

  return ClassWrapper;
};
