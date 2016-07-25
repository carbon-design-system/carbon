import React, { Component }  from 'react';
import icons from '@console/bluemix-icons/icons.json';

class Icon extends Component {

  static propTypes = {
    className: React.PropTypes.string,
  }

  /**
   * Returns a single icon Object
   * @param {string} iconName - "name" property of icon
   * @param {Object} [iconsObj=icons] - JSON Array of Objects
   * @example
   * // Returns a single icon Object
   * this._findIcon('copy-code', icons.json);
   */
  _findIcon = (iconName, iconsObj = icons) => {
    return iconsObj.find(icon => {
      return (icon.name === iconName) ? icon : false;
    });
  }

  /**
   * Returns a value from "svgData" object
   * @param {string} iconName - "name" property of icon
   * @param {Object} data - JSON Object, value returned from this._findIcon
   * @example
   * // Returns Array of svgData
   * this._getSvgData('copy-code', 'paths');
   */
  _getSvgData = (iconName, data) => {
    const svgData = this._findIcon(iconName).svgData;
    if (svgData[data] === '' || undefined) {
      return false
    }

    return svgData[data];
  }

  _getPaths = (iconName) => {
    const paths = this._getSvgData(iconName, 'paths');

    return paths.map(path => {
      return <path d={path.d} />
    });
  }

  _getCircles = (iconName) => {
    const circles = this._getSvgData(iconName, 'circles');

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
