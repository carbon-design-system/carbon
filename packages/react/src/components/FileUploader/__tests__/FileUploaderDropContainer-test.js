/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { FileUploaderDropContainer } from '../';

const { prefix } = settings;

describe('FileUploaderDropContainer', () => {
  let onAddFiles;
  let dropContainer;
  let mountWrapper;

  beforeEach(() => {
    onAddFiles = jest.fn();
    dropContainer = (
      <FileUploaderDropContainer
        className="extra-class"
        onAddFiles={onAddFiles}
      />
    );
    mountWrapper = mount(dropContainer);
  });

  describe('Renders as expected with default props', () => {
    it('renders with given className', () => {
      expect(mountWrapper.hasClass('extra-class')).toBe(true);
    });

    it('renders with default labelText prop', () => {
      expect(mountWrapper.props().labelText).toEqual('Add file');
    });

    it('renders with default multiple prop', () => {
      expect(mountWrapper.props().multiple).toEqual(false);
    });

    it('renders with default accept prop', () => {
      expect(mountWrapper.props().accept).toEqual([]);
    });

    it('disables file upload input', () => {
      const wrapper = shallow(dropContainer);
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('input').prop('disabled')).toEqual(true);
    });

    it('does not have default role', () => {
      expect(mountWrapper.props().role).not.toBeTruthy();
    });

    it('resets the input value onClick', () => {
      const input = mountWrapper.find(`.${prefix}--file-input`);
      input.instance().value = '';
      const evt = { target: { value: input.instance().value } };
      input.simulate('click', evt);

      expect(evt.target.value).toEqual(null);
    });

    it('should call `onAddFiles` when a file is selected', () => {
      const fileFoo = new File(['foo'], 'foo.txt', { type: 'text/plain' });
      const fileBar = new File(['bar'], 'bar.txt', { type: 'text/plain' });
      const mockFiles = [fileFoo, fileBar];
      const input = mountWrapper.find(`.${prefix}--file-input`);
      const evt = { target: { files: mockFiles } };
      input.simulate('change', evt);
      expect(onAddFiles).toHaveBeenCalledTimes(1);
      expect(onAddFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            files: [fileFoo, fileBar],
          },
        }),
        { addedFiles: [fileFoo, fileBar] }
      );
    });
  });

  describe('Unique id props', () => {
    it('each FileUploaderDropContainer should have a unique ID', () => {
      const mountedDropContainers = mount(
        <div>
          <FileUploaderDropContainer className="extra-class" />
          <FileUploaderDropContainer className="extra-class" />
        </div>
      );
      const firstDropContainer = mountedDropContainers
        .find(FileUploaderDropContainer)
        .at(0);
      const lastDropContainer = mountedDropContainers
        .find(FileUploaderDropContainer)
        .at(1);
      const isEqual = firstDropContainer === lastDropContainer;
      expect(isEqual).toBe(false);
    });
  });
});
