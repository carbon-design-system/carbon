/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import setupGetInstanceId from '../../../tools/setupGetInstanceId';
import NumberInput from '../../NumberInput';

const { prefix } = settings;
const getInstanceId = setupGetInstanceId();

function PageInput({
  className,
  currentPage,
  id,
  invalidText,
  label,
  max,
  min,
  totalPages,
  ...other
}) {
  const namespace = `${prefix}--unstable-pagination__page-input`;
  const instanceId = `${namespace}__input-${getInstanceId()}`;

  return (
    <NumberInput
      className={classnames(namespace, className)}
      hideLabel
      id={instanceId || id}
      invalidText={invalidText}
      label={label}
      value={currentPage}
      max={max || totalPages}
      min={min}
      {...other}
    />
  );
}

PageInput.propTypes = {
  /** Extra class names to add. */
  className: PropTypes.string,

  /** The current page. */
  currentPage: PropTypes.number.isRequired,

  /** The unique ID of this component instance. */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Translatable string for the message shown when an invalid page is entered. */
  invalidText: PropTypes.string,

  /** Translatable string to label the page input element. */
  label: PropTypes.string,

  /** The maximum value accepted. By default, this value will be the `totalPages` passed from the parent. */
  max: PropTypes.number,

  /** The minimum value accepted. */
  min: PropTypes.number,

  /**
   * Total number of pages.
   * This value is calculated using a valid `totalItems` prop passed to the parent `Unstable_Pagination`.
   * Here, `totalItems` is used to set the `max` on the page input.
   */
  totalPages: PropTypes.number.isRequired,
};

PageInput.defaultProps = {
  className: null,
  id: 1,
  label: 'Current page number',
  max: undefined,
  min: 1,
  invalidText: 'Not a valid page number.',
};

export default PageInput;
