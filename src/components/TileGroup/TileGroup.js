import PropTypes from 'prop-types';
import React from 'react';
import RadioTile from '../RadioTile';
import warning from 'warning';

export default class TileGroup extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    valueSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    onChange: /* istanbul ignore next */ () => {},
    className: 'bx--tile-group',
  };

  state = {
    selected: null,
  };

  componentWillMount() {
    this.setState({
      selected: this.props.valueSelected || this.props.defaultSelected || null,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({
        selected: nextProps.valueSelected,
      });
    }
  }

  getRadioTiles = () => {
    const children = React.Children.map(this.props.children, tileRadio => {
      const { value, ...other } = tileRadio.props;
      /* istanbul ignore if */
      if (tileRadio.props.hasOwnProperty('checked')) {
        warning(
          false,
          `Instead of using the checked property on the RadioTile, set
            the defaultSelected property or valueSelected property on the TileGroup.`
        );
      }

      return (
        <RadioTile
          {...other}
          name={this.props.name}
          key={value}
          value={value}
          onChange={this.handleChange}
          checked={value === this.state.selected}
        />
      );
    });

    return children;
  };

  handleChange = (newSelection, value, evt) => {
    if (newSelection !== this.state.selected) {
      this.setState({ selected: newSelection });
      this.props.onChange(newSelection, this.props.name, evt);
    }
  };

  render() {
    const { disabled, className } = this.props;

    return (
      <div className={className} disabled={disabled}>
        {this.getRadioTiles()}
      </div>
    );
  }
}
