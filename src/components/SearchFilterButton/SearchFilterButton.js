import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

/**
 * The filter button for `<Search>`.
 */
const SearchFilterButton = ({ labelText, ...other }) => (
  <button
    className="bx--search-button"
    type="button"
    aria-label={labelText}
    {...other}>
    <Icon name="filter" description="filter" className="bx--search-filter" />
  </button>
);

SearchFilterButton.propTypes = {
  /**
   * The a11y label text.
   */
  labelText: PropTypes.string,
};

SearchFilterButton.defaultProps = {
  labelText: 'Search',
};

export default SearchFilterButton;
