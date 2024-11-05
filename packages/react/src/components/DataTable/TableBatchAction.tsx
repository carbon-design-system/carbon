/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { AddFilled as iconAddSolid } from '@carbon/icons-react';
import Button from '../Button';

export interface TableBatchActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify if the button is an icon-only button
   */
  hasIconOnly?: boolean;

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription?: string;

  /**
   * Optional function to render your own icon in the underlying button
   */
  renderIcon?: React.ElementType;
}

const TableBatchAction = ({
  renderIcon = iconAddSolid,
  iconDescription = 'Add',
  ...props
}: TableBatchActionProps) => (
  <Button
    renderIcon={renderIcon}
    iconDescription={iconDescription}
    {...props}
  />
);

TableBatchAction.propTypes = {
  /**
   * Specify if the button is an icon-only button
   */
  hasIconOnly: PropTypes.bool,

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription: (props) => {
    if (props.renderIcon && !props.children && !props.iconDescription) {
      return new Error(
        'renderIcon property specified without also providing an iconDescription property.'
      );
    }
    return undefined;
  },

  /**
   * Optional function to render your own icon in the underlying button
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default TableBatchAction;
