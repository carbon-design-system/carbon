import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class BreadcrumbSkeleton extends React.Component {
  render() {
    const item = (
      <div className={`${prefix}--breadcrumb-item`}>
        <a href="/#" className={`${prefix}--link`}>
          &nbsp;
        </a>
      </div>
    );
    return (
      <div className={`${prefix}--breadcrumb ${prefix}--skeleton`}>
        {item}
        {item}
        {item}
      </div>
    );
  }
}
