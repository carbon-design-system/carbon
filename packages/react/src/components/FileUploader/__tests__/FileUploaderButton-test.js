/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { FileUploaderButton } from '../';
import userEvent from '@testing-library/user-event';

describe('FileUploaderButton', () => {
  describe('automated accessibility tests', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<FileUploaderButton name="test" />);
      await expect(container).toHaveNoAxeViolations();
    });
  });

  it('should support a custom class name on the root element', () => {
    const { container } = render(<FileUploaderButton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should call `onClick` if the label is clicked', () => {
    const onClick = jest.fn();
    render(<FileUploaderButton labelText="test" onClick={onClick} />);
    const label = screen.getByRole('button', { name: 'test' });
    fireEvent.click(label);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call `onChange` if the value of the input changes', async () => {
    const onChange = jest.fn();
    render(<FileUploaderButton onChange={onChange} accept={['.png']} />);

    const input = screen.getByLabelText('Add file');
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    await userEvent.upload(input, file);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should not trigger multiple file dialogs when using keyboard Enter', async () => {
    const onChange = jest.fn();

    render(<FileUploaderButton onChange={onChange} labelText="Add file" />);

    const button = screen.getByRole('button', { name: /add file/i });
    const input = screen.getByLabelText(/add file/i);

    // Simulate keyboard interaction
    button.focus();
    await userEvent.keyboard('{Enter}');

    // Simulate file upload (since real dialog can't be tested)
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    await userEvent.upload(input, file);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should not support multiple files by default', () => {
    render(<FileUploaderButton />);
    const input = screen.getByLabelText('Add file');
    expect(input.getAttribute('multiple')).toBeFalsy();
  });

  it('should have a unique id', () => {
    render(
      <>
        <FileUploaderButton />
        <FileUploaderButton />
      </>
    );
    const inputs = screen.getAllByLabelText('Add file');
    expect(inputs).toHaveLength(2);
    expect(inputs[0].getAttribute('id')).not.toBe(inputs[1].getAttribute('id'));
  });

  it('should reset the input value when the label is clicked', async () => {
    render(<FileUploaderButton accept={['.png']} labelText="test" />);

    const input = screen.getByLabelText('test');
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    await userEvent.upload(input, file);

    expect(input.files.length).toBe(1);

    // Use the button text that's actually rendered
    await userEvent.click(screen.getByRole('button'));

    expect(input.files.length).toBe(0);
  });

  it('should update the label text if it receives a new value from props', () => {
    const { rerender } = render(<FileUploaderButton labelText="test" />);
    expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();

    rerender(<FileUploaderButton labelText="tester" />);
    expect(screen.getByRole('button', { name: 'tester' })).toBeInTheDocument();
  });

  it('should warn without throwing for interactive content in labelText', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    expect(() => {
      render(
        <FileUploaderButton
          labelText={
            <>
              FileUploaderButton label
              <a href="/">Help</a>
            </>
          }
        />
      );
    }).not.toThrow();

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Warning: The FileUploaderButton component `labelText` prop must have no interactive content'
      )
    );

    spy.mockRestore();
  });

  it('should allow non-interactive content in labelText', () => {
    expect(() => {
      render(
        <FileUploaderButton
          labelText={
            <>
              FileUploaderButton label
              <span>additional label content</span>
            </>
          }
        />
      );
    }).not.toThrow();
  });

  describe('FileUploaderButton label', () => {
    it('should update the label when a file is selected', async () => {
      render(<FileUploaderButton accept={['.png']} labelText="test" />);

      const input = screen.getByLabelText('test');

      expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();

      const filename = 'test.png';
      const file = new File(['test'], filename, { type: 'image/png' });

      await userEvent.upload(input, file);

      expect(
        screen.getByRole('button', { name: filename })
      ).toBeInTheDocument();
    });

    it('should update the label when multiple files are selected', async () => {
      render(
        <FileUploaderButton accept={['.png']} labelText="test" multiple />
      );

      const input = screen.getByLabelText('test');

      expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();

      const files = [
        new File(['test-1'], 'test-1.png', { type: 'image/png' }),
        new File(['test-2'], 'test-1.png', { type: 'image/png' }),
        new File(['test-3'], 'test-1.png', { type: 'image/png' }),
      ];

      await userEvent.upload(input, files);

      expect(
        screen.getByRole('button', { name: `${files.length} files` })
      ).toBeInTheDocument();
    });

    it('should not update the label when files are selected but `disableLabelChanges` is false', async () => {
      render(
        <FileUploaderButton
          accept={['.png']}
          labelText="test"
          disableLabelChanges
        />
      );

      const input = screen.getByLabelText('test');

      expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();

      const filename = 'test.png';
      const file = new File(['test'], filename, { type: 'image/png' });

      await userEvent.upload(input, file);

      expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();
    });
  });
});
