import React from 'react';

export default class ToggleSmallSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className="bx--form-item">
        <input
          type="checkbox"
          id={id}
          className="bx--toggle bx--toggle--small bx--skeleton"
        />

        <label className="bx--toggle__label bx--skeleton" htmlFor={id}>
          <span className="bx--toggle__appearance">
            <svg
              className="bx--toggle__check"
              width="6px"
              height="5px"
              viewBox="0 0 6 5">
              <path d="M2.2403 2.7299L4.9245 0 6 1.1117 2.2384 5 0 2.6863 1.0612 1.511z" />
            </svg>
          </span>
        </label>
      </div>
    );
  }
}
