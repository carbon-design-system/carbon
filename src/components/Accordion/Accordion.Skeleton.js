import React from 'react';
import Icon from '../Icon';
import SkeletonText from '../SkeletonText';

export default class AccordionSkeleton extends React.Component {
  render() {
    const item = (
      <li className="bx--accordion__item">
        <button type="button" className="bx--accordion__heading">
          <Icon className="bx--accordion__arrow" name="chevron--right" />
          <SkeletonText className="bx--accordion__title" />
        </button>
      </li>
    );
    return (
      <ul className="bx--accordion bx--skeleton">
        <li className="bx--accordion__item bx--accordion__item--active">
          <button type="button" className="bx--accordion__heading">
            <Icon className="bx--accordion__arrow" name="chevron--right" />
            <SkeletonText className="bx--accordion__title" />
          </button>
          <div className="bx--accordion__content">
            <SkeletonText width="90%" />
            <SkeletonText width="80%" />
            <SkeletonText width="95%" />
          </div>
        </li>
        {item}
        {item}
        {item}
      </ul>
    );
  }
}
