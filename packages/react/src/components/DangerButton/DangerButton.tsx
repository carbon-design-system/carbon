/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Button, { ButtonComponent, ButtonProps } from '../Button';

const DangerButton: ButtonComponent = <T extends React.ElementType>(
  props: ButtonProps<T>
) => <Button kind="danger" {...props} />;

export default DangerButton;
