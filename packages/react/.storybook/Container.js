import React, { Component } from 'react';
import './polyfills';
import './_container.scss';
import { settings } from 'carbon-components';

const { prefix } = settings;
export default class Container extends Component {
  componentDidMount() {
    if (process.env.CARBON_REACT_STORYBOOK_USE_RTL === 'true') {
      document.documentElement.dir = 'rtl';
    }
  }

  render() {
    const { story } = this.props;

    let bgColor = '#ffffff';
    if (story().props.context.kind === '[Experimental] UI Shell') {
      bgColor = '#f3f3f3';
    }

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
            backgroundColor: bgColor,
          }}>
          {story()}
        </div>
        <input
          aria-label="input-text-offleft"
          type="text"
          className={`${prefix}--visually-hidden`}
        />
      </React.StrictMode>
    );
  }
}
