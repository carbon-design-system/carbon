/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { Search } from '@carbon/react';

import { getDevtoolsProps } from '../../../global/js/utils/devtools';
import { pkg } from '../../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--filter-panel-search`;
const componentName = 'FilterPanelSearch';

const defaults = {
  searchProps: {},
};

/**
 * An input field and container to show search results.
 * @deprecated This component is deprecated
 */
export let FilterPanelSearch = React.forwardRef(
  (
    { children, className, searchProps = defaults.searchProps, ...rest },
    ref
  ) => {
    const [resultsVisible, setResultsVisible] = useState(false);
    let timer;

    // Hide results with a delay.
    // Gives enough time for "show" to trigger earlier.
    const hideResults = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setResultsVisible(false);
      }, 300);
    };

    // Show results immediately.
    const showResults = () => {
      clearTimeout(timer);
      setResultsVisible(true);
    };

    // On unmount, clear the timer.
    useEffect(() => {
      return clearTimeout(timer);
    }, [timer]);

    return (
      <div
        {...rest}
        className={cx(blockClass, `${blockClass}__container`, className)}
        onBlur={hideResults}
        onFocus={showResults}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        <Search className={`${blockClass}__input`} {...searchProps} />
        {resultsVisible && !!children && (
          <div className={`${blockClass}__results`}>{children}</div>
        )}
      </div>
    );
  }
);

FilterPanelSearch.deprecated = {
  level: 'warn',
  details: `This component is deprecated`,
};
// Return a placeholder if not released and not enabled by feature flag
FilterPanelSearch = pkg.checkComponentEnabled(FilterPanelSearch, componentName);

FilterPanelSearch.displayName = componentName;

FilterPanelSearch.propTypes = {
  /**
   * Provide the contents of the FilterPanelSearch.
   */
  children: PropTypes.node,

  /**
   * Optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Props specific to the internal `Search` component.
   */
  searchProps: PropTypes.shape({
    /** The label text for the Search icon. */
    labelText: PropTypes.string.isRequired,
  }).isRequired,
};
