/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';
import icons from 'carbon-icons';

/**
 * The icons list object from `carbon-icons`.
 * @type {object}
 */
let iconsList = icons;

/**
 * Returns a single icon Object
 * @param {string} name - "name" property of icon
 * @param {object} [iconsObj=icons] - JSON Array of Objects
 * @example
 * // Returns a single icon Object
 * this.findIcon('copy-code', icons.json);
 */
export function findIcon(name, iconsObj = iconsList) {
  const icon = iconsObj.filter((obj) => obj.name === name);

  if (icon.length === 0) {
    return false;
  } else if (icon.length > 1) {
    throw new Error('Multiple icons found...');
  } else {
    return icon[0];
  }
}

/**
 * Sets the icons list object from `carbon-icons`.
 * Doing so instead of having this module directly import `carbon-icons`
 * avoids the icons list being included in applications' bundles if only limited set of icons is in use.
 * @param {object} list The icons list from `carbon-icons`.
 */
export function setIconsList(list) {
  iconsList = list;
}

/**
 * Returns "svgData" Object
 * @param {string} iconName - "name" property of icon
 * @example
 * // Returns svgData Object for given iconName
 * this.getSvgData('copy-code');
 */
export function getSvgData(iconName) {
  const icon = findIcon(iconName);
  return icon ? icon.svgData : false;
}

/**
 * @param {object} svgData - JSON Object for an SVG icon
 * @returns {ReactElement} Elements/Nodes for SVG
 * @example
 * // Returns SVG elements
 * const svgData = getSvgData('copy-code');
 * svgShapes(svgData);
 */
export function svgShapes(svgData) {
  const svgElements = Object.keys(svgData)
    .filter((key) => svgData[key])
    .map((svgProp) => {
      const data = svgData[svgProp];

      if (svgProp === 'circles') {
        return data.map((circle, index) => {
          const circleProps = {
            cx: circle.cx,
            cy: circle.cy,
            r: circle.r,
            key: `circle${index}`,
          };

          return <circle key={index} {...circleProps} />;
        });
      } else if (svgProp === 'paths') {
        return data.map((path, index) => (
          <path d={path.d} key={`key${index}`} />
        ));
      } else if (svgProp === 'polygons') {
        return data.map((polygon, index) => (
          <polygon points={polygon.points} key={`key${index}`} />
        ));
      }

      return '';
    });

  return svgElements;
}

export function isPrefixed(name) {
  if (__DEV__) {
    invariant(
      typeof name === 'string',
      '[Icon] icon name is missing. You likely forgot to specify the icon, ' +
        'or are using older (pre-`7.x`) version of `carbon-icons` library. ' +
        'To specify the icon, use either `icon` (data) or `name` (icon name) properties.'
    );
  }
  return name && name.split('--')[0] === 'icon';
}

const Icon = ({
  className,
  iconTitle,
  description,
  fill,
  fillRule,
  height,
  name,
  icon,
  role,
  style,
  width,
  iconRef,
  ...other
}) => {
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
    ref: iconRef,
    ...other,
  };

  const svgContent = icon ? svgShapes(icon.svgData) : '';

  return (
    <svg {...props} aria-label={description}>
      <title>
        {typeof iconTitle === 'undefined' ? description : iconTitle}
      </title>
      {svgContent}
    </svg>
  );
};

Icon.propTypes = {
  /**
   * The CSS class name.
   */
  className: PropTypes.string,

  /**
   * The icon description.
   */
  description: PropTypes.string.isRequired,

  /**
   * The `<svg>` `fill` attribute.
   */
  fill: PropTypes.string,

  /**
   * The `<svg>` `fillRule` attribute.
   */
  fillRule: PropTypes.string,

  /**
   * The `<svg>` `height` attribute.
   */
  height: PropTypes.string,

  /**
   * The icon data.
   */
  icon: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    viewBox: PropTypes.string.isRequired,
    svgData: PropTypes.object.isRequired,
  }),

  /**
   * The `ref` callback for the icon.
   */
  iconRef: PropTypes.func,

  /**
   * The icon title.
   */
  iconTitle: PropTypes.string,

  /**
   * The name of the icon.
   */
  name: PropTypes.string,

  /**
   * The `role` attribute.
   */
  role: PropTypes.string,

  /**
   * The CSS styles.
   */
  style: PropTypes.object,

  /**
   * The `<svg>` `viewbox` attribute.
   */
  viewBox: PropTypes.string,

  /**
   * The `<svg>` `width` attribute.
   */
  width: PropTypes.string,
};

Icon.defaultProps = {
  fillRule: 'evenodd',
  role: 'img',
};

export { icons };
export default Icon;
