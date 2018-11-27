import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class TagSkeleton extends React.Component {
  render() {
    return <span className={`${prefix}--tag ${prefix}--skeleton`} />;
  }
}
