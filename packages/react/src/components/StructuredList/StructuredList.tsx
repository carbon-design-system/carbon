/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useState,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useId } from '../../internal/useId';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';
import { RadioButtonChecked, RadioButton } from '@carbon/icons-react';
import { useOutsideClick } from '../../internal/useOutsideClick';

type DivAttrs = HTMLAttributes<HTMLDivElement>;

type GridSelectedRowState = null | string;
type GridSelectedRowSetter = null | ((value: GridSelectedRowState) => void);
const GridSelectedRowStateContext =
  React.createContext<GridSelectedRowState>(null);
const GridSelectedRowDispatchContext =
  React.createContext<GridSelectedRowSetter>(null);

export interface StructuredListWrapperProps extends DivAttrs {
  /**
   * Specify a label to be read by screen readers on the container node
   */
  'aria-label'?: string;

  /**
   * Provide the contents of your StructuredListWrapper
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify if structured list is condensed, default is false
   */
  isCondensed?: boolean;

  /**
   * Specify if structured list is flush, default is false
   */
  isFlush?: boolean;

  /**
   * Specify whether your StructuredListWrapper should have selections
   */
  selection?: boolean;
}
export function StructuredListWrapper(props: StructuredListWrapperProps) {
  const {
    children,
    selection,
    className,
    ['aria-label']: ariaLabel = 'Structured list section',
    // @ts-expect-error: Deprecated prop
    ariaLabel: deprecatedAriaLabel,
    isCondensed,
    isFlush,
    ...other
  } = props;

  const prefix = usePrefix();
  const classes = classNames(
    `${prefix}--structured-list`,
    {
      [`${prefix}--structured-list--selection`]: selection,
      [`${prefix}--structured-list--condensed`]: isCondensed,
      [`${prefix}--structured-list--flush`]: isFlush && !selection,
    },
    className
  );
  const [selectedRow, setSelectedRow] =
    React.useState<GridSelectedRowState>(null);

  return (
    <GridSelectedRowStateContext.Provider value={selectedRow}>
      <GridSelectedRowDispatchContext.Provider value={setSelectedRow}>
        <div
          role="table"
          className={classes}
          {...other}
          aria-label={deprecatedAriaLabel || ariaLabel}>
          {children}
        </div>
      </GridSelectedRowDispatchContext.Provider>
    </GridSelectedRowStateContext.Provider>
  );
}
StructuredListWrapper.propTypes = {
  /**
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

  /**
   * Provide the contents of your StructuredListWrapper
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify if structured list is condensed, default is false
   */
  isCondensed: PropTypes.bool,

  /**
   * Specify if structured list is flush, not valid for selection variant, default is false
   */
  isFlush: PropTypes.bool,

  /**
   * Specify whether your StructuredListWrapper should have selections
   */
  selection: PropTypes.bool,
};

export interface StructuredListHeadProps extends DivAttrs {
  /**
   * Provide the contents of your StructuredListHead
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the node
   */
  className?: string;
}
export function StructuredListHead(props) {
  const { children, className, ...other } = props;
  const prefix = usePrefix();
  const classes = classNames(`${prefix}--structured-list-thead`, className);
  return (
    <div role="rowgroup" className={classes} {...other}>
      {children}
    </div>
  );
}
StructuredListHead.propTypes = {
  /**
   * Provide the contents of your StructuredListHead
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node
   */
  className: PropTypes.string,
};

export interface StructuredListBodyProps extends DivAttrs {
  /**
   * Provide the contents of your StructuredListBody
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  head?: boolean;

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown?(event: KeyboardEvent): void;
}
export function StructuredListBody(props: StructuredListBodyProps) {
  const { children, className, ...other } = props;
  const prefix = usePrefix();
  const classes = classNames(`${prefix}--structured-list-tbody`, className);

  return (
    <div className={classes} role="rowgroup" {...other}>
      {children}
    </div>
  );
}
StructuredListBody.propTypes = {
  /**
   * Provide the contents of your StructuredListBody
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  head: PropTypes.bool,

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown: PropTypes.func,
};

const GridRowContext = React.createContext<null | { id: string }>(null);

export interface StructuredListRowProps extends DivAttrs {
  /**
   * Provide the contents of your StructuredListRow
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether your StructuredListRow should be used as a header row
   */
  head?: boolean;

  /**
   * Provide a handler that is invoked on the click
   */
  onClick?(event: MouseEvent): void;

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown?(event: KeyboardEvent): void;

  /**
   * Mark if this row should be selectable
   */
  selection?: boolean;
}
export function StructuredListRow(props: StructuredListRowProps) {
  const { onKeyDown, children, className, head, onClick, selection, ...other } =
    props;
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const id = useId('grid-input');
  const selectedRow = React.useContext(GridSelectedRowStateContext);
  const setSelectedRow = React.useContext(GridSelectedRowDispatchContext);
  const prefix = usePrefix();
  const value = { id };
  const classes = classNames(
    `${prefix}--structured-list-row`,
    {
      [`${prefix}--structured-list-row--header-row`]: head,
      [`${prefix}--structured-list-row--focused-within`]:
        (hasFocusWithin && !selection) ||
        (hasFocusWithin &&
          selection &&
          (selectedRow === id || selectedRow === null)),
      // Ensure focus on the first item when navigating through Tab keys and no row is selected (selectedRow === null)
      [`${prefix}--structured-list-row--selected`]: selectedRow === id,
    },
    className
  );
  const itemRef = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    setHasFocusWithin(false);
  };
  useOutsideClick(itemRef, handleClick);
  return head ? (
    <div role="row" {...other} className={classes}>
      {selection && <StructuredListCell head></StructuredListCell>}
      {children}
    </div>
  ) : (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      {...other}
      role="row"
      className={classes}
      ref={itemRef}
      onClick={(event) => {
        setSelectedRow?.(id);
        onClick && onClick(event);
        if (selection) {
          // focus items only when selection is enabled
          setHasFocusWithin(true);
        }
      }}
      onFocus={() => {
        setHasFocusWithin(true);
      }}
      onBlur={() => {
        setHasFocusWithin(false);
      }}
      onKeyDown={onKeyDown}>
      <GridRowContext.Provider value={value}>
        {selection && (
          <StructuredListCell>
            {selectedRow === id ? <RadioButtonChecked /> : <RadioButton />}
          </StructuredListCell>
        )}

        {children}
      </GridRowContext.Provider>
    </div>
  );
}
StructuredListRow.propTypes = {
  /**
   * Provide the contents of your StructuredListRow
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether your StructuredListRow should be used as a header row
   */
  head: PropTypes.bool,

  /**
   * Specify whether a `<label>` should be used
   */
  label: deprecate(
    PropTypes.bool,
    `\nThe \`label\` prop is no longer needed and will be removed in the next major version of Carbon.`
  ),

  /**
   * Provide a handler that is invoked on the click
   */
  onClick: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the control,
   */
  onKeyDown: PropTypes.func,

  /**
   * Mark if this row should be selectable
   */
  selection: PropTypes.bool,
};

export interface StructuredListInputProps extends DivAttrs {
  /**
   * Specify an optional className to be applied to the input
   */
  className?: string;

  /**
   * Specify a custom `id` for the input
   */
  id?: string;

  /**
   * Provide a `name` for the input
   */
  name?: string;

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?(event: ChangeEvent<HTMLInputElement>): void;

  /**
   * Provide a `title` for the input
   */
  title?: string;
}
export function StructuredListInput(props: StructuredListInputProps) {
  const defaultId = useId('structureListInput');
  const {
    className,
    name = `structured-list-input-${defaultId}`,
    title,
    id,
    onChange,
    ...other
  } = props;
  const prefix = usePrefix();
  const classes = classNames(
    `${prefix}--structured-list-input`,
    `${prefix}--visually-hidden`,
    className
  );
  const row = React.useContext(GridRowContext);
  const selectedRow = React.useContext(GridSelectedRowStateContext);
  const setSelectedRow = React.useContext(GridSelectedRowDispatchContext);

  return (
    <input
      {...other}
      type="radio"
      tabIndex={0}
      checked={!!row && row.id === selectedRow}
      value={row?.id ?? ''}
      onChange={(event) => {
        setSelectedRow?.(event.target.value);
        onChange && onChange(event);
      }}
      id={id ?? defaultId}
      className={classes}
      name={name}
      title={title}
    />
  );
}
StructuredListInput.propTypes = {
  /**
   * Specify an optional className to be applied to the input
   */
  className: PropTypes.string,

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked: deprecate(
    PropTypes.bool,
    `\nThe prop \`defaultChecked\` is no longer needed and will be removed in the next major version of Carbon.`
  ),

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string,

  /**
   * Provide a `name` for the input
   */
  name: PropTypes.string,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide a `title` for the input
   */
  title: PropTypes.string,

  /**
   * Specify the value of the input
   */
  value: deprecate(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    `\nThe prop \`value\` will be removed in the next major version of Carbon.`
  ),
};

export interface StructuredListCellProps extends DivAttrs {
  /**
   * Provide the contents of your StructuredListCell
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether your StructuredListCell should be used as a header cell
   */
  head?: boolean;

  /**
   * Specify whether your StructuredListCell should have text wrapping
   */
  noWrap?: boolean;
}
export function StructuredListCell(props: StructuredListCellProps) {
  const { children, className, head, noWrap, ...other } = props;
  const prefix = usePrefix();
  const classes = classNames(
    {
      [`${prefix}--structured-list-th`]: head,
      [`${prefix}--structured-list-td`]: !head,
      [`${prefix}--structured-list-content--nowrap`]: noWrap,
    },
    className
  );

  if (head) {
    return (
      <Text className={classes} role="columnheader" {...other}>
        {children}
      </Text>
    );
  }

  return (
    <Text as="div" className={classes} role="cell" {...other}>
      {children}
    </Text>
  );
}
StructuredListCell.propTypes = {
  /**
   * Provide the contents of your StructuredListCell
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether your StructuredListCell should be used as a header cell
   */
  head: PropTypes.bool,

  /**
   * Specify whether your StructuredListCell should have text wrapping
   */
  noWrap: PropTypes.bool,
};
