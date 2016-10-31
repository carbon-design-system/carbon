import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import Tag, { types } from '../../elements/Tag';

storiesOf('Tag', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addWithInfo(
    'tags',
    `The example below shows how the Tag component can be used. Each type has a default message describing the type,
     but a custom message can also be applied.`,
    () => (
      <div>
        <div>
          {types.map(type => <Tag key={type} className="some-class" type={type} />)}
        </div>
        <div>
          {<Tag type="experimental">Custom Message</Tag>}
        </div>
      </div>
      )
  );
