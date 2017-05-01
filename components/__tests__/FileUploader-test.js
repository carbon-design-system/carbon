import React from 'react';
import FileUploader from '../FileUploader';
import { mount, shallow } from 'enzyme';

describe('FileUploader', () => {
  describe('Renders as expected with default props', () => {
    const rootWrapper = shallow(<FileUploader id="testID" />);
    it('has the expected classes', () => {
      expect(rootWrapper.hasClass('fileUploaderWrapper')).toBe(true);
    });
    it('should render a label with expected props, children', () => {
      const label = rootWrapper.find('label');
      expect(label.length).toBe(1);
      expect(label.hasClass('bx--file__label')).toBe(true);
      expect(label.props()['data-button-title']).toBe('Choose Files');
    });
    it('should render an input with expected props', () => {
      const input = rootWrapper.find('input');
      expect(input.length).toEqual(1);
      expect(input.hasClass('bx--file__input')).toEqual(true);
      expect(input.props().tabIndex).toEqual(0);
      expect(input.props()['data-multiple-caption']).toEqual('0 files selected');
      expect(input.props()['data-label']).toEqual('[data-file-appearance]');
      expect(input.props()['data-file-uploader']).toEqual(true);
      expect(input.props().multiple).toEqual(true);
    });
  });

  describe('should set props if passed in', () => {
    it('should set tabIndex if one is passed via props', () => {
      const rootWrapper = shallow(<FileUploader tabIndex={2} id="testID" />);
      const input = rootWrapper.find('input');
      expect(input.props().tabIndex).toEqual(2);
    });
    it('should set labelDescription if one is passed via props', () => {
      const rootWrapper = shallow(<FileUploader id="testID" labelDescription="test description" />);
      const label = rootWrapper.find('label');
      expect(label.props().children).toEqual('test description');
    });
    it('should set id if one is passed via props', () => {
      const rootWrapper = shallow(<FileUploader id="testID" />);
      const label = rootWrapper.find('label');
      expect(label.props().htmlFor).toEqual('testID');
    });
    it('should set className if one is passed via props', () => {
      const rootWrapper = shallow(<FileUploader id="testID" className="extra-class" />);
      const label = rootWrapper.find('label');
      expect(label.hasClass('bx--file__label')).toBe(true);
      expect(label.hasClass('extra-class')).toBe(true);
    });
    it('should set multiple if one is passed via props', () => {
      const rootWrapper = shallow(<FileUploader id="testID" multiple={false} />);
      const input = rootWrapper.find('input');
      expect(input.props().multiple).toBe(false);
    });
    it('should set the button text via props', () => {
      const rootWrapper = shallow(<FileUploader id="testID" buttonText="Upload" />);
      const label = rootWrapper.find('label');
      expect(label.props()['data-button-title']).toBe('Upload');
    });
    it('should support a custom label for multiple file upload', () => {
      const rootWrapper = mount(<FileUploader id="testID" multipleFilesText={count => `${count} files!`} />);
      const input = rootWrapper.find('input');
      expect(input.props()['data-multiple-caption']).toEqual('0 files!');
    });
  });

  describe('updateLabel method should work as intended', () => {
    it('should properly update label for single file upload', () => {
      const rootWrapper = mount(<FileUploader id="testID" />);
      const input = rootWrapper.find('input');
      const label = rootWrapper.find('label');
      expect(input.props()['data-multiple-caption']).toEqual('0 files selected');

      const evt = {
        target: {
          dataset: {
            label: '[data-file-appearance=true]',
            multipleCaption: '0 files selected',
          },
          value: 'testFile1',
        },
      };

      input.simulate('change', evt);
      expect(label.props().children).toEqual('testFile1');
    });

    it('should properly update label for multiple file upload', () => {
      const rootWrapper = mount(<FileUploader id="testID" />);
      const input = rootWrapper.find('input');
      const label = rootWrapper.find('label');
      expect(input.props()['data-multiple-caption']).toEqual('0 files selected');

      const evt = {
        target: {
          dataset: {
            label: '[data-file-appearance=true]',
            multipleCaption: '0 files selected',
          },
          files: ['testFile1', 'testFile2'],
        },
      };

      input.simulate('change', evt);
      expect(label.props().children).toEqual('2 files selected');
    });
  });
});
