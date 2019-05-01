/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import iconAddSolid from '@carbon/icons-react/lib/add--filled/16';
import Button from '../Button';

const TableBatchAction = props => <Button {...props} />;

TableBatchAction.propTypes = {
  /**
   * Provide a text description for the icon in the button
   */
  iconDescription: PropTypes.string.isRequired,

  /**
   * Optional function to render your own icon in the underlying button
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableBatchAction.defaultProps = {
  iconDescription: 'Add',
  renderIcon: iconAddSolid,
};

export default TableBatchAction;
