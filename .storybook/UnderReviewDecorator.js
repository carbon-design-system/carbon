import React from 'react';
import Tag from '../components/Tag';

const UnderReviewDecorator = (story) => (
  <div>
    <div style={{ position: 'absolute', top: 0, left: 0 }}>
      <Tag type="experimental">Under Review</Tag>
    </div>
    {story()}
  </div>
);

export default UnderReviewDecorator;
