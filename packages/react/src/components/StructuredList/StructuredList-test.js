/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
} from '@carbon/react';
import { CheckmarkFilled } from '@carbon/react/icons';

const prefix = 'cds';
const dataTestId = 'structured-list-test-id';
const customHeadClass = 'structured-list-header-custom-class';
const customRowClass = 'structured-list-row-custom-class';
const customBodyClass = 'structured-list-body-custom-class';
const customInputClass = 'structured-list-input-custom-class';
const customCellClass = 'structured-list-cell-custom-class';
const inputNameValue = 'list-radio-input';
const onKeyDownHandlerFn = jest.fn();
const onKeyDownBodyHandlerFn = jest.fn();

const renderComponent = ({ ...rest } = {}) => {
  const { bodyProps, bodyCellProps, headProps, wrapperProps } = rest;
  return render(
    <StructuredListWrapper {...wrapperProps}>
      <StructuredListHead className={customHeadClass} {...headProps}>
        <StructuredListRow head className={customRowClass}>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody className={customBodyClass} {...bodyProps}>
        <StructuredListRow>
          <StructuredListCell noWrap {...bodyCellProps}>
            Row 1
          </StructuredListCell>
          <StructuredListCell>Row 1, Col 2</StructuredListCell>
          <StructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
            vulputate nisl a porttitor interdum.
          </StructuredListCell>
        </StructuredListRow>
        <StructuredListRow>
          <StructuredListCell noWrap>Row 2</StructuredListCell>
          <StructuredListCell>Row 2</StructuredListCell>
          <StructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
            vulputate nisl a porttitor interdum.
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

const structuredListBodyRowGenerator = (numRows, rest) => {
  return Array.apply(null, Array(numRows)).map((n, i) => (
    <StructuredListRow key={`row-${i}`} onKeyDown={onKeyDownHandlerFn}>
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>Row {i}, Col 2</StructuredListCell>
      <StructuredListCell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna,
        finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel
        euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.
      </StructuredListCell>
      <StructuredListInput
        {...rest}
        id={`row-${i}`}
        title={`row-${i}`}
        name={inputNameValue}
        className={customInputClass}
      />
      <StructuredListCell>
        <CheckmarkFilled
          className={`${prefix}--structured-list-svg`}
          aria-label="select an option">
          <title>select an option</title>
        </CheckmarkFilled>
      </StructuredListCell>
    </StructuredListRow>
  ));
};

const renderSelectionVariant = ({ ...rest } = {}) => {
  const { inputProps, wrapperProps } = rest;
  return render(
    <StructuredListWrapper selection {...wrapperProps}>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
          <StructuredListCell head>{''}</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody onKeyDown={onKeyDownBodyHandlerFn}>
        {structuredListBodyRowGenerator(4, inputProps)}
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

describe('StructuredList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('StructuredListWrapper', () => {
    it('should spread extra props onto outermost element', () => {
      renderComponent({ wrapperProps: { 'data-testid': dataTestId } });
      expect(screen.getByLabelText('Structured list section')).toHaveAttribute(
        'data-testid',
        dataTestId
      );
    });
    it('should have the expected classes', () => {
      renderComponent();
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--structured-list`
      );
    });
    it('should add extra classes that are passed via classname', () => {
      renderComponent({ wrapperProps: { className: 'extra-class' } });
      expect(screen.getByRole('table')).toHaveClass('extra-class');
    });
    it('should default selection prop as false', () => {
      renderComponent();
      expect(screen.getByRole('table')).not.toHaveClass(
        `${prefix}--structured-list--selection`
      );
    });
    it('should add the modifier class for selection when selection prop is true', () => {
      renderComponent({ wrapperProps: { selection: true } });
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--structured-list--selection`
      );
    });
    it('should add the modifier class for condensed when isCondensed prop is true', () => {
      renderComponent({ wrapperProps: { isCondensed: true } });
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--structured-list--condensed`
      );
    });
    it('should add the modifier class for flush when isFlush prop is true', () => {
      renderComponent({ wrapperProps: { isFlush: true } });
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--structured-list--flush`
      );
    });
    it('should allow a custom aria label to be passed in', () => {
      const testAriaLabel = 'custom-test-aria-label';
      renderComponent({ wrapperProps: { 'aria-label': testAriaLabel } });
      expect(screen.getByLabelText(testAriaLabel)).toBeInTheDocument();
    });
    it('should check that children are rendered', () => {
      renderComponent();
      expect(screen.getByText('ColumnA')).toBeVisible();
    });
  });

  describe('StructuredListHeader', () => {
    it('should have the expected classes', () => {
      renderComponent();
      const rowGroups = screen.getAllByRole('rowgroup');
      const headerRowGroup = [...rowGroups].filter((rowgroup) =>
        rowgroup.classList.contains(`${prefix}--structured-list-thead`)
      )[0];
      expect(headerRowGroup).toHaveClass(`${prefix}--structured-list-thead`);
    });
    it('should add extra classes that are passed via className', () => {
      renderComponent();
      const rowGroups = screen.getAllByRole('rowgroup');
      const headerRowGroup = [...rowGroups].filter((rowgroup) =>
        rowgroup.classList.contains(`${prefix}--structured-list-thead`)
      )[0];
      expect(headerRowGroup).toHaveClass(customHeadClass);
    });
    it('should check that children are rendered', () => {
      renderComponent();
      expect(screen.getByText('ColumnA')).toBeVisible();
    });
    it('should accept rest props', () => {
      const customHeadTitle = 'custom-header-title';
      renderComponent({ headProps: { title: customHeadTitle } });
      expect(screen.getByTitle(customHeadTitle)).toBeInTheDocument();
    });
  });

  describe('StructuredListRow', () => {
    it('should check that children are rendered', () => {
      renderComponent();
      expect(screen.getByText('ColumnA')).toBeVisible();
    });
    it('should add extra class that are passed via className', () => {
      renderComponent();
      const rows = screen.getAllByRole('row');
      const rowWithCustomClass = [...rows].filter((row) =>
        row.classList.contains(customRowClass)
      )[0];
      expect(rowWithCustomClass).toHaveClass(customRowClass);
    });
    it('should check that a row is specified as a header row', () => {
      renderComponent();
      const rows = screen.getAllByRole('row');
      const headerRow = [...rows].filter((row) =>
        row.classList.contains(`${prefix}--structured-list-row--header-row`)
      )[0];
      expect(headerRow).toHaveClass(
        `${prefix}--structured-list-row--header-row`
      );
    });
    it('should add an onKeyDown handler', () => {
      const { tab, keyboard } = userEvent;
      renderSelectionVariant();
      tab();
      keyboard('[ArrowDown]');
      expect(onKeyDownHandlerFn).toHaveBeenCalledTimes(1);
      keyboard('[ArrowDown]');
      expect(onKeyDownHandlerFn).toHaveBeenCalledTimes(2);
      keyboard('[ArrowDown]');
      expect(onKeyDownHandlerFn).toHaveBeenCalledTimes(3);
    });
  });

  describe('StructuredListBody', () => {
    it('should check that children are rendered', () => {
      renderComponent();
      expect(screen.getByText('Row 1')).toBeVisible();
    });
    it('should add extra classes that are passed via className', () => {
      renderComponent();
      const rowGroups = screen.getAllByRole('rowgroup');
      const listBody = [...rowGroups].filter((rowgroup) =>
        rowgroup.classList.contains(`${prefix}--structured-list-tbody`)
      )[0];
      expect(listBody).toHaveClass(customBodyClass);
    });
    it('should have the expected classes', () => {
      renderComponent();
      const rowGroups = screen.getAllByRole('rowgroup');
      const bodyRowGroup = [...rowGroups].filter((rowgroup) =>
        rowgroup.classList.contains(`${prefix}--structured-list-tbody`)
      )[0];
      expect(bodyRowGroup).toHaveClass(`${prefix}--structured-list-tbody`);
    });
    it('should add an onKeyDown handler', () => {
      const { tab, keyboard } = userEvent;
      renderSelectionVariant();
      tab();
      keyboard('[ArrowDown]');
      expect(onKeyDownBodyHandlerFn).toHaveBeenCalledTimes(1);
      keyboard('[ArrowDown]');
      expect(onKeyDownBodyHandlerFn).toHaveBeenCalledTimes(2);
      keyboard('[ArrowDown]');
      expect(onKeyDownBodyHandlerFn).toHaveBeenCalledTimes(3);
    });
    it('should accept rest props', () => {
      const dataTestId = 'data-testid';
      renderComponent({ bodyProps: { 'data-testid': dataTestId } });
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  describe('StructuredListInput', () => {
    it('should have the expected classes', () => {
      renderSelectionVariant();
      const inputElement = screen.getByTitle('row-0');
      expect(inputElement).toHaveClass(`${prefix}--structured-list-input`);
    });
    it('should render the input with custom title attribute and add additional classes via className', () => {
      renderSelectionVariant();
      const inputElement = screen.getByTitle('row-0');
      expect(inputElement).toHaveClass(customInputClass);
    });
    it('should accept an id', () => {
      renderSelectionVariant();
      const inputElement = screen.getByTitle('row-0');
      expect(inputElement).toHaveAttribute('id', 'row-0');
    });
    it('should add a custom name attribute to the input element', () => {
      renderSelectionVariant();
      const inputElement = screen.getByTitle('row-0');
      expect(inputElement).toHaveAttribute('name', 'list-radio-input');
    });
    it('should render unique id with multiple inputs when no id prop is given', () => {
      const { container } = renderSelectionVariant();
      const inputElements = container.querySelectorAll(
        `[name=${inputNameValue}]`
      );
      const inputIds = Array.from(inputElements).map((input) => {
        return input.id;
      });
      const containsDuplicates = (array) => {
        if (array.length !== new Set(array).size) {
          return true;
        }
        return false;
      };
      expect(containsDuplicates(inputIds)).toBeFalsy();
    });
    it('should accept rest props', () => {
      const testAriaLabel = 'test-aria-label';
      renderSelectionVariant({ inputProps: { 'aria-label': testAriaLabel } });
      const allInputs = screen.getAllByLabelText(testAriaLabel);
      allInputs.forEach((input) => {
        expect(input.getAttribute('aria-label')).toEqual(testAriaLabel);
      });
    });
  });

  describe('StructuredListCell', () => {
    it('should add extra classes that are passed via className', () => {
      renderComponent({ bodyCellProps: { className: customCellClass } });
      const bodyCells = screen.getAllByRole('cell');
      expect(bodyCells[0]).toHaveClass(customCellClass);
    });
    it('should have the expected classes', () => {
      renderComponent();
      const bodyCells = screen.getAllByRole('cell');
      expect(bodyCells[0]).toHaveClass(`${prefix}--structured-list-td`);
    });
    it('should use correct class when head prop is true', () => {
      renderComponent();
      const bodyCells = screen.getAllByRole('columnheader');
      expect(bodyCells[0]).toHaveClass(`${prefix}--structured-list-th`);
    });
    it('should use correct class when noWrap prop is true', () => {
      renderComponent();
      const bodyCells = screen.getAllByRole('cell');
      expect(bodyCells[0]).toHaveClass(
        `${prefix}--structured-list-content--nowrap`
      );
    });
    it('should accept rest props', () => {
      const dataTestId = 'data-testid';
      renderComponent({ bodyCellProps: { 'data-testid': dataTestId } });
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });
});
