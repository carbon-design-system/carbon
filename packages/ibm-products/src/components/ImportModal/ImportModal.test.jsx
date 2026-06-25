//
// Copyright IBM Corp. 2021, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import {
  fireEvent,
  render,
  waitFor,
  screen,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { carbon } from '../../settings';
import { pkg } from '../../settings';
import { ImportModal } from '.';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    blob: () => Promise.resolve({ type: 'image/jpeg' }),
  })
);

const componentName = ImportModal.displayName;
const defaultProps = {
  accept: ['image/jpeg', 'image/png'],
  className: 'test-class',
  defaultErrorBody: 'default error body',
  defaultErrorHeader: 'default error header',
  description: 'test content',
  fetchErrorBody: 'fetch failed body',
  fetchErrorHeader: 'fetch failed header',
  fileDropHeader: 'file drop header',
  fileDropLabel: 'file drop label',
  fileUploadLabel: 'file upload label',
  inputButtonText: 'input button text',
  inputId: 'test-input-id',
  inputLabel: 'input label',
  inputPlaceholder: 'input placeholder',
  invalidFileTypeErrorBody: 'invalid file error body',
  invalidFileTypeErrorHeader: 'invalid file error header',
  invalidIconDescription: 'invalid icon',
  maxFileSize: 500000,
  maxFileSizeErrorBody: 'max file size error body',
  maxFileSizeErrorHeader: 'max file size error header',
  onClose: () => {},
  onRequestSubmit: () => {},
  open: true,
  primaryButtonText: 'primary button',
  secondaryButtonText: 'secondary button',
  title: 'test title',
};

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    fetch.mockClear();
  });

  it('renders body', async () => {
    render(<ImportModal {...defaultProps} />);
    screen.getByText(defaultProps.description);
  });

  it('renders title', async () => {
    render(<ImportModal {...defaultProps} />);
    screen.getByText(defaultProps.title);
  });

  it('renders fileDropHeader', async () => {
    render(<ImportModal {...defaultProps} />);
    screen.getByText(defaultProps.fileDropHeader);
  });

  it('renders fileDropLabel', async () => {
    render(<ImportModal {...defaultProps} />);
    screen.getByRole('button', { name: defaultProps.fileDropLabel });
  });

  it('renders inputButtonText', async () => {
    render(<ImportModal {...defaultProps} />);
    screen.getByText(defaultProps.inputButtonText);
  });

  it('renders inputLabel', async () => {
    render(<ImportModal {...defaultProps} />);
    screen.getByText(defaultProps.inputLabel);
  });

  it('renders the input with an id', async () => {
    const { container } = render(<ImportModal {...defaultProps} />);
    container.querySelector(defaultProps.inputId);
  });

  it('renders with successful fetch file upload and submit', async () => {
    const { change } = fireEvent;
    const { click } = userEvent;
    const { fn } = jest;
    const onRequestSubmit = fn();
    const props = {
      ...defaultProps,
      onRequestSubmit,
    };
    const { getByText, getByRole } = render(<ImportModal {...props} />);

    expect(
      getByText(props.inputButtonText).classList.contains(
        `${carbon.prefix}--btn--disabled`
      )
    ).toBe(true);
    await act(() => click(getByText(props.primaryButtonText)));
    expect(onRequestSubmit).not.toBeCalled();

    change(getByRole('textbox'), {
      target: { value: 'test.jpeg' },
    });
    expect(
      getByText(props.inputButtonText).classList.contains(
        `${carbon.prefix}--btn--disabled`
      )
    ).not.toBe(true);
    await act(() => click(getByText(props.inputButtonText)));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(
      screen.getByText(`1 / 1 ${defaultProps.fileUploadLabel}`)
    ).toBeVisible();
    await act(() => click(getByText(props.primaryButtonText)));
    expect(onRequestSubmit).toBeCalled();
  });

  it('should display the network error message when the fetch is rejected', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('fetch failed'));
    const { change } = fireEvent;
    const { click } = userEvent;
    const { getByText, getByRole } = render(<ImportModal {...defaultProps} />);

    change(getByRole('textbox'), {
      target: { value: 'test.jpeg' },
    });
    await act(() => click(getByText(defaultProps.inputButtonText)));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(getByText(defaultProps.fetchErrorBody)).toBeVisible();
    expect(getByText(defaultProps.fetchErrorHeader)).toBeVisible();
    expect(
      screen.getByText(`0 / 1 ${defaultProps.fileUploadLabel}`)
    ).toBeVisible();
  });

  it('should display the default error message when the fetch is rejected', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('fetch failed'));
    const { change } = fireEvent;
    const { click } = userEvent;
    const props = {
      ...defaultProps,
      fetchErrorBody: '',
      fetchErrorHeader: '',
    };
    const { getByText, getByRole } = render(<ImportModal {...props} />);

    change(getByRole('textbox'), {
      target: { value: 'test.jpeg' },
    });
    await act(() => click(getByText(defaultProps.inputButtonText)));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(getByText(props.defaultErrorBody)).toBeVisible();
    expect(getByText(props.defaultErrorHeader)).toBeVisible();
    expect(
      screen.getByText(`0 / 1 ${defaultProps.fileUploadLabel}`)
    ).toBeVisible();
  });

  it("should display the fetch error message when the fetch isn't a 200 response", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );
    const { change } = fireEvent;
    const { click } = userEvent;
    const { getByText, getByRole } = render(<ImportModal {...defaultProps} />);

    change(getByRole('textbox'), {
      target: { value: 'test.jpeg' },
    });
    await act(() => click(getByText(defaultProps.inputButtonText)));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(getByText(defaultProps.fetchErrorBody)).toBeVisible();
    expect(getByText(defaultProps.fetchErrorHeader)).toBeVisible();
    expect(
      screen.getByText(`0 / 1 ${defaultProps.fileUploadLabel}`)
    ).toBeVisible();
  });

  it('should display the invalid file type error message when an incorrect file type is uploaded', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        blob: () => Promise.resolve({ type: 'pdf' }),
      })
    );
    const { change } = fireEvent;
    const { click } = userEvent;
    const { getByText, getByRole } = render(<ImportModal {...defaultProps} />);

    change(getByRole('textbox'), {
      target: { value: 'test.pdf' },
    });
    await act(() => click(getByText(defaultProps.inputButtonText)));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(getByText(defaultProps.invalidFileTypeErrorBody)).toBeVisible();
    expect(getByText(defaultProps.invalidFileTypeErrorHeader)).toBeVisible();
    expect(
      screen.getByText(`0 / 1 ${defaultProps.fileUploadLabel}`)
    ).toBeVisible();
  });

  it('should display the default error message when an incorrect file type is uploaded', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        blob: () => Promise.resolve({ type: 'pdf' }),
      })
    );
    const { change } = fireEvent;
    const { click } = userEvent;
    const props = {
      ...defaultProps,
      invalidFileTypeErrorBody: '',
      invalidFileTypeErrorHeader: '',
    };
    const { getByText, getByRole } = render(<ImportModal {...props} />);

    change(getByRole('textbox'), {
      target: { value: 'test.pdf' },
    });
    await act(() => click(getByText(defaultProps.inputButtonText)));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(getByText(props.defaultErrorBody)).toBeVisible();
    expect(getByText(props.defaultErrorHeader)).toBeVisible();
    expect(
      screen.getByText(`0 / 1 ${defaultProps.fileUploadLabel}`)
    ).toBeVisible();
  });

  it('should successfully use the drag and drop component to upload a file and then remove the file', async () => {
    const { change } = fireEvent;
    const { click } = userEvent;
    const { getByText, getByRole } = render(<ImportModal {...defaultProps} />);
    const files = [new File(['foo'], 'foo.jpeg', { type: 'image/jpeg' })];

    const modal = getByRole('presentation');
    change(modal.querySelector(`.${carbon.prefix}--file-input`), {
      target: { files },
    });
    expect(getByText('foo.jpeg')).toBeVisible();
    expect(
      screen.getByText(`1 / 1 ${defaultProps.fileUploadLabel}`)
    ).toBeVisible();
    await act(() =>
      click(modal.querySelector(`.${carbon.prefix}--file-close`))
    );
    expect(modal.querySelector(`.${carbon.prefix}--file-filename`)).toBeNull();
  });

  it('should display max size error for file that is too big', async () => {
    const { change } = fireEvent;
    const { click } = userEvent;
    const props = {
      ...defaultProps,
      maxFileSize: 1,
    };
    const { getByText, getByRole } = render(<ImportModal {...props} />);

    change(getByRole('textbox'), {
      target: { value: 'test.pdf' },
    });
    await act(() => click(getByText(defaultProps.inputButtonText)));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(getByText(defaultProps.maxFileSizeErrorBody)).toBeVisible();
    expect(getByText(defaultProps.maxFileSizeErrorHeader)).toBeVisible();
    expect(
      screen.getByText(`0 / 1 ${defaultProps.fileUploadLabel}`)
    ).toBeVisible();
  });

  it('should display the default max size error for file that is too big', async () => {
    const { change } = fireEvent;
    const { click } = userEvent;
    const props = {
      ...defaultProps,
      maxFileSizeErrorBody: '',
      maxFileSizeErrorHeader: '',
      maxFileSize: 1,
    };
    const { getByText, getByRole } = render(<ImportModal {...props} />);

    change(getByRole('textbox'), {
      target: { value: 'test.pdf' },
    });
    await act(() => click(getByText(defaultProps.inputButtonText)));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(getByText(props.defaultErrorBody)).toBeVisible();
    expect(getByText(props.defaultErrorHeader)).toBeVisible();
    expect(
      screen.getByText(`0 / 1 ${defaultProps.fileUploadLabel}`)
    ).toBeVisible();
  });

  it.skip('has no accessibility violations', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        blob: () => Promise.resolve({ type: 'pdf' }),
        json: () => Promise.resolve({ type: 'pdf' }),
      })
    );
    render(<ImportModal {...defaultProps} />);
    const modalElement = screen.getByRole('presentation');
    await expect(modalElement).toBeAccessible(componentName);
    await expect(modalElement).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    render(<ImportModal {...defaultProps} />);
    expect(screen.getByRole('presentation')).toHaveClass(
      defaultProps.className
    );
  });

  const dataTestId = 'data-testid';

  it('adds additional properties to the containing node', async () => {
    render(<ImportModal {...defaultProps} data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<ImportModal {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<ImportModal {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
