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
import Select from '../../Select';
import SelectItem from '../../SelectItem';

const { prefix } = settings;
const getInstanceId = setupGetInstanceId();

function PageSelector({
  className,
  currentPage,
  id,
  labelText,
  totalPages,
  ...other
}) {
  const namespace = `${prefix}--unstable-pagination__page-selector`;
  const instanceId = `${namespace}__select-${getInstanceId()}`;

  const renderPages = (total) => {
    const pages = [];
    for (let counter = 1; counter <= total; counter += 1) {
      pages.push(
        <SelectItem key={counter} value={counter} text={String(counter)} />
      );
    }
    return pages;
  };

  return (
    <Select
      className={classnames(namespace, className)}
      hideLabel
      id={instanceId || id}
      inline
      labelText={labelText}
      value={currentPage}
      {...other}>
      {renderPages(totalPages)}
    </Select>
  );
}

PageSelector.propTypes = {
  /** Extra class names to add. */
  className: PropTypes.string,

  /** The current page. */
  currentPage: PropTypes.number.isRequired,

  /** The unique ID of this component instance. */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Translatable string to label the page selector element. */
  labelText: PropTypes.string,

  /**
   * Total number of pages.
   * This value is calculated using a valid `totalItems` prop passed to the parent `Unstable_Pagination`.
   */
  totalPages: PropTypes.number.isRequired,
};

PageSelector.defaultProps = {
  className: null,
  id: 1,
  labelText: 'Current page number',
};

export default PageSelector;
