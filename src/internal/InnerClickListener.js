import PropTypes from 'prop-types';
import React from 'react';

/**
 * Generic component used for reacting to a click event happening outside of a
 * given child component that used the forwarded `handleRef` function through
 * the `refKey` prop.
 */
export default class InnerClickListener extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    refKey: PropTypes.string.isRequired,
    onClickOutside: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    // We manually bind handlers in this Component, versus using class
    // properties, so that we can properly test the `handleRef` handler with
    // enzyme.
    this.handleRef = this.handleRef.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(event) {
    if (this.element) {
      if (this.element.contains && !this.element.contains(event.target)) {
        this.props.onClickOutside(event);
      }
    }
  }

  handleRef(el) {
    this.element = el;
  }

  render() {
    const { refKey, children } = this.props;
    return React.cloneElement(children, {
      [refKey]: this.handleRef,
    });
  }
}
