import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class ToggleSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className={`${prefix}--form-item`}>
        <input
          type="checkbox"
          id={id}
          className={`${prefix}--toggle ${prefix}--skeleton`}
        />

        <label
          className={`${prefix}--toggle__label ${prefix}--skeleton`}
          htmlFor={id}>
          <span className={`${prefix}--toggle__text--left`} />
          <span className={`${prefix}--toggle__appearance`} />
          <span className={`${prefix}--toggle__text--right`} />
        </label>
      </div>
    );
  }
}
