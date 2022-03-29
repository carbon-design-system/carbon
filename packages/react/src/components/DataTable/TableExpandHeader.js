/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import requiredIfGivenPropIsTruthy from '../../prop-types/requiredIfGivenPropIsTruthy';
import React from 'react';
import { ChevronRight } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';

const TableExpandHeader = ({
  ariaLabel,
  className: headerClassName,
  enableToggle,
  isExpanded,
  onExpand,
  expandIconDescription,
  children,
  ...rest
}) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--table-expand`, headerClassName);
  const previousValue = isExpanded ? 'collapsed' : undefined;

  return (
    <th
      scope="col"
      className={className}
      data-previous-value={previousValue}
      {...rest}>
      {enableToggle ? (
        <button
          type="button"
          className={`${prefix}--table-expand__button`}
          onClick={onExpand}
          title={expandIconDescription}
          aria-label={ariaLabel}>
          <ChevronRight
            className={`${prefix}--table-expand__svg`}
            aria-label={expandIconDescription}
          />
        </button>
      ) : null}
      {children}
    </th>
  );
};

TableExpandHeader.propTypes = {
  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ariaLabel: requiredIfGivenPropIsTruthy('enableToggle', PropTypes.string),

  children: PropTypes.node,

  className: PropTypes.string,

  /**
   * Specify whether an expand all button should be displayed
   */
  enableToggle: PropTypes.bool,

  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription: PropTypes.string,

  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded: requiredIfGivenPropIsTruthy('enableToggle', PropTypes.bool),

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: requiredIfGivenPropIsTruthy('enableToggle', PropTypes.func),
};

export default TableExpandHeader;
