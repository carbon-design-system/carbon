//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { carbon, pkg } from '../../settings';

import { ExportModal } from '.';

const componentName = ExportModal.displayName;

const defaultProps = {
  body: 'body content',
  className: 'test-class',
  errorMessage: 'an error occurred',
  filename: '',
  inputLabel: 'file name',
  invalidInputText: 'invalid input',
  loadingMessage: 'loading...',
  open: true,
  primaryButtonText: 'primary button',
  secondaryButtonText: 'secondary button',
  successMessage: 'success',
  title: 'header content',
  inputType: 'text',
};

describe(componentName, () => {
  it('renders body', async () => {
    render(<ExportModal {...defaultProps} />);
    screen.getByText(defaultProps.body);
  });

  it('renders title', async () => {
    render(<ExportModal {...defaultProps} />);
    screen.getByText(defaultProps.title);
  });

  it('renders the loading message', async () => {
    render(<ExportModal {...defaultProps} loading />);
    screen.getByText(defaultProps.loadingMessage);
  });

  it('renders the error message', async () => {
    render(<ExportModal {...defaultProps} error />);
    screen.getByText(defaultProps.errorMessage);
  });

  it('renders the success message', async () => {
    render(<ExportModal {...defaultProps} successful />);
    screen.getByText(defaultProps.successMessage);
  });

  it('submits with valid extension', async () => {
    const { change, blur } = fireEvent;
    const { click } = userEvent;
    const { fn } = jest;
    const onRequestSubmit = fn();
    const props = {
      ...defaultProps,
      onRequestSubmit,
      validExtensions: ['pdf'],
      invalidInputText: 'File must have valid extension .pdf',
    };

    render(<ExportModal {...props} />);
    const textInput = screen.getByRole('textbox');

    change(textInput, { target: { value: `${props.filename}.pdf` } });
    blur(textInput);
    await act(() => click(screen.getByText(props.primaryButtonText)));
    expect(onRequestSubmit).toBeCalled();
  });

  it('does not submit without text input', async () => {
    const { click } = userEvent;
    const { fn } = jest;
    const onRequestSubmit = fn();
    const props = {
      ...defaultProps,
      onRequestSubmit,
      validExtensions: ['pdf'],
      invalidInputText: 'File must have valid extension .pdf',
    };

    const { container } = render(<ExportModal {...props} />);
    const submitBtn = container.querySelector(
      `.${carbon.prefix}--btn--primary`
    );

    await act(() => click(submitBtn));
    expect(onRequestSubmit).not.toBeCalled();
  });

  it('does not submit with invalid extension', async () => {
    const { change, blur } = fireEvent;
    const { click } = userEvent;
    const { fn } = jest;
    const onRequestSubmit = fn();
    const props = {
      ...defaultProps,
      onRequestSubmit,
      validExtensions: ['pdf'],
      invalidInputText: 'File must have valid extension .pdf',
    };

    render(<ExportModal {...props} />);
    const textInput = screen.getByRole('textbox');

    change(textInput, { target: { value: `${props.filename}` } });
    blur(textInput);
    await act(() => click(screen.getByText(props.primaryButtonText)));
    expect(onRequestSubmit).not.toBeCalled();
    screen.getByText(props.invalidInputText);

    change(textInput, { target: { value: `${props.filename}.mp3` } });
    blur(textInput);
    await act(() => click(screen.getByText(props.primaryButtonText)));
    expect(onRequestSubmit).not.toBeCalled();
    screen.getByText(props.invalidInputText);
  });

  it('renders with preformatted extensions', async () => {
    const { click } = userEvent;
    const { fn } = jest;
    const onRequestSubmit = fn();
    const onClose = fn();
    const props = {
      ...defaultProps,
      onRequestSubmit,
      onClose,
      filename: 'test',
      preformattedExtensions: [
        {
          extension: 'YAML',
          description: 'best for IBM managed cloud',
        },
        {
          extension: 'BAR',
          description: 'best for integration server',
        },
      ],
      preformattedExtensionsLabel: 'Choose an export format',
    };

    const { getByLabelText } = render(<ExportModal {...props} />);

    screen.getByText(props.preformattedExtensionsLabel);
    await act(() => click(getByLabelText('BAR (best for integration server)')));
    await act(() => click(screen.getByText(props.primaryButtonText)));
    expect(onRequestSubmit).toBeCalledWith(`${props.filename}.bar`);

    await act(() => click(screen.getByText(props.secondaryButtonText)));
    expect(onClose).toBeCalled();
  });

  it('renders with password field', async () => {
    render(<ExportModal {...defaultProps} inputType="password" />);
    const modal = screen.getByRole('presentation');

    expect(
      modal.querySelector(`.${carbon.prefix}--text-input`)
    ).toHaveAttribute('type', 'password');
  });

  //@TODO: reinstate this test as soon as https://github.com/carbon-design-system/carbon/issues/10107 is fixed
  it('has no accessibility violations', async () => {
    render(<ExportModal {...defaultProps} />);
    const modalElement = document.querySelector(`.${pkg.prefix}--export-modal`);
    expect(modalElement).toBeAccessible(componentName);
    expect(modalElement).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    render(<ExportModal {...defaultProps} />);
    expect(screen.getByRole('presentation')).toHaveClass(
      defaultProps.className
    );
  });

  const dataTestId = 'dataTestId';

  it('adds additional properties to the containing node', async () => {
    render(<ExportModal {...defaultProps} data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<ExportModal {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<ExportModal {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
