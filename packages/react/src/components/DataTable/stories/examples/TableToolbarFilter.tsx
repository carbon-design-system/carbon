import cx from 'classnames';
import React, { ChangeEvent, useId, useState } from 'react';
import PropTypes from 'prop-types';

import { Filter } from '@carbon/icons-react';

import { usePrefix } from '../../../../internal/usePrefix';
import { Popover, PopoverContent } from '../../../Popover';
import Button from '../../../Button';
import Checkbox from '../../../Checkbox';
import { Layer } from '../../../Layer';

export type PopoverAlignment =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start';

interface TableToolbarFilterProps {
  /**
   * Specify how the popover should align with the trigger element
   */
  align?: PopoverAlignment;

  /**
   * Provide an optional class name for the toolbar filter
   */
  className?: string;

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?: (event: '' | ChangeEvent<HTMLInputElement>) => void;

  /**
   * Provide an function that is called when the apply button is clicked
   */
  onApplyFilter?: (selectedCheckboxes: Array<string>) => void;

  /**
   * Provide an function that is called when the reset button is clicked
   */
  onResetFilter?: () => void;
}

const TableToolbarFilter = ({
  align = 'bottom-end',
  onApplyFilter,
  onResetFilter,
  className,
  ...rest
}: TableToolbarFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const toolbarFilerId = useId();


  const prefix = usePrefix();

  const toolbarActionClasses = cx(
    className,
    `${prefix}--toolbar-action ${prefix}--overflow-menu`
  );

  const handleApplyFilter = () => {
    setIsOpen(false);
    if (onApplyFilter) {
      onApplyFilter(selectedCheckboxes);
    }
  };

  const handleResetFilter = () => {
    setIsOpen(false);
    setSelectedCheckboxes([])
    if (onResetFilter) {
      onResetFilter();
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkboxId = e.target.id;
    const isChecked = e.target.checked;

    const checkboxValue: HTMLSpanElement | null = document.querySelector(
      `label[for="${checkboxId}"]`
    );

    if (isChecked && checkboxValue) {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue.innerText]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== checkboxValue?.innerText));
    }
  }

  return (
    <Layer>
    <Popover<any>
      open={isOpen}
      isTabTip
      onRequestClose={() => setIsOpen(false)}
      align={align}
      {...rest}>
      <button
        aria-label="Filtering"
        type="button"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={toolbarActionClasses}>
        <Filter />
      </button>
      <PopoverContent id={toolbarFilerId}>
        <div className={`${prefix}--container-checkbox`}>
          <fieldset className={`${prefix}--fieldset`}>
            <legend className={`${prefix}--label`}>
              Filter options
            </legend>
            <Checkbox labelText="Marc" id="checkbox1" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('Marc')}/>
            <Checkbox labelText="300" id="checkbox2" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('300')}/>
            <Checkbox labelText="80" id="checkbox3" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('80')}/>
            <Checkbox labelText="Robin" id="checkbox4" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('Robin')}/>
          </fieldset>
        </div>
        <Button
          kind="secondary"
          title="Reset filters"
          onClick={handleResetFilter}>
          Reset filters
        </Button>
        <Button
          kind="primary"
          title="Reset filters"
          onClick={handleApplyFilter}>
          Apply filter
        </Button>
      </PopoverContent>
    </Popover>
    </Layer>
  );
};

TableToolbarFilter.propTypes = {
  /**
   * Specify how the popover should align with the trigger element
   */
  align: PropTypes.string,

  /**
   * Provide an optional class name for the search container
   */
  className: PropTypes.string,

  /**
   * Provide an function that is called when the apply button is clicked
   */
  onApplyFilter: PropTypes.func,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide an function that is called when the reset button is clicked
   */
  onResetFilter: PropTypes.func,
};

export default TableToolbarFilter;
