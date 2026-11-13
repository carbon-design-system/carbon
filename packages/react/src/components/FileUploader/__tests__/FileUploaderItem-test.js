/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, fireEvent, screen } from '@testing-library/react';
import { getByLabel, getByText } from '@carbon/test-utils/dom';
import React from 'react';
import { FileUploaderItem } from '../';
import { FeatureFlags } from '../../FeatureFlags';
import { keys } from '../../../internal/keyboard';

const statuses = ['uploading', 'edit', 'complete'];

describe('FileUploaderItem', () => {
  describe('automated accessibility tests', () => {
    it.each(statuses)(
      'should have no axe violations with status %s',
      async (status) => {
        const { container } = render(
          <FileUploaderItem uuid="test" name="test" status={status} />
        );
        await expect(container).toHaveNoAxeViolations();
      }
    );
  });

  it('should support calling `onDelete` if the user interacts with the filename during editing', () => {
    const onDelete = jest.fn();
    const description = 'test-description';
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const edit = render(
      <FileUploaderItem
        uuid="edit"
        name="edit"
        iconDescription={description}
        status="edit"
        onDelete={onDelete}
      />
    );

    let removeFile = getByLabel(edit.container, 'test-description - edit');
    fireEvent.click(removeFile);
    expect(onDelete).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(removeFile, keys.Enter);
    expect(onDelete).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(removeFile, keys.Space);
    expect(onDelete).toHaveBeenCalledTimes(3);

    onDelete.mockReset();

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const uploading = render(
      <FileUploaderItem
        uuid="uploading"
        name="uploading"
        iconDescription={description}
        status="uploading"
        onDelete={onDelete}
      />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    removeFile = getByText(uploading.container, description);

    fireEvent.click(removeFile);
    expect(onDelete).not.toHaveBeenCalled();

    fireEvent.keyDown(removeFile, keys.Enter);
    expect(onDelete).not.toHaveBeenCalled();

    fireEvent.keyDown(removeFile, keys.Space);
    expect(onDelete).not.toHaveBeenCalled();
  });

  describe('overflow tooltip', () => {
    const name = 'A very long file name that will be truncated.pdf';
    let scrollWidthSpy;
    let offsetWidthSpy;

    const mockTruncation = (isTruncated) => {
      scrollWidthSpy = jest
        .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
        .mockReturnValue(isTruncated ? 300 : 100);
      offsetWidthSpy = jest
        .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
        .mockReturnValue(150);
    };

    afterEach(() => {
      scrollWidthSpy?.mockRestore();
      offsetWidthSpy?.mockRestore();
    });

    it('should render a tooltip with the file name when the name is truncated', () => {
      mockTruncation(true);
      const { container } = render(<FileUploaderItem name={name} />);

      expect(container.querySelector('.cds--popover-container')).toBeVisible();
      expect(screen.getByRole('tooltip', { hidden: true })).toHaveTextContent(
        name
      );
    });

    it('should not render a tooltip when the name is not truncated', () => {
      mockTruncation(false);
      const { container } = render(<FileUploaderItem name={name} />);

      expect(
        container.querySelector('.cds--popover-container')
      ).not.toBeInTheDocument();
      expect(screen.queryByRole('tooltip', { hidden: true })).toBeNull();
    });

    it('should align the tooltip to the bottom by default', () => {
      mockTruncation(true);
      const { container } = render(<FileUploaderItem name={name} />);

      expect(container.querySelector('.cds--popover-container')).toHaveClass(
        'cds--popover--bottom'
      );
    });

    it.each(['top', 'left', 'right-end', 'bottom-start'])(
      'should align the tooltip with `align="%s"`',
      (align) => {
        mockTruncation(true);
        const { container } = render(
          <FileUploaderItem name={name} align={align} />
        );
        const popover = container.querySelector('.cds--popover-container');

        expect(popover).toHaveClass(`cds--popover--${align}`);
        expect(popover).not.toHaveClass('cds--popover--bottom');
      }
    );

    it('should not render a tooltip for a non-truncated name when `align` is set', () => {
      mockTruncation(false);
      const { container } = render(
        <FileUploaderItem name={name} align="top" />
      );

      expect(
        container.querySelector('.cds--popover-container')
      ).not.toBeInTheDocument();
    });

    it('should keep the tooltip behavior when `align` changes', () => {
      mockTruncation(true);
      const { container, rerender } = render(
        <FileUploaderItem name={name} align="top" />
      );
      expect(container.querySelector('.cds--popover-container')).toHaveClass(
        'cds--popover--top'
      );

      rerender(<FileUploaderItem name={name} align="left" />);

      const popover = container.querySelector('.cds--popover-container');
      expect(popover).toHaveClass('cds--popover--left');
      expect(screen.getByRole('tooltip', { hidden: true })).toHaveTextContent(
        name
      );
    });

    it('should not forward `align` to the root element', () => {
      mockTruncation(true);
      const { container } = render(
        <FileUploaderItem name={name} align="top" />
      );

      expect(container.firstChild).not.toHaveAttribute('align');
    });

    it('should render the tooltip in the invalid state', () => {
      mockTruncation(true);
      const { container } = render(
        <FileUploaderItem
          name={name}
          invalid
          errorSubject="Too large"
          align="top"
        />
      );

      expect(
        container.querySelector('.cds--file-filename-container-wrap-invalid')
      ).toBeInTheDocument();
      expect(container.querySelector('.cds--popover-container')).toHaveClass(
        'cds--popover--top'
      );
    });

    describe('autoAlign', () => {
      it('should not enable auto-align by default', () => {
        mockTruncation(true);
        const { container } = render(<FileUploaderItem name={name} />);

        expect(
          container.querySelector('.cds--popover-container')
        ).not.toHaveClass('cds--popover--auto-align');
      });

      it('should enable auto-align on the tooltip with `autoAlign`', () => {
        mockTruncation(true);
        const { container } = render(
          <FileUploaderItem name={name} autoAlign />
        );

        expect(container.querySelector('.cds--popover-container')).toHaveClass(
          'cds--popover--auto-align'
        );
      });

      it('should keep `align` as the preferred placement with `autoAlign`', () => {
        mockTruncation(true);
        const { container } = render(
          <FileUploaderItem name={name} align="top" autoAlign />
        );
        const popover = container.querySelector('.cds--popover-container');

        expect(popover).toHaveClass('cds--popover--auto-align');
        expect(popover).toHaveClass('cds--popover--top');
      });

      it('should default to the `enable-v12-autoalign` feature flag', () => {
        mockTruncation(true);
        const { container } = render(
          <FeatureFlags enableV12Autoalign>
            <FileUploaderItem name={name} />
          </FeatureFlags>
        );

        expect(container.querySelector('.cds--popover-container')).toHaveClass(
          'cds--popover--auto-align'
        );
      });

      it('should let `autoAlign={false}` override the feature flag', () => {
        mockTruncation(true);
        const { container } = render(
          <FeatureFlags enableV12Autoalign>
            <FileUploaderItem name={name} autoAlign={false} />
          </FeatureFlags>
        );

        expect(
          container.querySelector('.cds--popover-container')
        ).not.toHaveClass('cds--popover--auto-align');
      });

      it('should not render a tooltip for a non-truncated name with `autoAlign`', () => {
        mockTruncation(false);
        const { container } = render(
          <FileUploaderItem name={name} autoAlign />
        );

        expect(
          container.querySelector('.cds--popover-container')
        ).not.toBeInTheDocument();
      });

      it('should not forward `autoAlign` to the root element', () => {
        mockTruncation(true);
        const { container } = render(
          <FileUploaderItem name={name} autoAlign />
        );

        expect(container.firstChild).not.toHaveAttribute('autoalign');
        expect(container.firstChild).not.toHaveAttribute('autoAlign');
      });
    });
  });
});
