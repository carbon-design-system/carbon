import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import FileUploader from '../../components/FileUploader';
import AppContainer from '../../containers/AppContainer';

const fileUploaderEvents = {
  onBlur: () => { console.log('blur'); },
  onClick: () => { console.log('click'); },
  onFocus: () => { console.log('focus'); },
  onMouseDown: () => { console.log('mouseDown'); },
  onMouseEnter: () => { console.log('mouseEnter'); },
  onMouseLeave: () => { console.log('mouseLeave'); },
  onMouseUp: () => { console.log('mouseUp'); },
  className: 'some-class',
};

storiesOf('FileUploader', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('file-uploader', () => (
    <FileUploader
      {...fileUploaderEvents}
      className="some-class"
      id="file-1"
      labelDescription="Choose Files..."
    />
  ));
