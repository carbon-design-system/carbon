/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronRight } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes, { Validator } from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import requiredIfGivenPropIsTruthy from '../../prop-types/requiredIfGivenPropIsTruthy';
import { ReactAttr } from '../../types/common';

type TableExpandHeaderPropsBase = {
  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ariaLabel?: string;
  /**
   * @deprecated The enableExpando prop is being replaced by `enableToggle`
   */
  enableExpando?: false | undefined;
  /**
   * Specify whether an expand all button should be displayed
   */
  enableToggle?: false | undefined;
  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription?: string;
  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded?: boolean;
  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand?(event: React.MouseEvent<HTMLButtonElement>): void;
} & ReactAttr<HTMLTableCellElement>;

type TableExpandHeaderPropsWithToggle = Omit<
  TableExpandHeaderPropsBase,
  'ariaLabel' | 'enableToggle' | 'onExpand'
> & {
  enableToggle: true;
  ariaLabel: string;
  onExpand(event: React.MouseEvent<HTMLButtonElement>): void;
};

type TableExpandHeaderPropsWithExpando = Omit<
  TableExpandHeaderPropsBase,
  'ariaLabel' | 'enableExpando' | 'onExpand'
> & {
  enableExpando: true;
  ariaLabel: string;
  onExpand(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type TableExpandHeaderProps =
  | TableExpandHeaderPropsWithToggle
  | TableExpandHeaderPropsWithExpando
  | TableExpandHeaderPropsBase;

const TableExpandHeader = ({
  ariaLabel,
  className: headerClassName,
  enableExpando,
  enableToggle,
  id = 'expand',
  isExpanded,
  onExpand,
  expandIconDescription,
  children,
  ...rest
}: TableExpandHeaderProps) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--table-expand`, headerClassName);
  const previousValue = isExpanded ? 'collapsed' : undefined;

  return (
    <th
      scope="col"
      className={className}
      data-previous-value={previousValue}
      id={id}
      {...rest}>
      {enableExpando || enableToggle ? (
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
  ariaLabel: PropTypes.oneOfType([
    requiredIfGivenPropIsTruthy(
      'enableExpando',
      PropTypes.string
    ) as Validator<any>,
    requiredIfGivenPropIsTruthy(
      'enableToggle',
      PropTypes.string
    ) as Validator<any>,
  ]),

  children: PropTypes.node,

  className: PropTypes.string,

  /**
   * The enableExpando prop is being replaced by enableToggle
   */
  enableExpando: deprecate(
    PropTypes.bool,
    'The `enableExpando` prop has been deprecated in favor of `enableToggle`. This prop will be removed in the next major release.'
  ),

  /**
   * Specify whether an expand all button should be displayed
   */
  enableToggle: PropTypes.bool,

  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription: PropTypes.string,

  /**
   * Supply an id to the th element.
   */
  id: PropTypes.string,

  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded: requiredIfGivenPropIsTruthy('enableToggle', PropTypes.bool),

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: PropTypes.oneOfType([
    requiredIfGivenPropIsTruthy(
      'enableExpando',
      PropTypes.func
    ) as Validator<any>,
    requiredIfGivenPropIsTruthy(
      'enableToggle',
      PropTypes.func
    ) as Validator<any>,
  ]),
};

export default TableExpandHeader;
