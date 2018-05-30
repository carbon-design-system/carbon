import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';

const TableBatchAction = props => (
  <Button small kind="ghost" icon="add--solid" {...props} />
);

TableBatchAction.propTypes = {
  /**
   * Provide a text description for the icon in the button
   */
  iconDescription: PropTypes.string.isRequired,
};

TableBatchAction.defaultProps = {
  iconDescription: 'Add',
};

export default TableBatchAction;
