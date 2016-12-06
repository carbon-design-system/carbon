import React, { PropTypes } from 'react';
import icons from '@console/bluemix-icons';

const propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  fill: PropTypes.string,
  fillRule: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps = {
  fillRule: 'evenodd',
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
 * const svgData = getSvgData('copy-code');
 * svgShapes(svgData);
 */
export function svgShapes(svgData) {
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
      }

      return '';
    });

  return svgElements;
}

const Icon = ({ className, width, height, fill, fillRule, name, style, description }) => {
  const icon = findIcon(name);
  const id = icon.id;
  const props = {
    className,
    fill,
    fillRule,
    name,
    style,
    viewBox: icon.viewBox,
    width: icon.width || width,
    height: icon.height || height,
  };

  const svgContent = (icon) ? svgShapes(icon.svgData) : '';

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
