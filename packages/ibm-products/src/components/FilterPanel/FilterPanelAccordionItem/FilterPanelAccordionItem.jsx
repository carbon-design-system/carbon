/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Children } from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { AccordionItem, ListItem } from '@carbon/react';

import { getDevtoolsProps } from '../../../global/js/utils/devtools';
import { pkg } from '../../../settings';
import { TruncatedList } from '../../TruncatedList';
import { FilterPanelLabel } from '../FilterPanelLabel';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--filter-panel-accordion-item`;
const componentName = 'FilterPanelAccordionItem';

const defaults = {
  accordionItemProps: {},
  truncatedListProps: {},
};

/**
 * A container with a label and optional count.
 * @deprecated This component is deprecated
 */
export let FilterPanelAccordionItem = React.forwardRef(
  (
    {
      accordionItemProps = defaults.accordionItemProps,
      truncatedListProps = defaults.truncatedListProps,
      children,
      className,
      count,
      labelText,
      title,
      ...rest
    },
    ref
  ) => {
    return (
      <AccordionItem
        {...accordionItemProps}
        className={cx(blockClass, className)}
        ref={ref}
        title={
          <FilterPanelLabel
            {...rest}
            count={count}
            labelText={labelText}
            title={title}
          />
        }
        {...getDevtoolsProps(componentName)}
      >
        <TruncatedList
          {...truncatedListProps}
          className={`${blockClass}__list`}
        >
          {Children.map(children, (child) => (
            <ListItem className={`${blockClass}__list-item`} key={child.key}>
              {child}
            </ListItem>
          ))}
        </TruncatedList>
      </AccordionItem>
    );
  }
);

FilterPanelAccordionItem.deprecated = {
  level: 'warn',
  details: `This component is deprecated`,
};
// Return a placeholder if not released and not enabled by feature flag
FilterPanelAccordionItem = pkg.checkComponentEnabled(
  FilterPanelAccordionItem,
  componentName
);

FilterPanelAccordionItem.displayName = componentName;

FilterPanelAccordionItem.propTypes = {
  /**
   * Props specific to the internal `AccordionItem` component.
   */
  accordionItemProps: PropTypes.shape({}),

  /**
   * Provide the contents of the FilterPanelAccordionItem.
   */
  children: PropTypes.node.isRequired,

  /**
   * Optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Number to be displayed with the label.
   */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The label for the component.
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Optional title attribute for the label.
   */
  title: PropTypes.string,

  /**
   * Props specific to the internal `TruncatedList` component.
   */
  truncatedListProps: PropTypes.shape({}),
};
