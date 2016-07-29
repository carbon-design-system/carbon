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
   * this.findIcon('copy-code', icons.json);
   */
  findIcon = (iconName, iconsObj = icons) => {
    return iconsObj.find(icon => {
      return (icon.name === iconName) ? icon : false;
    });
  }

  /**
   * Returns "svgData" Object
   * @param {string} iconName - "name" property of icon
   * @example
   * // Returns svgData Object for given iconName
   * this.getSvgData('copy-code');
   */
  getSvgData = (iconName) => {
    return this.findIcon(iconName).svgData;
  }

  /**
   * Returns Elements/Nodes for SVG
   * @param {Object} svgData - JSON Object for an SVG icon
   * @example
   * // Returns SVG elements
   * const svgData = this.getSvgData('copy-code');
   * this.getSvgContent(svgData);
   */
  getSvgContent = (svgData) => {
    const svgElements = Object.keys(svgData)
      .filter(key => {
        return svgData[key]
      })
      .map(svgProp => {
        const data = svgData[svgProp];

        if (svgProp === 'circles') {
          return data.map(circle => {
            const circleProps = {
              cx: circle.cx,
              cy: circle.cy,
              r: circle.r,
            };

            return <circle {...circleProps} />
          });
        }

        else if (svgProp === 'paths') {
          return data.map(path => {
            return <path d={path.d} />
          });
        }

        else if (svgProp === 'polygons') {
          return data.map(pointsData => {
            return <polygon points={poinstData.points}></polygon>
          })
        }

        else if (svgProp === 'polylines') {
          return data.map(pointsData => {
            return <polyline points={poinstData.points}></polyline>
          })
        }

        else if (svgProp === 'rects') {

          const rectProps = {
            width: data.width,
            height: data.height,
            x: data.x,
            y: data.y,
            rx: data.rx,
            ry: data.ry,
          };

          return <rect {...rectProps}></rect>
        }
      });


    return svgElements;
  }

  render() {

    // SVG Content and Data for Render
    const svgData = this.getSvgData(this.props.name);
    const svgContent = this.getSvgContent(svgData);

    // Props
    const idProp = this.findIcon(this.props.name).id;
    const iconProps = {
      className: this.props.className,
      fill: this.props.fill,
      fillRule: this.props.fillRule || 'evenodd',
      height: this.props.height || '32px',
      name: this.props.name,
      viewBox: this.props.viewBox || '0 0 32 32',
      width: this.props.width || '32px',
    }

    return (
      <svg {...iconProps} aria-labelledby={idProp}>
        <title id={idProp}>{this.props.description}</title>
        {svgContent}
      </svg>
    );
  }
}

export default Icon;
