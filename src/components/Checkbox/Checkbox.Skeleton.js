import React from 'react';

export default class CheckboxSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className="bx--form-item bx--checkbox-wrapper">
        <label className="bx--checkbox-label bx--skeleton" htmlFor={id} />
      </div>
    );
  }
}
