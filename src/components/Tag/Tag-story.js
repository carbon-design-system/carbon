import React from 'react';
import { storiesOf } from '@storybook/react';
import Tag, { types } from '../Tag';

storiesOf('Tag', module).addWithInfo(
  'Default',
  `
      Tags are used for items that need to be labeled, categorized, or organized using keywords that describe them.
      The example below shows how the Tag component can be used. Each type has a default message describing the type,
      but a custom message can also be applied.
    `,
  () => (
    <div>
      <div>
        {types.map(type => (
          <Tag key={type} className="some-class" type={type} />
        ))}
      </div>
      <div>{<Tag type="experimental">Custom Message</Tag>}</div>
    </div>
  )
);
