import PropTypes from 'prop-types';
import React from 'react';
import icons from 'carbon-icons';

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
  return name ? name.svgData : false;
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
        return data.map((circle, index) => {
          const circleProps = {
            cx: circle.cx,
            cy: circle.cy,
            r: circle.r,
            key: `circle${index}`,
          };

          return <circle {...circleProps} />;
        });
      } else if (svgProp === 'paths') {
        return data.map((path, index) => (
          <path d={path.d} key={`key${index}`} />
        ));
      }

      return '';
    });

  return svgElements;
}

export function isPrefixed(name) {
  return name.split('--')[0] === 'icon';
}

const Icon = ({
  className,
  description,
  fill,
  fillRule,
  height,
  name,
  role,
  style,
  width,
  ...other
}) => {
  const icon = isPrefixed(name) ? findIcon(name) : findIcon(`icon--${name}`);

  const props = {
    className,
    fill,
    fillRule,
    height: height || icon.height,
    name: isPrefixed ? name : `icon--${name}`,
    role,
    style,
    viewBox: icon.viewBox,
    width: width || icon.width,
    ...other,
  };

  const svgContent = icon ? svgShapes(icon.svgData) : '';

  return (
    <svg {...props} aria-label={description}>
      <title>{description}</title>
      {svgContent}
    </svg>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  fill: PropTypes.string,
  fillRule: PropTypes.string,
  height: PropTypes.string,
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
  style: PropTypes.object,
  viewBox: PropTypes.string,
  width: PropTypes.string,
};

Icon.defaultProps = {
  fillRule: 'evenodd',
  role: 'img',
  description: 'Provide a description that will be used as the title',
};

export { icons };
export default Icon;
