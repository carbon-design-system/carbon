/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { pkg } from '../../../../../../settings';

const blockClass = `${pkg.prefix}--datagrid`;
export const InlineEditButton = ({
  label,
  renderIcon: Icon,
  labelIcon: LabelIcon,
  placeholder,
  disabledCell,
  nonEditCell,
  isActiveCell,
  columnConfig,
  type,
}) => {
  return (
    <div
      className={cx(`${blockClass}__inline-edit-button`, {
        [`${blockClass}__inline-edit-button--disabled`]: disabledCell,
        [`${blockClass}__inline-edit-button--with-label-icon`]: LabelIcon,
        [`${blockClass}__inline-edit-button--non-edit`]: nonEditCell,
        [`${blockClass}__inline-edit-button--active`]: isActiveCell,
        [`${blockClass}__inline-edit-button--${type}`]:
          type === 'date' || type === 'selection',
      })}
      tabIndex={isActiveCell ? 0 : -1}
      data-disabled={disabledCell}
      aria-disabled={disabledCell}
      role="button"
    >
      {LabelIcon && (
        <div className={`${blockClass}__label-icon`}>
          <LabelIcon />
        </div>
      )}
      {label !== '' ? (
        <span
          className={cx(`${blockClass}__inline-edit-button-label`, {
            [`${blockClass}__inline-edit-button-label-with-icon`]: !nonEditCell, // update later to some kind of renderIcon prop
            [`${blockClass}__defaultStringRenderer--multiline`]:
              columnConfig?.multiLineWrap,
          })}
        >
          {label}
        </span>
      ) : (
        <span className={`${blockClass}__placeholder`}>{placeholder}</span>
      )}
      {!nonEditCell && Icon && (
        <div className={`${blockClass}__inline-edit-button-icon`}>
          <Icon />
        </div>
      )}
    </div>
  );
};

InlineEditButton.propTypes = {
  columnConfig: PropTypes.object,
  disabledCell: PropTypes.bool,
  isActiveCell: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  nonEditCell: PropTypes.bool,
  placeholder: PropTypes.string,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  type: PropTypes.oneOf(['text', 'number', 'selection', 'date', 'checkbox']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
