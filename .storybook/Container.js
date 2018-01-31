import React, { Component } from 'react';
import './polyfills';
import './_container.scss';

export default class Container extends Component {
  render() {
    const { story } = this.props;

    return (
      <div
        style={{
          padding: '3em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {story()}
      </div>
    );
  }
}
