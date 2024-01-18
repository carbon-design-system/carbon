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
  // TODO: I got a SonarCloud warning here saying that kind would always be overridden. Is the
  // expected behavior here to spread the props and then force "kind" to be "danger"? If so,
  // swapping these props is likely the way to go.
) => <Button {...props} kind="danger" />;

export default DangerButton;
