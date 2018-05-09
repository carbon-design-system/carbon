import React from 'react';
import SkeletonText from '../SkeletonText';

export default class PaginationSkeleton extends React.Component {
  render() {
    return (
      <div className="bx--pagination bx--skeleton">
        <div className="bx--pagination__left">
          <SkeletonText width="70px" />
          <SkeletonText width="35px" />
          <SkeletonText width="105px" />
        </div>
        <div className="bx--pagination__right bx--pagination--inline">
          <SkeletonText width="70px" />
        </div>
      </div>
    );
  }
}
