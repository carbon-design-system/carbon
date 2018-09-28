import React from 'react';

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

    if (props['aria-label']) {
      iconProps.role = 'img';
      iconProps.title = props.title || props['aria-label'];
    }

    if (!props['aria-label']) {
      iconProps['aria-hidden'] = true;
    }

    return React.createElement.apply(
      undefined,
      ['svg', iconProps].concat(children)
    );
  }

  if (name) {
    Icon.displayName = name;
  }

  return Icon;
}
