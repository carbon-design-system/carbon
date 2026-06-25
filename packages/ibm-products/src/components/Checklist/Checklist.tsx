/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * TODO: Breakdown titles, icons, clickable items into sub-components
 * See
 *   ModifiedTabs (ModifiedTabLabelNew, ModifiedTabLabelWithClose)
 *   PageHeader (PageHeaderTitle, PageHeaderUtils)
 */

// Carbon and package components we use.
import { Button, Heading, IconButton, Section } from '@carbon/react';
import { Kind, Kinds, Theme, Themes } from './Checklist.types';
// Import portions of React that are needed.
import React, {
  ForwardedRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ChecklistChart } from './ChecklistChart';
import { ChecklistIcon } from './ChecklistIcon';
import { ChevronUp } from '@carbon/react/icons';
// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--checklist`;
const componentName = 'Checklist';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Default values can be included here and then assigned to the prop params,
// e.g. prop = defaults.prop,
// This gathers default values together neatly and ensures non-primitive
// values are initialized early to avoid react making unnecessary re-renders.
// Note that default values are not required for props that are 'required',
// nor for props where the component can apply undefined values reasonably.
// Default values should be provided when the component needs to make a choice
// or assumption when a prop is not supplied.

type Task = {
  kind: Kind;
  label: string;
  onClick?(task?: Task): void;
};

type TaskList = {
  title?: string;
  tasks: Array<Task>;
};

export interface ChecklistProps {
  /**
   * Define both `chartLabel` and `chartValue` to show the chart and its label together.
   */
  chartLabel?: ReactNode;
  /**
   * A number between 0 and 1.
   *
   * Define both `chartLabel` and `chartValue` to show the chart and its label together.
   */
  chartValue?: number;
  /**
   * Aria-label for the Checklist component.
   */
  checklistAriaLabel?: string;
  /**
   * Aria-label for the Checklist's toggle component.
   */
  checklistToggleAriaLabel?: string;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * Whether or not to show the open/close toggle.
   */
  enableToggle?: boolean;
  /**
   * Callback for the "View all" button. See also `viewAllLabel`.
   */
  onClickViewAll?(): void;
  /**
   * Optional callback for when the list is opened/closed.
   */
  onToggle?(isOpen?: boolean): void;
  /**
   * Specifies whether the component is opened or closed.
   * This can be set during initialization, or changed after being rendered.
   */
  open?: boolean;
  /**
   * The task list can be broken down into sub-lists.
   *
   * Each sub-list can include an optional `title`.
   *
   * Each task must specify the appropriate icon (`kind`) and `label`.
   *
   * If any task has an `onClick` callback function defined,
   * then the `label` will be rendered as a button,
   * else the `label` will be rendered as plain text.
   */
  taskLists: Array<TaskList>;
  /**
   * Determines the theme of the component.
   */
  theme?: Theme;
  /**
   * The title of the component.
   */
  title?: ReactNode;
  /**
   * The label for the toggle's tooltip.
   */
  toggleLabel?: string;
  /**
   * The alignment of the toggle's tooltip.
   */
  toggleLabelAlign?: React.ComponentProps<typeof IconButton>['align'];
  /**
   * If defined, will show and enable the "View all (#)" button at the bottom of the list.
   */
  viewAllLabel?: string;
}

// Default values for props
const defaults = {
  checklistAriaLabel: 'Checklist',
  checklistToggleAriaLabel: 'Checklist toggle',
  onClickViewAll: () => {},
  onToggle: () => {},
  open: true,
  enableToggle: true,
  taskLists: [],
  theme: Themes.light,
  toggleLabel: 'Toggle',
};

/**
 * The Checklist tracks a user's progress much like Your Learning or
 * WalkMe. Each item in the list can be clickable, and each item has
 * an icon that defines the item's state as "not started", "in progress",
 * and "complete".
 */
export const Checklist = React.forwardRef(
  (
    {
      chartValue,
      chartLabel,
      checklistAriaLabel = defaults.checklistAriaLabel,
      checklistToggleAriaLabel = defaults.checklistToggleAriaLabel,
      className,
      onClickViewAll = defaults.onClickViewAll,
      onToggle = defaults.onToggle,
      open = defaults.open,
      enableToggle = defaults.enableToggle,
      taskLists = defaults.taskLists,
      theme = defaults.theme,
      title,
      toggleLabel = defaults.toggleLabel,
      toggleLabelAlign = 'top',
      viewAllLabel,
      ...rest
    }: ChecklistProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    const [isOpen, setIsOpen] = useState(open);
    const listContainerId = useRef(uuidv4()).current;
    const chartLabelId = useRef(uuidv4()).current;

    // Don't use this test: {chartValue && chartLabel && (render...)}.
    // If `chartValue` is 0 (zero) - a valid value - then it will render 0 and skip the remaining statement.
    // Use this test instead: {chartLabelAndValue && (render...)}.
    // The ChecklistChart component will validate `chartValue`.
    const chartLabelAndValue = typeof chartValue === 'number' && chartLabel;

    const handleClickToggle = () => {
      setIsOpen((prevOpen) => !prevOpen);
    };

    const handleClickViewAll = () => {
      onClickViewAll();
    };

    // If state changes, then trigger callback.
    useEffect(() => {
      onToggle(isOpen);
    }, [isOpen, onToggle]);

    // If the "open" prop is changed after initialization,
    // then update internal state.
    useEffect(() => {
      setIsOpen(open);
    }, [open]);

    return (
      <Section
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        aria-label={checklistAriaLabel}
        as="aside"
        className={cx(
          blockClass, // Apply the block class to the main HTML element
          className, // Apply any supplied class names to the main HTML element.
          // example: `${blockClass}__template-string-class-${kind}-n-${size}`,
          {
            [`${blockClass}__closed`]: !isOpen,
          }
        )}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {(title || chartLabelAndValue) && (
          <header className={`${blockClass}__header`}>
            {chartLabelAndValue && (
              <ChecklistChart
                aria-labelledby={chartLabelId}
                theme={theme}
                value={chartValue}
              />
            )}

            <div className={`${blockClass}__titles`}>
              {title && (
                <Heading className={`${blockClass}__title`}>{title}</Heading>
              )}

              {chartLabelAndValue && (
                <p id={chartLabelId} className={`${blockClass}__chart-label`}>
                  {chartLabel}
                </p>
              )}
            </div>

            {enableToggle && (
              <IconButton
                align={toggleLabelAlign}
                aria-controls={listContainerId}
                aria-expanded={isOpen}
                aria-label={checklistToggleAriaLabel}
                className={`${blockClass}__toggle`}
                kind="ghost"
                label={toggleLabel}
                onClick={handleClickToggle}
                size="sm"
              >
                <ChevronUp size={16} className={cx(`${blockClass}__chevron`)} />
              </IconButton>
            )}
          </header>
        )}

        <div id={listContainerId} className={`${blockClass}__content-outer`}>
          <div className={`${blockClass}__content-inner`}>
            <div className={cx(`${blockClass}__body`)}>
              {taskLists.map((list, index) => {
                return (
                  <Section
                    className={`${blockClass}__list-group`}
                    key={`${list.title}-${index}`}
                  >
                    {list.title && (
                      <Heading
                        title={list.title}
                        className={`${blockClass}__list-title`}
                      >
                        {list.title}
                      </Heading>
                    )}
                    <ol className={`${blockClass}__list`}>
                      {list.tasks.map((item, index) => {
                        return (
                          <li
                            className={`${blockClass}__list-item`}
                            key={`${item.label}-${index}`}
                          >
                            <ChecklistIcon kind={item.kind} theme={theme} />

                            {typeof item.onClick === 'function' ? (
                              <Button
                                className={cx(`${blockClass}__button`, {
                                  [`${blockClass}__button--error`]:
                                    item.kind === 'error',
                                })}
                                onClick={() => {
                                  item.onClick?.(item);
                                }}
                                size="sm"
                                title={item.label}
                              >
                                <div>{item.label}</div>
                              </Button>
                            ) : (
                              <div
                                className={cx(
                                  `${blockClass}__label`,
                                  `${blockClass}__label--${item.kind}`
                                )}
                                title={item.label}
                              >
                                {item.label}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </Section>
                );
              })}
            </div>

            {viewAllLabel && (
              <footer className={`${blockClass}__footer`}>
                <Button
                  className={cx(
                    `${blockClass}__button`,
                    `${blockClass}__view-all`
                  )}
                  onClick={handleClickViewAll}
                  size="sm"
                >
                  <div>{viewAllLabel}</div>
                </Button>
              </footer>
            )}
          </div>
        </div>
      </Section>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
Checklist.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
Checklist.propTypes = {
  /**
   * Define both `chartLabel` and `chartValue` to show the chart and its label together.
   */
  chartLabel: PropTypes.node,
  /**
   * A number between 0 and 1.
   *
   * Define both `chartLabel` and `chartValue` to show the chart and its label together.
   */
  chartValue: PropTypes.number,
  /**
   * Aria-label for the Checklist component.
   */
  checklistAriaLabel: PropTypes.string,
  /**
   * Aria-label for the Checklist's toggle component.
   */
  checklistToggleAriaLabel: PropTypes.string,
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * Whether or not to show the open/close toggle.
   */
  enableToggle: PropTypes.bool,
  /**
   * Callback for the "View all" button. See also `viewAllLabel`.
   */
  onClickViewAll: PropTypes.func,
  /**
   * Optional callback for when the list is opened/closed.
   */
  onToggle: PropTypes.func,
  /**
   * Specifies whether the component is opened or closed.
   * This can be set during initialization, or changed after being rendered.
   */
  open: PropTypes.bool,
  /**
   * The task list can be broken down into sub-lists.
   *
   * Each sub-list can include an optional `title`.
   *
   * Each task must specify the appropriate icon (`kind`) and `label`.
   *
   * If any task has an `onClick` callback function defined,
   * then the `label` will be rendered as a button,
   * else the `label` will be rendered as plain text.
   */
  /**@ts-ignore */
  taskLists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      tasks: PropTypes.arrayOf(
        PropTypes.shape({
          kind: PropTypes.oneOf([
            Kinds.unchecked,
            Kinds.indeterminate,
            Kinds.checked,
            Kinds.disabled,
            Kinds.error,
          ]).isRequired,
          label: PropTypes.string.isRequired,
          onClick: PropTypes.func,
        })
      ).isRequired,
    })
  ).isRequired,
  /**
   * Determines the theme of the component.
   */
  theme: PropTypes.oneOf([Themes.light, Themes.dark]),
  /**
   * The title of the component.
   */
  title: PropTypes.node,
  /**
   * The label for the toggle's tooltip.
   */
  toggleLabel: PropTypes.string,
  /**
   * The alignment of the toggle's tooltip.
   */
  toggleLabelAlign: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'right',
  ]),
  /**
   * If defined, will show and enable the "View all (#)" button at the bottom of the list.
   */
  viewAllLabel: PropTypes.string,
};
