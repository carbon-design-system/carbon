/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { iconFilter } from 'carbon-icons';
import { settings } from 'carbon-components';
import Icon from '../Icon';
import Filter16 from '@carbon/icons-react/lib/filter/16';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;

/**
 * The filter button for `<Search>`.
 */
const SearchFilterButton = ({ labelText, iconDescription, ...other }) => (
  <button
    className={`${prefix}--search-button`}
    type="button"
    aria-label={labelText}
    {...other}>
    {componentsX ? (
      <Filter16
        className={`${prefix}--search-filter`}
        aria-label={iconDescription}
      />
    ) : (
      <Icon
        icon={iconFilter}
        description={iconDescription}
        className={`${prefix}--search-filter`}
      />
    )}
  </button>
);

SearchFilterButton.propTypes = {
  /**
   * The a11y label text.
   */
  labelText: PropTypes.string,

  /**
   * The icon description.
   */
  iconDescription: PropTypes.string,
};

SearchFilterButton.defaultProps = {
  labelText: 'Search',
  iconDescription: 'filter',
};

export default SearchFilterButton;
