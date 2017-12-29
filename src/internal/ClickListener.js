import PropTypes from 'prop-types';
/* global document */

import React from 'react';

class ClickListener extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClickOutside: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = evt => {
    if (this.element) {
      if (!this.element.contains(evt.target)) {
        this.props.onClickOutside(evt);
      }
    }
  };

  render() {
    return (
      <div
        ref={el => {
          this.element = el;
        }}>
        {this.props.children}
      </div>
    );
  }
}

export default ClickListener;
