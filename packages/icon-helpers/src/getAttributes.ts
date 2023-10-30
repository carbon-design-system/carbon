/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

interface IconAttributes
  extends Omit<React.SVGProps<React.ReactSVGElement>, 'tabIndex'> {
  tabindex?: string | number | undefined;

  title?: string | undefined;
}

export const defaultAttributes: IconAttributes = {
  // Reference:
  // https://github.com/IBM/carbon-components-react/issues/1392
  // https://github.com/PolymerElements/iron-iconset-svg/pull/47
  // `focusable` is a string attribute which is why we do not use a boolean here
  focusable: 'false',
  preserveAspectRatio: 'xMidYMid meet',
};

/**
 * Get supplementary HTML attributes for a given <svg> element based on existing
 * attributes.
 */
export default function getAttributes({
  width,
  height,
  viewBox = `0 0 ${width} ${height}`,
  ...attributes
}: IconAttributes = {}): IconAttributes {
  const { tabindex, ...rest } = attributes;
  const iconAttributes: IconAttributes = {
    ...defaultAttributes,
    ...rest,
    width,
    height,
    viewBox,
  };

  // TODO: attributes.title assumes that the consumer will implement <title> and
  // correctly set `aria-labelledby`.
  if (
    iconAttributes['aria-label'] ||
    iconAttributes['aria-labelledby'] ||
    iconAttributes.title
  ) {
    iconAttributes.role = 'img';

    // Reference:
    // https://allyjs.io/tutorials/focusing-in-svg.html
    if (tabindex !== undefined && tabindex !== null) {
      iconAttributes.focusable = 'true';
      iconAttributes.tabindex = tabindex;
    }
  } else {
    iconAttributes['aria-hidden'] = true;
  }

  return iconAttributes;
}
