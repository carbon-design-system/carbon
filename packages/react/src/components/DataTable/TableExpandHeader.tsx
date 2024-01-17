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
   * Space separated list of one or more ID values referencing the TableExpandedRow(s) being controlled by the TableExpandHeader
   */
  ['aria-controls']?: string;

  /**
   * @deprecated This prop has been deprecated and will be
   * removed in the next major release of Carbon. Use the
   * `aria-label` prop instead.
   */
  ariaLabel?: string;

  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ['aria-label']: string;

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
  'ariaLabel' | 'aria-label' | 'enableToggle' | 'onExpand'
> & {
  enableToggle: true;
  ariaLabel: string;
  ['aria-label']: string;
  onExpand(event: React.MouseEvent<HTMLButtonElement>): void;
};

type TableExpandHeaderPropsWithExpando = Omit<
  TableExpandHeaderPropsBase,
  'ariaLabel' | 'aria-label' | 'enableExpando' | 'onExpand'
> & {
  enableExpando: true;
  ariaLabel: string;
  ['aria-label']: string;
  onExpand(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type TableExpandHeaderProps =
  | TableExpandHeaderPropsWithToggle
  | TableExpandHeaderPropsWithExpando
  | TableExpandHeaderPropsBase;

const TableExpandHeader = ({
  ['aria-controls']: ariaControls,
  ['aria-label']: ariaLabel,
  ariaLabel: deprecatedAriaLabel,
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
          aria-label={deprecatedAriaLabel || ariaLabel}
          aria-expanded={isExpanded}
          aria-controls={ariaControls}>
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
   * Space separated list of one or more ID values referencing the TableExpandedRow(s) being controlled by the TableExpandHeader
   */
  ['aria-controls']: PropTypes.string,

  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ariaLabel: PropTypes.string,

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
