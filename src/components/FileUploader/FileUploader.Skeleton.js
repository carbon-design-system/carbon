import React from 'react';
import { settings } from 'carbon-components';
import SkeletonText from '../SkeletonText';
import ButtonSkeleton from '../Button/Button.Skeleton';

const { prefix } = settings;

export default class FileUploaderSkeleton extends React.Component {
  render() {
    return (
      <div className={`${prefix}--form-item`}>
        <SkeletonText heading width="100px" />
        <SkeletonText
          width="225px"
          className={`${prefix}--label-description`}
        />
        <ButtonSkeleton />
      </div>
    );
  }
}
