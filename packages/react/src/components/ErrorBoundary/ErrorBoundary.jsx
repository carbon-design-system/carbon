/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundaryContext } from './ErrorBoundaryContext';

/**
 * React introduced additional lifecycle methods in v16 for capturing errors
 * that occur in a specific sub-tree of components. This component helps to
 * consolidate some of the duplication that occurs when using these lifecycle
 * methods across a codebase. In addition, it allows you to specify the fallback
 * UI to display when an error occurs in the sub-tree through the `fallback`
 * prop.
 *
 * This component roughly follows the React.js docs example code for these
 * methods. In addition, it takes advantage of an `ErrorBoundaryContext` so that
 * consumers can specify their own logic for logging errors. For example,
 * reporting an error in the UI to an external service for every `ErrorBoundary`
 * used.
 *
 * Reference:
 * https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
 */
export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    fallback: PropTypes.node,
  };

  static contextType = ErrorBoundaryContext;

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.context.log(error, info);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
