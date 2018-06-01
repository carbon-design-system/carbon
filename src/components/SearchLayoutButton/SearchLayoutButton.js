import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

/**
 * The layout button for `<Search>`.
 */
class SearchLayoutButton extends Component {
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
     * The callback called when layout switches.
     */
    onChangeFormat: PropTypes.func,
  };

  static defaultProps = {
    labelText: 'Filter',
  };

  state = {
    /**
     * The current layout.
     * @type {string}
     */
    format: this.props.format || 'list',
  };

  UNSAFE_componentWillReceiveProps({ format }) {
    const { format: prevFormat } = this.props;
    if (prevFormat !== format) {
      this.setState({ format: format || 'list' });
    }
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
    const { labelText } = this.props;
    return (
      <button
        className="bx--search-button"
        type="button"
        onClick={this.toggleLayout}
        aria-label={labelText}>
        {this.state.format === 'list' ? (
          <div className="bx--search__toggle-layout__container">
            <Icon name="list" description="list" className="bx--search-view" />
          </div>
        ) : (
          <div className="bx--search__toggle-layout__container">
            <Icon
              name="grid"
              description="toggle-layout"
              className="bx--search-view"
            />
          </div>
        )}
      </button>
    );
  }
}

export default SearchLayoutButton;
