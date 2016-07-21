import React, { Component }  from 'react';
import icons from '@console/bluemix-icons/icons.json';

class Icon extends Component {

  static propTypes = {
    className: React.PropTypes.string,
  }

  _findIcon = (iconName) => {
    return icons.find(icon => {
      return (icon.name === iconName) ? icon : false;
    });
  }

  _getPaths = (iconName) => {
    const paths = this._findIcon(iconName).svgData.paths;
    if (paths === "" || paths === undefined) {
      return false;
    }

    return paths.map(path => {
      return <path d={path.d} />
    });
  }

  _getCircles = (iconName) => {
    const circles = this._findIcon(iconName).svgData.circles;
    if (circles === "" || circles === undefined) {
      return false;
    }

    return circles.map(circle => {
      return <circle cx={circle.cx} cy={circle.cy} r={circle.r} />
    });
  }

  render() {
    const paths = this._getPaths(this.props.name);
    const circles = this._getCircles(this.props.name);

    const iconProps = {
      name: this.props.name,
      fill: this.props.fill,
      fillRule: this.props.fillRule || 'evenodd',
    }

    return (
      <svg
        {...iconProps}
        xmlns="http://www.w3.org/2000/svg"
      >
        { paths }
        { circles }
      </svg>
    );
  }
}

export default Icon;
