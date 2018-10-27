import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  'aria-hidden': PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  children: PropTypes.node,
  focusable: PropTypes.bool,
  height: PropTypes.number,
  preserveAspectRatio: PropTypes.string,
  title: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

const defaultProps = {
  // Reference:
  // https://github.com/IBM/carbon-components-react/issues/1392
  // https://github.com/PolymerElements/iron-iconset-svg/pull/47
  focusable: false,
  preserveAspectRatio: 'xMidYMid meet',
};

export function createIconComponent({
  name,
  width,
  height,
  viewBox = `0 0 ${width} ${height}`,
  children,
}) {
  function Icon(props) {
    const iconProps = Object.assign(
      {
        width,
        height,
        viewBox,
      },
      props
    );

    if (props['aria-label'] || props['aria-labelledby'] || props.focusable) {
      iconProps.role = 'img';
      iconProps.focusable = true;
    }

    // If no accessibility-related property is passed in, set `aria-hidden` to
    // true because it is a non-interactive element. `focusable` is a special
    // case here in that we need to allow users to specify it if supplying a
    // title in children.
    if (!(props['aria-label'] || props['aria-labelledby'] || props.focusable)) {
      iconProps['aria-hidden'] = true;
    }

    return React.createElement.apply(
      undefined,
      ['svg', iconProps].concat(props.children, children)
    );
  }

  if (name) {
    Icon.displayName = name;
  }

  Icon.propTypes = propTypes;
  Icon.defaultProps = defaultProps;

  return Icon;
}
