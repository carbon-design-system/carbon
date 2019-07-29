import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class SimpleColumns extends React.Component {
  static propTypes = {
    children: PropTypes.node,

    /**
     * gutter between columns (true or false)
     */
    gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Specify a class name for columns wrapper
     */
    className: PropTypes.string,
  };

  render() {
    const { children, gutter, className } = this.props;

    const classNames = classnames({
      'simple-columns--wrapper': true,
      'simple-columns--use-gutter': gutter,
    });

    return (
      <div
        className={
          className !== undefined
            ? `${className} ${classNames}`
            : `${classNames}`
        }>
        {children}
      </div>
    );
  }
}
