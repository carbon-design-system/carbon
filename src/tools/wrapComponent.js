import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const wrapComponent = ({ name, className, type }) => {
  const Component = props => {
    const componentClass = cx(className, props.className);
    return React.createElement(type, {
      ...props,
      // Prevent Weird quirk where `cx` will evaluate to an empty string, '',
      // and so we have empty `class` attributes in the resulting markup
      // eslint-disable-next-line no-extra-boolean-cast
      className: !!componentClass ? componentClass : undefined,
    });
  };
  Component.displayName = name;
  Component.propTypes = {
    className: PropTypes.string,
  };
  return Component;
};

export default wrapComponent;
