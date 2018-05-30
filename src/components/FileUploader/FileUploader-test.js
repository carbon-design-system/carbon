import React from 'react';
import FileUploader, { FileUploaderButton, Filename } from '../FileUploader';
import FileUploaderSkeleton from '../FileUploader/FileUploader.Skeleton';
import { mount, shallow } from 'enzyme';

describe('Filename', () => {
  const mountWrapper = mount(<Filename name={'trees.jpg'} />);

  describe('click on edit icon (close--solid)', () => {
    it('should have a click event', () => {
      const onClick = jest.fn();
      mountWrapper.setProps({ onClick, status: 'edit' });
      mountWrapper.find('Icon').simulate('click');
      expect(onClick).toBeCalled();
    });
  });
});

describe('FileUploaderButton', () => {
  const button = <FileUploaderButton className="extra-class" />;
  const mountWrapper = mount(button);

  describe('Renders as expected with default props', () => {
    it('renders with expected className', () => {
      expect(mountWrapper.children().hasClass('bx--file')).toBe(true);
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
      expect(mountWrapper.find('.bx--btn--primary').exists()).toBe(true);
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

    it('does not have default role', () => {
      expect(mountWrapper.props().role).not.toBeTruthy();
    });

    it('resets the input value onClick', () => {
      const input = mountWrapper.find('.bx--visually-hidden');
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
      expect(mountWrapper.state().labelText).toEqual(
        mountWrapper.props().labelText
      );
    });

    it('should update state with props', () => {
      mountWrapper.setProps({ labelText: 'new label' });
      expect(mountWrapper.state().labelText).toEqual(
        mountWrapper.props().labelText
      );
    });
  });
});

describe('FileUploader', () => {
  const fileUploader = <FileUploader className="extra-class" />;
  const mountWrapper = mount(fileUploader);

  describe('Renders as expected with defaults', () => {
    it('should render with default className', () => {
      expect(mountWrapper.children().hasClass('bx--form-item')).toEqual(true);
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
        'bx--visually-hidden'
      );
    });
    it('renders with empty div.bx--file-container by default', () => {
      expect(mountWrapper.find('div.bx--file-container').text()).toEqual('');
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
});

describe('FileUploaderSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<FileUploaderSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--form-item')).toEqual(true);
    });
  });
});
