import React from 'react';

export default class TabsSkeleton extends React.Component {
  render() {
    const tab = (
      <li className="bx--tabs__nav-item">
        <a className="bx--tabs__nav-link" href="javascript:void(0)">
          &nbsp;
        </a>
      </li>
    );
    return (
      <nav className="bx--tabs bx--skeleton">
        <div className="bx--tabs-trigger">
          <a href="javascript:void(0)" className="bx--tabs-trigger-text">
            &nbsp;
          </a>
          <svg width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">
            <path d="M10 0L5 5 0 0z" />
          </svg>
        </div>
        <ul className="bx--tabs__nav bx--tabs__nav--hidden">
          <li className="bx--tabs__nav-item bx--tabs__nav-item--selected">
            <a className="bx--tabs__nav-link" href="javascript:void(0)">
              &nbsp;
            </a>
          </li>
          {tab}
          {tab}
          {tab}
        </ul>
      </nav>
    );
  }
}
