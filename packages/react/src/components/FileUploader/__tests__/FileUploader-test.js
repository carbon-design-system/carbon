/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import { mount, shallow } from 'enzyme';
import React from 'react';
import FileUploader, {
  FileUploaderButton,
  Filename,
  FileUploaderDropContainer,
  FileUploaderItem,
  FileUploaderSkeleton,
} from '../';

const { prefix } = settings;

describe('FileUploader', () => {
  const fileUploader = <FileUploader className="extra-class" />;
  const mountWrapper = mount(fileUploader);

  describe('Renders as expected with defaults', () => {
    it('should render with default className', () => {
      expect(mountWrapper.children().hasClass(`${prefix}--form-item`)).toEqual(
        true
      );
    });

    it('should render with given className', () => {
      expect(mountWrapper.hasClass('extra-class')).toEqual(true);
    });

    it('renders with FileUploaderButton with disableLabelChanges set to true', () => {
      expect(
        mountWrapper.find('FileUploaderButton').props().disableLabelChanges
      ).toEqual(true);
    });
    it('renders input with hidden prop', () => {
      expect(mountWrapper.find('input').props().className).toEqual(
        `${prefix}--visually-hidden`
      );
    });
    it(`renders with empty div.${prefix}--file-container by default`, () => {
      expect(mountWrapper.find(`div.${prefix}--file-container`).text()).toEqual(
        ''
      );
    });
    it('clears all uploaded files when the clearFiles method is called', () => {
      const mountUploadedWrapper = mount(fileUploader);
      mountUploadedWrapper.setState({
        filenames: ['examplefile.jpg'],
        filenameStatus: 'complete',
      });

      // Test to make sure that the Filename is rendered
      expect(mountUploadedWrapper.find(Filename)).toHaveLength(1);

      // Test to make sure it was properly removed
      mountUploadedWrapper.instance().clearFiles();
      expect(mountUploadedWrapper.update().find(Filename)).toHaveLength(0);
    });
  });

  describe('Update filenameStatus', () => {
    it('should have equal state and props', () => {
      expect(
        shallow(<FileUploader filenameStatus="uploading" />).state()
          .filenameStatus
      ).toEqual('uploading');
    });

    it('should change the label text upon change in props', () => {
      mountWrapper.setProps({ filenameStatus: 'uploading' });
      mountWrapper.setState({ filenameStatus: 'uploading' });
      mountWrapper.setProps({ filenameStatus: 'edit' });
      expect(mountWrapper.state().filenameStatus).toEqual('edit');
    });

    it('should avoid change the label text upon setting props, unless there the value actually changes', () => {
      mountWrapper.setProps({ filenameStatus: 'uploading' });
      mountWrapper.setState({ filenameStatus: 'edit' });
      mountWrapper.setProps({ filenameStatus: 'uploading' });
      expect(mountWrapper.state().filenameStatus).toEqual('edit');
    });
  });
});
