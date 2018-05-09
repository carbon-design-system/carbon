import React from 'react';

export default class ToggleSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className="bx--form-item">
        <input type="checkbox" id={id} className="bx--toggle bx--skeleton" />

        <label className="bx--toggle__label bx--skeleton" htmlFor={id}>
          <span className="bx--toggle__text--left" />
          <span className="bx--toggle__appearance" />
          <span className="bx--toggle__text--right" />
        </label>
      </div>
    );
  }
}
