//
// Copyright IBM Corp. 2021, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { carbon } from '../../settings';

import { APIKeyModal } from '.';
import { Button } from '@carbon/react';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

const componentName = APIKeyModal.displayName;
const defaultProps = {
  apiKey: '',
  apiKeyLabel: 'api key label',
  apiKeyName: '',
  body: 'modal body',
  className: 'class-test',
  closeButtonText: 'close',
  copyButtonText: 'copy',
  copyIconDescription: 'copy icon description',
  customSteps: [],
  helperText: 'download body',
  downloadFileName: 'filename',
  downloadFileType: 'json',
  downloadLinkText: 'download',
  downloadLinkLabel: 'Download API Key in Java Script File format',
  editButtonText: 'edit button',
  editSuccess: false,
  editSuccessMessage: 'edited successfully',
  editing: false,
  error: false,
  errorText: 'an error occurred',
  generateButtonText: 'create button',
  generateSuccessBody: 'created successfully body',
  generateSuccessMessage: 'created successfully title',
  generateTitle: 'create title',
  hasAPIKeyVisibilityToggle: true,
  hasDownloadLink: true,
  hideAPIKeyLabel: 'hide key',
  loading: false,
  loadingText: 'loading',
  modalLabel: 'modal label',
  nameHelperText: 'name helper',
  nameLabel: 'name label',
  namePlaceholder: 'name placeholder',
  nameRequired: true,
  nextStepButtonText: 'next step',
  onClose: () => {},
  onRequestGenerate: () => {},
  open: true,
  previousStepButtonText: 'previous step',
  showAPIKeyLabel: 'show key',
};

URL.createObjectURL = jest.fn(() => Promise.resolve('download-link'));

describe(componentName, () => {
  it('renders with standard visible props', async () => {
    const { getByText, getByPlaceholderText } = render(
      <APIKeyModal {...defaultProps} />
    );
    getByText(defaultProps.body);
    getByText(defaultProps.closeButtonText);
    getByText(defaultProps.generateButtonText);
    getByText(defaultProps.generateTitle);
    getByText(defaultProps.modalLabel);
    getByText(defaultProps.nameLabel);
    getByPlaceholderText(defaultProps.namePlaceholder);
    getByText(defaultProps.nameHelperText);
  });

  it('renders with minimal setup', async () => {
    const props = {
      ...defaultProps,
      nameRequired: false,
      hasDownloadLink: false,
      apiKey: '123-456-789',
    };
    const { click } = userEvent;
    const { getByText, getByRole, getByLabelText } = render(
      <APIKeyModal {...props} />
    );

    const modal = getByRole('presentation');

    expect(modal.querySelector(`.${carbon.prefix}--text-input`).value).toBe(
      props.apiKey
    );
    getByText(props.apiKeyLabel);
    await act(() => click(getByText(props.copyButtonText)));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.apiKey);
    getByLabelText(defaultProps.copyIconDescription);
  });

  it('renders with standard setup', async () => {
    const { change } = fireEvent;
    const { click } = userEvent;
    const { fn } = jest;
    const onRequestGenerate = fn();
    const props = {
      ...defaultProps,
      onRequestGenerate,
    };

    const { getByText, getByRole, rerender } = render(
      <APIKeyModal {...props} />
    );

    const nameInput = getByRole('textbox');
    const createButton = getByText(props.generateButtonText);

    change(nameInput, { target: { value: 'test-key' } });
    await act(() => click(createButton));
    expect(onRequestGenerate).toHaveBeenCalledWith('test-key');

    rerender(<APIKeyModal {...props} loading />);
    getByText(props.loadingText, { selector: 'div' });
    rerender(<APIKeyModal {...props} apiKey="444-444-444-444" />);
    await waitFor(() => getByText(props.downloadLinkLabel));
    getByText(props.helperText);
    const modal = getByRole('presentation');
    expect(modal.querySelector(`.${carbon.prefix}--text-input`).value).toBe(
      '444-444-444-444'
    );
    await act(() => click(getByText(props.copyButtonText)));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      '444-444-444-444'
    );
  });

  it('displays an error message when a create error occurs', async () => {
    const { change } = fireEvent;
    const { click } = userEvent;
    const { fn } = jest;
    const onRequestGenerate = fn();
    const props = {
      ...defaultProps,
      onRequestGenerate,
      errorText: 'an error occurred',
    };

    const { getByText, getByRole, rerender } = render(
      <APIKeyModal {...props} />
    );

    const nameInput = getByRole('textbox');
    const createButton = getByText(props.generateButtonText);

    change(nameInput, { target: { value: 'test-key' } });
    await act(() => click(createButton));
    expect(onRequestGenerate).toHaveBeenCalled();

    rerender(<APIKeyModal {...props} error />);
    getByText(props.errorText);
  });

  it('should be able to properly navigate a series of custom steps', async () => {
    const { click } = userEvent;
    const { fn } = jest;
    const onRequestGenerate = fn();
    const onClose = fn();
    const customSteps = [
      {
        valid: true,
        content: <input type="text" value="a" placeholder="input a" readOnly />,
        title: 'step 1',
      },
      {
        valid: true,
        content: <input type="text" value="b" placeholder="input b" readOnly />,
        title: 'step 2',
      },
      {
        valid: false,
        content: <input type="text" value="c" placeholder="input c" readOnly />,
        title: 'step 3',
      },
    ];
    const props = {
      ...defaultProps,
      onRequestGenerate,
      onClose,
      customSteps,
      hasDownloadLink: false,
    };
    const { rerender, getByPlaceholderText, getByText, getAllByText } = render(
      <APIKeyModal {...props} />
    );

    // step 1
    getByPlaceholderText('input a');
    getByText(props.nextStepButtonText);
    getByText(props.closeButtonText);
    getByText(props.customSteps[0].title);

    // advance to step 2
    await act(() => click(getByText(props.nextStepButtonText)));
    getByPlaceholderText('input b');
    getByText(props.nextStepButtonText);
    getByText(props.previousStepButtonText);
    getByText(props.customSteps[1].title);

    // go back to step 1
    await act(() => click(getByText(props.previousStepButtonText)));
    getByPlaceholderText('input a');
    getByText(props.nextStepButtonText);
    getByText(props.closeButtonText);
    getByText(props.customSteps[0].title);

    // advance to step 2
    await act(() => click(getByText(props.nextStepButtonText)));
    getByPlaceholderText('input b');
    getByText(props.nextStepButtonText);
    getByText(props.previousStepButtonText);
    getByText(props.customSteps[1].title);

    // advance to step 3
    await act(() => click(getByText(props.nextStepButtonText)));
    getByPlaceholderText('input c');
    getByText(props.generateButtonText);
    getByText(props.previousStepButtonText);
    getByText(props.customSteps[2].title);

    // submit invalid form
    await act(() => click(getByText(props.generateButtonText)));
    expect(onRequestGenerate).not.toHaveBeenCalled();

    // submit valid form
    customSteps[2].valid = true;
    rerender(<APIKeyModal {...props} customSteps={customSteps} />);
    await act(() => click(getByText(props.generateButtonText)));
    expect(onRequestGenerate).toHaveBeenCalled();
    rerender(<APIKeyModal {...props} />);
    rerender(<APIKeyModal {...props} apiKey="abc-123" />);
    expect(screen.getByLabelText(props.apiKeyLabel).value).toBe('abc-123');
    getByText(props.generateSuccessBody);
    getAllByText(props.generateSuccessMessage);
    await act(() => click(getByText(props.closeButtonText)));
    expect(onClose).toHaveBeenCalled();
  });

  it('should return focus to the generate button', async () => {
    const onOpen = jest.fn(() => false);
    const onClose = jest.fn(() => true);

    // eslint-disable-next-line react/prop-types
    const DummyComponent = ({ open }) => {
      const buttonRef = React.useRef(undefined);

      return (
        <>
          <APIKeyModal
            {...defaultProps}
            launcherButtonRef={buttonRef}
            onClose={onClose}
            open={open}
          />
          <Button ref={buttonRef} onClick={onOpen}>
            Generate
          </Button>
        </>
      );
    };

    const { getByText, rerender } = render(<DummyComponent open={false} />);

    const launchButtonEl = getByText('Generate');
    expect(launchButtonEl).toBeInTheDocument();

    await act(() => userEvent.click(launchButtonEl));
    expect(onOpen).toHaveBeenCalled();

    rerender(<DummyComponent open={true} />);

    const closeButton = getByText(defaultProps.closeButtonText);
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(closeButton).toBeInTheDocument();

    await act(() => userEvent.click(closeButton));
    expect(onClose).toHaveBeenCalled();

    rerender(<DummyComponent open={false} />);

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(launchButtonEl).toHaveFocus();
  });

  it('successfully edits', async () => {
    const { change } = fireEvent;
    const { click } = userEvent;
    const { fn } = jest;
    const onRequestEdit = fn();
    const props = {
      ...defaultProps,
      editing: true,
      apiKeyName: 'test-key-1',
      onRequestEdit,
    };

    const { getByText, getAllByText, getByRole, rerender } = render(
      <APIKeyModal {...props} />
    );

    const nameInput = getByRole('textbox');
    const editButton = getByText(props.editButtonText);
    expect(nameInput.value).toBe(props.apiKeyName);
    getByText(props.editButtonText);
    change(nameInput, { target: { value: 'new-key-name' } });
    await act(() => click(editButton));
    expect(onRequestEdit).toHaveBeenCalledWith(nameInput.value);
    rerender(<APIKeyModal {...props} editSuccess />);
    getAllByText(props.editSuccessMessage);
  });

  it('toggles key visibility', async () => {
    const props = {
      ...defaultProps,
      apiKey: '555-555-555-555',
    };
    const { mouseOver } = fireEvent;
    const { click } = userEvent;
    const { getByText, getByRole, rerender } = render(
      <APIKeyModal {...props} />
    );
    const modal = getByRole('presentation');

    await waitFor(() => getByText(props.downloadLinkLabel));
    expect(screen.getByLabelText(props.apiKeyLabel).value).toBe(props.apiKey);
    expect(screen.getByLabelText(props.apiKeyLabel)).toHaveAttribute(
      'type',
      'password'
    );
    mouseOver(modal.querySelector(`.${carbon.prefix}--icon-visibility-on`));
    await waitFor(() => getByText(defaultProps.showAPIKeyLabel));
    await act(() =>
      click(modal.querySelector(`.${carbon.prefix}--icon-visibility-on`))
    );
    mouseOver(modal.querySelector(`.${carbon.prefix}--icon-visibility-off`));
    await waitFor(() => getByText(defaultProps.hideAPIKeyLabel));
    rerender(<APIKeyModal {...props} hasAPIKeyVisibilityToggle={false} />);
    await waitFor(() => getByText(props.downloadLinkLabel));
    expect(getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('has no accessibility violations', async () => {
    render(<APIKeyModal {...defaultProps} />);

    const modal = screen.getByRole('presentation');
    expect(modal).toBeAccessible(componentName);
    expect(modal).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    render(<APIKeyModal {...defaultProps} />);

    const modal = screen.getByRole('presentation');
    expect(modal).toHaveClass(defaultProps.className);
  });

  const dataTestId = 'data-testid';

  it('adds additional properties to the containing node', async () => {
    render(<APIKeyModal {...defaultProps} data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<APIKeyModal {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<APIKeyModal {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
