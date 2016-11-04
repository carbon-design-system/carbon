import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FileUploader from '../../components/FileUploader';
import AppContainer from '../../containers/AppContainer';

const fileUploaderEvents = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('FileUploader', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addWithInfo(
    '',
    `
      The File Uploader components allow the user to upload any necessary files.
    `,
    () => (
      <FileUploader
        {...fileUploaderEvents}
        className="some-class"
        id="file-1"
        labelDescription="Choose Files..."
      />
  ));
