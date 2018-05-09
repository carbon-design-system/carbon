import React from 'react';

export default class ProgressIndicatorSkeleton extends React.Component {
  render() {
    const step = (
      <li className="bx--progress-step bx--progress-step--incomplete">
        <svg>
          <g>
            <circle cx="12" cy="12" r="12" />
          </g>
        </svg>
        <p className="bx--progress-label" />
        <span className="bx--progress-line" />
      </li>
    );

    return (
      <ul className="bx--progress bx--skeleton">
        {step}
        {step}
        {step}
        {step}
      </ul>
    );
  }
}
