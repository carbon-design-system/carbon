import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

/**
 * A component representing a single theme variable.
 */
export default class ThemeVariable extends PureComponent {
  static propTypes = {
    /**
     * The token name.
     */
    name: PropTypes.string,

    /**
     * The token value.
     */
    hex: PropTypes.string,

    /**
     * A callback function called when user changes the token value.
     */
    updateColor: PropTypes.func,
  };

  handleChange = (evt, name) => {
    this.props.updateColor(name, evt.target.value);
  };

  render() {
    const { name, hex } = this.props;
    return (
      <li className="variable">
        <input
          className="variable__input"
          onChange={evt => this.handleChange(evt, name)}
          type="color"
          pattern="^#([A-Fa-f0-9]{6})$"
          required
          value={hex}
          id={name}
        />
        <label htmlFor={name} className="variable__name">
          {name}
        </label>
        <p className="variable__hex">{hex}</p>
      </li>
    );
  }
}
