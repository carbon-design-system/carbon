import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import Tag, { types as typesList } from '../Tag';
import TagSkeleton from '../Tag/Tag.Skeleton';
import { componentsX } from '../../internal/FeatureFlags';

const types = typesList.reduce(
  (o, type) => ({
    ...o,
    [`${type} (${type})`]: type,
  }),
  {}
);

storiesOf('Tag', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <div>
        <Tag
          className="some-class"
          type={select(
            'Tag type (type)',
            types,
            componentsX ? 'basic' : 'experimental'
          )}
          disabled={boolean('Disabled (disabled)', false)}>
          {text('Content (children)', 'This is not a tag')}
        </Tag>
      </div>
    ),
    {
      info: {
        text: `
            Tags are used for items that need to be labeled, categorized, or organized using keywords that describe them.
            The example below shows how the Tag component can be used. Each type has a default message describing the type,
            but a custom message can also be applied.
          `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div>
        <TagSkeleton />
      </div>
    ),
    {
      info: {
        text: `
          Placeholder skeleton state to use when content is loading.
          `,
      },
    }
  );
