const defaultAttributes = {
  // Reference:
  // https://github.com/IBM/carbon-components-react/issues/1392
  // https://github.com/PolymerElements/iron-iconset-svg/pull/47
  focusable: false,
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
} = {}) {
  const iconAttributes = {
    ...defaultAttributes,
    ...attributes,
    width,
    height,
    viewBox,
  };

  // TODO: attributes.title assumes that the consumer will implement <title> and
  // correctly set `aria-labelledby`.
  if (
    attributes['aria-label'] ||
    attributes['aria-labelledby'] ||
    attributes.title
  ) {
    iconAttributes.role = 'img';
    iconAttributes.focusable = true;
  } else {
    iconAttributes['aria-hidden'] = true;
  }

  return iconAttributes;
}
