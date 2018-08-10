import PropTypes from 'prop-types';
import React from 'react';
import uid from '../../tools/uniqueId';
import Icon from '../Icon';
import { iconCheckmarkSolid } from 'carbon-icons';
import classNames from 'classnames';

export default class RadioTile extends React.Component {
  static propTypes = {
    /**
     * `true` if this tile should be selected.
     */
    checked: PropTypes.bool,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * `true` if the `<input>` should be checked at initialization.
     */
    defaultChecked: PropTypes.bool,

    /**
     * The ID of the `<input>`.
     */
    id: PropTypes.string,

    /**
     * The `name` of the `<input>`.
     */
    name: PropTypes.string,

    /**
     * The description of the tile checkmark icon.
     */
    iconDescription: PropTypes.string,

    /**
     * The handler of the massaged `change` event on the `<input>`.
     */
    onChange: PropTypes.func,

    /**
     * The `value` of the `<input>`.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  static defaultProps = {
    iconDescription: 'Tile checkmark',
    onChange: () => {},
  };

  UNSAFE_componentWillMount() {
    this.uid = this.props.id || uid();
  }

  handleChange = evt => {
    this.props.onChange(this.props.value, this.props.name, evt);
  };

  render() {
    const { children, className, iconDescription, ...other } = this.props;

    const classes = classNames(className, 'bx--tile', 'bx--tile--selectable', {
      'bx--tile--is-selected': this.props.checked,
    });

    return (
      <label htmlFor={this.uid} className={classes}>
        <input
          {...other}
          type="radio"
          className="bx--tile-input"
          onChange={this.handleChange}
          id={this.uid}
        />

        <div className="bx--tile__checkmark">
          <Icon icon={iconCheckmarkSolid} description={iconDescription} />
        </div>
        <div className="bx--tile-content">{children}</div>
      </label>
    );
  }
}
