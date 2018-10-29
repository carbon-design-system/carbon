import React from 'react';

export default class CheckboxSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className="bx--form-item bx--checkbox-wrapper">
        {
          // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
          <label className="bx--checkbox-label bx--skeleton" htmlFor={id} />
        }
      </div>
    );
  }
}
