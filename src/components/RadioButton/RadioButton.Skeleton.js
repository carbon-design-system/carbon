import React from 'react';

export default class RadioButtonSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className="radioButtonWrapper">
        <div className="bx--radio-button bx--skeleton" />
        <label className="bx--radio-button__label bx--skeleton" htmlFor={id} />
      </div>
    );
  }
}
