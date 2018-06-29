import React, { Component } from 'react';
import './polyfills';
import './_container.scss';

export default class Container extends Component {
  render() {
    const { story } = this.props;

    return (
      <React.StrictMode>
        <div
          data-floating-menu-container
          role="main"
          style={{
            padding: '3em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {story()}
        </div>
        <input
          aria-label="inpute-text-offleft"
          type="text"
          class="bx--visually-hidden"
        />
      </React.StrictMode>
    );
  }
}
