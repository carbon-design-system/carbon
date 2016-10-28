import React, { PropTypes } from 'react';
import icons from '@console/bluemix-icons/icons.json';

const propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  fill: PropTypes.string,
  fillRule: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps = {
  fillRule: 'evenodd',
  height: '32px',
  width: '32px',
  viewBox: '0 0 32 32',
};

/**
 * Returns a single icon Object
 * @param {string} iconName - "name" property of icon
 * @param {Object} [iconsObj=icons] - JSON Array of Objects
 * @example
 * // Returns a single icon Object
 * this.findIcon('copy-code', icons.json);
 */
export function findIcon(name, iconsObj = icons) {
  const icon = iconsObj.filter(obj => obj.name === name);

  if (icon.length === 0) {
    return false;
  } else if (icon.length > 1) {
    throw new Error('Multiple icons found...');
  } else {
    return icon[0];
  }
}

/**
 * Returns "svgData" Object
 * @param {string} iconName - "name" property of icon
 * @example
 * // Returns svgData Object for given iconName
 * this.getSvgData('copy-code');
 */
export function getSvgData(iconName) {
  const name = findIcon(iconName);
  return (name) ? name.svgData : false;
}

/**
 * Returns Elements/Nodes for SVG
 * @param {Object} svgData - JSON Object for an SVG icon
 * @example
 * // Returns SVG elements
 * const svgData = this.getSvgData('copy-code');
 * this.getSvgContent(svgData);
 */
export function getSvgContent(svgData) {
  const svgElements = Object.keys(svgData)
    .filter(key => svgData[key])
    .map(svgProp => {
      const data = svgData[svgProp];

      if (svgProp === 'circles') {
        return data.map(circle => {
          const circleProps = {
            cx: circle.cx,
            cy: circle.cy,
            r: circle.r,
          };

          return <circle {...circleProps} />;
        });
      } else if (svgProp === 'paths') {
        return data.map(path => <path d={path.d} />);
      } else if (svgProp === 'polygons') {
        return data.map(pointsData => <polygon points={pointsData.points}></polygon>);
      } else if (svgProp === 'polylines') {
        return data.map(pointsData => <polyline points={pointsData.points}></polyline>);
      } else if (svgProp === 'rects') {
        const rectProps = {
          width: data.width,
          height: data.height,
          x: data.x,
          y: data.y,
          rx: data.rx,
          ry: data.ry,
        };

        return <rect {...rectProps}></rect>;
      }

      return '';
    });


  return svgElements;
}

const Icon = ({ className, fill, fillRule, height, width, name, viewBox, style, description }) => {
  // SVG Content and Data for Render
  const svgData = getSvgData(name);
  const svgContent = getSvgContent(svgData);

  // Props
  const props = {
    className,
    fill,
    fillRule,
    height,
    width,
    name,
    viewBox,
    style,
  };

  const id = findIcon(name).id;

  return (
    <svg {...props} aria-labelledby={id}>
      <title id={id}>{description}</title>
      {svgContent}
    </svg>
  );
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export { icons };

export default Icon;
