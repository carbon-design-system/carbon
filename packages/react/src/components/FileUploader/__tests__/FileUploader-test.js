/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render } from '@testing-library/react';
import { getByLabel, getByText } from '@carbon/test-utils/dom';

import FileUploader from '../';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { uploadFiles } from '../test-helpers';

const iconDescription = 'test description';
const requiredProps = {
  iconDescription,
  filenameStatus: 'uploading',
  labelTitle: 'Upload files',
  labelDescription: 'Max file size is 500 MB. Only .jpg files are supported.',
};

describe('FileUploader', () => {
  it('should support a custom class name on the root element', () => {
    const { container } = render(
      <FileUploader {...requiredProps} className="test" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should not update the label by default when selecting files', () => {
    const { container } = render(
      <FileUploader {...requiredProps} buttonLabel="upload" />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const input = container.querySelector('input');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const label = getByText(container, 'upload');

    expect(label).toBeInstanceOf(HTMLElement);
    act(() => {
      uploadFiles(input, [
        new File(['test'], 'test.png', { type: 'image/png' }),
      ]);
    });
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText(container, 'upload')).toBeInstanceOf(HTMLElement);
  });

  it('should clear all uploaded files when `clearFiles` is called on a ref', () => {
    const ref = React.createRef();
    const { container } = render(<FileUploader {...requiredProps} ref={ref} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const input = container.querySelector('input');

    const filename = 'test.png';
    act(() => {
      uploadFiles(input, [new File(['test'], filename, { type: 'image/png' })]);
    });

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText(container, filename)).toBeInstanceOf(HTMLElement);
    act(() => {
      ref.current.clearFiles();
    });
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText(container, filename)).not.toBeInstanceOf(HTMLElement);
  });

  it('should synchronize the filename status state when its prop changes', () => {
    const container = document.createElement('div');
    render(<FileUploader {...requiredProps} filenameStatus="edit" />, {
      container,
    });

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const input = container.querySelector('input');
    act(() => {
      uploadFiles(input, [
        new File(['test'], 'test.png', { type: 'image/png' }),
      ]);
    });

    const edit = getByLabel(container, iconDescription);

    render(<FileUploader {...requiredProps} filenameStatus="complete" />, {
      container,
    });

    const complete = getByLabel(container, iconDescription);
    expect(edit).not.toEqual(complete);
  });
  it('should disable file input when `disabled` prop is true', () => {
    const { container } = render(
      <FileUploader {...requiredProps} disabled buttonLabel="disabled upload" />
    );
    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });
  it('should render with different button kinds', () => {
    const buttonKinds = ['primary', 'secondary', 'danger', 'ghost'];
    buttonKinds.forEach((kind) => {
      const { container } = render(
        <FileUploader {...requiredProps} buttonKind={kind} />
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass(`cds--btn--${kind}`);
    });
  });
  it('should trigger `onDelete` when a file is removed', () => {
    const onDelete = jest.fn();
    const { container } = render(
      <FileUploader
        {...requiredProps}
        filenameStatus="edit"
        onDelete={onDelete}
      />
    );
    const input = container.querySelector('input');

    act(() => {
      uploadFiles(input, [
        new File(['test'], 'test.png', { type: 'image/png' }),
      ]);
    });

    const removeFileButton = getByLabel(
      container,
      'test description - test.png'
    );

    act(() => {
      Simulate.click(removeFileButton);
    });

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
  it('should trigger `onChange` when files are selected', () => {
    const onChange = jest.fn();
    const { container } = render(
      <FileUploader {...requiredProps} onChange={onChange} />
    );
    const input = container.querySelector('input');

    act(() => {
      uploadFiles(input, [
        new File(['test'], 'test.png', { type: 'image/png' }),
      ]);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
