/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

/**
 * Generic component used for reacting to a click event happening outside of a
 * given `children` element.
 */
export default class ClickListener extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onClickOutside: PropTypes.func.isRequired,
  };

  static getEventTarget(evt) {
    // support Shadow DOM
    if (evt.composed && typeof evt.composedPath === 'function') {
      return evt.composedPath()[0];
    }
    return evt.target;
  }

  constructor(props) {
    super(props);
    // We manually bind handlers in this Component, versus using class
    // properties, so that we can properly test the `handleRef` handler.
    this.handleRef = this.handleRef.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(evt) {
    if (this.element) {
      if (
        this.element.contains &&
        !this.element.contains(ClickListener.getEventTarget(evt))
      ) {
        this.props.onClickOutside(evt);
      }
    }
  }

  handleRef(el) {
    /**
     * One important note, `children.ref` corresponds to a `ref` prop passed in
     * directly to the child, not necessarily a `ref` defined in the component.
     * This means that here we target the following `ref` location:
     *
     * <ClickListener onClickOutside={() => {}}>
     *   <Child ref={targetedRefHere} />
     * </ClickListener>
     */
    this.element = el;
  }

  render() {
    const { children } = this.props;
    const childProps = { ref: this.handleRef };

    // Create a new ref callback that calls both our ref and the child's ref
    if (React.isValidElement(children) && children.props.ref) {
      const originalRef = children.props.ref;
      childProps.ref = (el) => {
        this.handleRef(el);

        // Handle different types of refs
        if (typeof originalRef === 'function') {
          originalRef(el);
        } else if (
          originalRef &&
          typeof originalRef === 'object' &&
          'current' in originalRef
        ) {
          originalRef.current = el;
        }
      };
    }

    return React.cloneElement(children, childProps);
  }
}
