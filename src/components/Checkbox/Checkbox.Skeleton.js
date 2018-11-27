import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class CheckboxSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className={`${prefix}--form-item ${prefix}--checkbox-wrapper`}>
        {
          // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
          <label
            className={`${prefix}--checkbox-label ${prefix}--skeleton`}
            htmlFor={id}
          />
        }
      </div>
    );
  }
}
