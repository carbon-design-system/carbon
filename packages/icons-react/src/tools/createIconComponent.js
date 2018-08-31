import React from 'react';

const createIconComponent = ({
  content,
  height,
  name,
  width,
  viewBox = `0 0 ${width} ${height}`,
}) => {
  const Icon = props => {
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

    return React.createElement('svg', iconProps, content);
  };

  if (name) {
    Icon.displayName = name;
  }

  return Icon;
};

export default createIconComponent;
