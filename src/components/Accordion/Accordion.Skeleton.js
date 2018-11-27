import React from 'react';
import Icon from '../Icon';
import SkeletonText from '../SkeletonText';
import { iconChevronRight } from 'carbon-icons';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class AccordionSkeleton extends React.Component {
  render() {
    const item = (
      <li className={`${prefix}--accordion__item`}>
        <button type="button" className={`${prefix}--accordion__heading`}>
          <Icon
            className={`${prefix}--accordion__arrow`}
            icon={iconChevronRight}
          />
          <SkeletonText className={`${prefix}--accordion__title`} />
        </button>
      </li>
    );
    return (
      <ul className={`${prefix}--accordion ${prefix}--skeleton`}>
        <li
          className={`${prefix}--accordion__item ${prefix}--accordion__item--active`}>
          <button type="button" className={`${prefix}--accordion__heading`}>
            <Icon
              className={`${prefix}--accordion__arrow`}
              icon={iconChevronRight}
            />
            <SkeletonText className={`${prefix}--accordion__title`} />
          </button>
          <div className={`${prefix}--accordion__content`}>
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
