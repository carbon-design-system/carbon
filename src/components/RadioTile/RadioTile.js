import PropTypes from 'prop-types';
import React from 'react';
import uid from '../../tools/uniqueId';
import Icon from '../Icon';
import classNames from 'classnames';

export default class RadioTile extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  static defaultProps = {
    onChange: () => {},
  };

  UNSAFE_componentWillMount() {
    this.uid = this.props.id || uid();
  }

  handleChange = evt => {
    this.props.onChange(this.props.value, this.props.name, evt);
  };

  render() {
    const { children, className, ...other } = this.props;

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
          <Icon name="checkmark--solid" description="Tile checkmark" />
        </div>
        <div className="bx--tile-content">{children}</div>
      </label>
    );
  }
}
