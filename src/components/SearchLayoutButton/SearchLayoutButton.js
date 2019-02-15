/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { iconList, iconGrid } from 'carbon-icons';
import { settings } from 'carbon-components';
import Icon from '../Icon';
import ListBulleted16 from '@carbon/icons-react/lib/list--bulleted/16';
import Grid16 from '@carbon/icons-react/lib/grid/16';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;

/**
 * The layout button for `<Search>`.
 */
class SearchLayoutButton extends Component {
  state = { format: 'list' };

  static propTypes = {
    /**
     * The layout.
     */
    format: PropTypes.oneOf(['list', 'grid']),

    /**
     * The a11y label text.
     */
    labelText: PropTypes.string,

    /**
     * The description for the "list" icon.
     */
    iconDescriptionList: PropTypes.string,

    /**
     * The description for the "grid" icon.
     */
    iconDescriptionGrid: PropTypes.string,

    /**
     * The callback called when layout switches.
     */
    onChangeFormat: PropTypes.func,
  };

  static defaultProps = {
    labelText: 'Filter',
    iconDescriptionList: 'list',
    iconDescriptionGrid: 'grid',
  };

  static getDerivedStateFromProps({ format }, state) {
    const { prevFormat } = state;

    return prevFormat === format
      ? null
      : {
          format: format || 'list',
          prevFormat: format,
        };
  }

  /**
   * Toggles the button state upon user-initiated event.
   */
  toggleLayout = () => {
    const format = this.state.format === 'list' ? 'grid' : 'list';
    this.setState({ format }, () => {
      const { onChangeFormat } = this.props;
      if (typeof onChangeFormat === 'function') {
        onChangeFormat({ format });
      }
    });
  };

  render() {
    const { labelText, iconDescriptionList, iconDescriptionGrid } = this.props;
    const SearchLayoutButtonIcon = () => {
      if (componentsX) {
        if (this.state.format === 'list') {
          return (
            <ListBulleted16
              className={`${prefix}--search-view`}
              aria-label={iconDescriptionList}
            />
          );
        }
        return (
          <Grid16
            className={`${prefix}--search-view`}
            aria-label={iconDescriptionGrid}
          />
        );
      }
      return (
        <Icon
          icon={this.state.format === 'list' ? iconList : iconGrid}
          description={
            this.state.format === 'list'
              ? iconDescriptionList
              : iconDescriptionGrid
          }
          className={`${prefix}--search-view`}
        />
      );
    };
    return (
      <button
        className={`${prefix}--search-button`}
        type="button"
        onClick={this.toggleLayout}
        aria-label={labelText}>
        <div className={`${prefix}--search__toggle-layout__container`}>
          <SearchLayoutButtonIcon />
        </div>
      </button>
    );
  }
}

export default SearchLayoutButton;
