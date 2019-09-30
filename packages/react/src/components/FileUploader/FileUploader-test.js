/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import { Close16, CheckmarkFilled16 } from '@carbon/icons-react';
import { mount, shallow } from 'enzyme';
import FileUploader, { FileUploaderButton, Filename } from './FileUploader';
import FileUploaderDropContainer from './FileUploaderDropContainer';
import FileUploaderItem from './FileUploaderItem';
import FileUploaderSkeleton from '../FileUploader/FileUploader.Skeleton';
import Loading from '../Loading';

const { prefix } = settings;

describe('Filename', () => {
  describe('renders as expected', () => {
    const icons = [Loading, Close16, CheckmarkFilled16];
    const statuses = ['uploading', 'edit', 'complete'];
    statuses.forEach((status, i) => {
      const wrapper = mount(
        <Filename iconDescription="Upload complete" status={status} />
      );

      it('renders upload status icon as expected', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(icons[i]).length).toBe(1);
      });
    });
  });

  describe('Check that functions passed in as props are called', () => {
    let wrapper;
    let mockProps;

    beforeEach(() => {
      mockProps = {
        onClick: jest.fn(),
        onKeyDown: jest.fn(),
        status: 'complete',
      };
      wrapper = mount(<Filename {...mockProps} />);
    });

    it('should call onClick', () => {
      wrapper.simulate('click');
      expect(mockProps.onClick).toBeCalled();
    });

    it('should call onKeyDown', () => {
      wrapper.simulate('keydown');
      expect(mockProps.onKeyDown).toBeCalled();
    });
  });

  describe('click on edit icon (close--solid)', () => {
    it('should have a click event', () => {
      const mountWrapper = mount(
        <Filename iconDescription="Upload complete" status="complete" />
      );
      const onClick = jest.fn();
      mountWrapper.setProps({ onClick, status: 'edit' });
      mountWrapper.find(Close16).simulate('click');
      expect(onClick).toBeCalled();
    });
  });
});

describe('FileUploaderItem', () => {
  const mountWrapper = mount(
    <FileUploaderItem file={{ name: 'jd.jpg', status: 'edit' }} />
  );

  describe('click on edit icon (close--solid)', () => {
    it('should have a click event', () => {
      const onDelete = jest.fn();
      mountWrapper.setProps({ onDelete, status: 'edit' });
      mountWrapper.find(Close16).simulate('click');
      expect(onDelete).toBeCalled();
    });
  });
});

describe('FileUploaderButton', () => {
  const button = <FileUploaderButton className="extra-class" />;
  const mountWrapper = mount(button);

  describe('Renders as expected with default props', () => {
    it('renders with expected className', () => {
      expect(mountWrapper.find('label').hasClass(`${prefix}--btn`)).toBe(true);
    });

    it('renders with given className', () => {
      expect(mountWrapper.hasClass('extra-class')).toBe(true);
    });

    it('renders with default labelText prop', () => {
      expect(mountWrapper.props().labelText).toEqual('Add file');
    });

    it('renders with default buttonKind prop', () => {
      expect(mountWrapper.props().buttonKind).toEqual('primary');
    });

    it('renders with expected button className', () => {
      expect(mountWrapper.find(`.${prefix}--btn--primary`).exists()).toBe(true);
    });

    it('renders with default multiple prop', () => {
      expect(mountWrapper.props().multiple).toEqual(false);
    });

    it('renders with default disableLabelChanges prop', () => {
      expect(mountWrapper.props().disableLabelChanges).toEqual(false);
    });

    it('renders with default accept prop', () => {
      expect(mountWrapper.props().accept).toEqual([]);
    });

    it('renders with default disabled prop', () => {
      expect(mountWrapper.props().disabled).toBe(false);
    });

    it('disables file upload input', () => {
      const wrapper = shallow(button);
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('input').prop('disabled')).toEqual(true);
    });

    it('does have default role', () => {
      expect(mountWrapper.props().role).toBeTruthy();
    });

    it('resets the input value onClick', () => {
      const input = mountWrapper.find(`.${prefix}--visually-hidden`);
      input.instance().value = '';
      const evt = { target: { value: input.instance().value } };
      input.simulate('click', evt);

      expect(evt.target.value).toEqual(null);
    });
  });

  describe('Unique id props', () => {
    it('each FileUploaderButton should have a unique ID', () => {
      const mountedButtons = mount(
        <div>
          <FileUploaderButton className="extra-class" />
          <FileUploaderButton className="extra-class" />
        </div>
      );
      const firstButton = mountedButtons.find(FileUploaderButton).at(0);
      const lastButton = mountedButtons.find(FileUploaderButton).at(1);
      const isEqual = firstButton === lastButton;
      expect(isEqual).toBe(false);
    });
  });

  describe('Update labelText', () => {
    it('should have equal state and props', () => {
      expect(
        shallow(<FileUploaderButton labelText="foo" />).state().labelText
      ).toEqual('foo');
    });

    it('should change the label text upon change in props', () => {
      mountWrapper.setProps({ labelText: 'foo' });
      mountWrapper.setState({ labelText: 'foo' });
      mountWrapper.setProps({ labelText: 'bar' });
      expect(mountWrapper.state().labelText).toEqual('bar');
    });

    it('should avoid change the label text upon setting props, unless there the value actually changes', () => {
      mountWrapper.setProps({ labelText: 'foo' });
      mountWrapper.setState({ labelText: 'bar' });
      mountWrapper.setProps({ labelText: 'foo' });
      expect(mountWrapper.state().labelText).toEqual('bar');
    });
  });
});

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

describe('FileUploaderDropContainer', () => {
  const dropContainer = <FileUploaderDropContainer className="extra-class" />;
  const mountWrapper = mount(dropContainer);

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

describe('FileUploaderSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<FileUploaderSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--form-item`)).toEqual(true);
    });
  });
});
