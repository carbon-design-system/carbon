import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * The toggle button of the side nav.
 */
class SideNavToggle extends Component {
  static propTypes = {
    /**
     * The handler for change in the toggle state.
     */
    onChange: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {};
  }

  /**
   * Toggles this side nav.
   */
  toggle = () => {
    const { onChange } = this.props;
    this.setState(
      ({ closed }) => ({ closed: !closed }),
      () => {
        if (onChange) {
          const { closed } = this.state;
          onChange({ closed });
        }
      }
    );
  };

  render() {
    const { closed } = this.state;
    const classNames = classnames('side-nav__toggle-btn', {
      'side-nav__toggle-btn--closed': closed,
    });

    return (
      <button type="button" aria-label="Toggle Side Navigation" className={classNames} onClick={this.toggle}>
        <div>
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </div>
      </button>
    );
  }
}

export default SideNavToggle;
