/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Carbon and package components we use.
import { Button, ButtonSet, InlineLoading } from '@carbon/react';
// Import portions of React that are needed.
import React, { ComponentProps, PropsWithChildren } from 'react';
import { allPropTypes, prepareProps } from '../../global/js/utils/props-helper';

import { ButtonProps } from '@carbon/react';
// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings';
import { ButtonKind } from '@carbon/react';
import pconsole from '../../global/js/utils/pconsole';

const blockClass = `${pkg.prefix}--action-set`;
const componentName = 'ActionSet';

export const ButtonSizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

export type ButtonSize = (typeof ButtonSizes)[number];

type ActionSetButtonProps = ComponentProps<typeof Button>;

const ActionSetButton = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      className,
      disabled,
      kind,
      label,
      loading,
      isExpressive = true,
      // Collect any other property values passed in.
      ...rest
    }: PropsWithChildren<ActionSetButtonProps>,
    ref
  ) => (
    <Button
      {
        // Pass through any other property values as HTML attributes.
        ...rest
      }
      isExpressive={isExpressive}
      className={cx(className, [
        `${blockClass}__action-button`,
        {
          [`${blockClass}__action-button--ghost`]:
            kind === 'ghost' || kind === 'danger--ghost',
          [`${blockClass}__action-button--expressive`]: isExpressive,
        },
      ])}
      disabled={disabled || loading || false}
      {...{ kind, ref }}
    >
      {label}
      {loading && <InlineLoading />}
    </Button>
  )
);

ActionSetButton.displayName = 'ActionSetButton';

ActionSetButton.propTypes = {
  /**@ts-ignore*/
  ...Button.PropTypes,
  kind: PropTypes.oneOf([
    'ghost',
    'danger--ghost',
    'tertiary',
    'secondary',
    'danger',
    'primary',
  ]),
  label: PropTypes.string,
  loading: PropTypes.bool,
};

const defaultKind = 'primary';

const willStack = (size, numberOfActions) =>
  size === 'sm' || (size === 'md' && numberOfActions > 2);

// Default values for props
const defaults = {
  size: 'md',
};

export interface ActionSetProps {
  /**
   * The action buttons to show. Each action is specified as an object
   * representation of a Carbon button.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  actions: ButtonProps<React.ElementType>[];

  /**
   * The size of buttons to use for the actions. The allowed values are
   * those for the size prop of carbon Button. If this prop is specified, all
   * the buttons will be set to this size, overriding any 'size' values (if any)
   * supplied in the actions array (if any).
   */
  buttonSize?: ButtonSize;
  /**
   * An optional class or classes to be added to the outermost element.
   */
  className?: string;

  /**
   * When true, prevents automatic stacking of buttons even when size would
   * normally trigger stacking (e.g., 'sm' size or 'md' with 3+ actions).
   * Buttons will remain in a horizontal layout.
   */
  disableStacking?: boolean;

  /**
   * The size of the action set. Different button arrangements are used at
   * different sizes, to make best use of the available space.
   */
  size?: ButtonSize;
}

export const validateActionSetProps = ({ actions, size }) => {
  if (actions && actions.length) {
    const problems = [] as string[];

    const stacking = willStack(size, actions.length);

    const countActions = (kind: ButtonKind) =>
      actions.filter(
        (action: ButtonProps<React.ElementType>) =>
          (action.kind || defaultKind) === kind
      ).length;

    const primaryActions = countActions('primary');
    const secondaryActions = countActions('secondary');
    const tertiaryActions = countActions('tertiary');
    const dangerActions = countActions('danger');
    const ghostActions = countActions('ghost') + countActions('danger--ghost');

    if (stacking && actions.length > 3) {
      problems.push(
        `you cannot have more than three actions in this size of ${componentName}`
      );
    }

    if (actions.length > 4) {
      problems.push(
        `you cannot have more than four actions in a ${componentName}`
      );
    }
    if (primaryActions > 1) {
      problems.push(
        `you cannot have more than one 'primary' action in a ${componentName}`
      );
    }

    if (ghostActions > 1) {
      problems.push(
        `you cannot have more than one 'ghost' action in a ${componentName}`
      );
    }

    if (stacking && actions.length > 1 && ghostActions > 0) {
      problems.push(
        `you cannot have a 'ghost' button in conjunction with other action types in this size of ${componentName}`
      );
    }

    if (
      actions.length >
      primaryActions +
        secondaryActions +
        tertiaryActions +
        dangerActions +
        ghostActions
    ) {
      problems.push(
        `you can only have 'primary', 'danger', 'secondary', 'tertiary', 'ghost' and 'danger--ghost' buttons in a ${componentName}`
      );
    }
    return problems.length > 0
      ? pconsole.error(
          `Invalid prop \`actions\` supplied to \`${componentName}\`: ${problems.join(
            ', and '
          )}.`
        )
      : null;
  }
};

/**
 * An ActionSet presents a set of action buttons, constructed from bundles
 * of prop values and applying some layout rules. When the size is 'sm'
 * the buttons are stacked, and should only include primary and secondary
 * kinds. When the size is 'md' the buttons are stacked if there are three or
 * more. When the size is 'md' or 'lg', two buttons share the horizontal space.
 * When the size is 'lg', three or more buttons use a quarter of the available
 * horizontal space, and if the size is 'xlg' or 'max' the buttons always use
 * a quarter of the available horizontal space. If there is a ghost button,
 * it appears at the left side. If there is a primary button it appears at the
 * right.
 */
export const ActionSet = React.forwardRef<HTMLDivElement, ActionSetProps>(
  (props, ref) => {
    const {
      actions,
      buttonSize,
      className,
      disableStacking = false,
      size = defaults.size as ButtonSize,
      ...rest
    } = props;
    validateActionSetProps({ actions, size });
    const buttons = (actions && actions.slice?.(0)) || [];

    // We stack the buttons in a sm set, or if there are three or more in a md set.
    // Unless disableStacking is true, in which case we never stack.
    const stacking = disableStacking ? false : willStack(size, buttons.length);

    // Order of button kinds: ghost first, then danger--ghost, then tertiary,
    // then most other types, then danger, and finally primary
    const buttonOrder = (kind) =>
      ({
        ghost: 1,
        'danger--ghost': 2,
        tertiary: 3,
        danger: 5,
        primary: 6,
      })[kind] ?? 4;

    // order the actions with ghost/ghost-danger buttons first and primary/danger buttons last
    // (or the opposite way if we're stacking)
    buttons.sort(
      (action1, action2) =>
        (buttonOrder(action1.kind || defaultKind) -
          buttonOrder(action2.kind || defaultKind)) *
        (stacking ? -1 : 1)
    );

    return (
      <ButtonSet
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass,
          className,
          {
            [`${blockClass}--row-single`]: !stacking && buttons.length === 1,
            [`${blockClass}--row-double`]: !stacking && buttons.length === 2,
            [`${blockClass}--row-triple`]: !stacking && buttons.length === 3,
            [`${blockClass}--row-quadruple`]: !stacking && buttons.length >= 4,
            [`${blockClass}--stacking`]: stacking,
          },
          `${blockClass}--${size}`
        )}
        ref={ref}
        role="presentation"
        stacked={stacking}
      >
        {buttons.map((action, index) => {
          const actionProps = prepareProps(action, ['key']);
          return (
            <ActionSetButton
              key={action.key || index}
              {...actionProps}
              size={buttonSize}
            />
          );
        })}
      </ButtonSet>
    );
  }
);

ActionSet.displayName = componentName;

/**
 * A validator function to help validate the actions supplied for a particular
 * size of component. When the size is sm, or md with three actions, the
 * buttons will be stacked and a maximum of three buttons is applied with no
 * ghosts unless the ghost is the only button. Otherwise a maximum of four
 * buttons with a maximum of one ghost is applied. In either case, a maximum
 * of one primary button is allowed.
 * @param sizeFn An optional function which will be passed all the props and
 * returns the size that the component should be treated as being: if not
 * provided, a 'size' prop is used to determine the size of the component.
 * @returns null if the actions meet the requirements, or an Error object with
 * an explanatory message.
 */

ActionSet.propTypes = {
  /**
   * The action buttons to show. Each action is specified as an
   * object with optional fields 'label' to supply the button label, 'kind'
   * to select the button kind (must be 'primary', 'secondary' or 'ghost'),
   * 'loading' to display a loading indicator, and 'onClick' to receive
   * notifications when the button is clicked. Additional fields in the object
   * will be passed to the Button component, and these can include 'disabled',
   * 'ref', 'className', and any other Button props. Any other fields in the
   * object will be passed through to the button element as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  actions: allPropTypes([
    PropTypes.arrayOf(
      PropTypes.shape({
        /**@ts-ignore*/
        ...Button.propTypes,
        kind: PropTypes.oneOf([
          'ghost',
          'danger--ghost',
          'tertiary',
          'secondary',
          'danger',
          'primary',
        ]),
        label: PropTypes.string,
        loading: PropTypes.bool,
        // we duplicate this Button prop to improve the DocGen here
        /**@ts-ignore*/
        onClick: Button.propTypes.onClick,
      })
    ),
  ]),

  /**
   * The size of buttons to use for the actions. The allowed values are
   * those for the size prop of carbon Button. If this prop is specified, all
   * the buttons will be set to this size, overriding any 'size' values (if any)
   * supplied in the actions array (if any).
   */
  /**@ts-ignore*/
  buttonSize: Button.propTypes.size,

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className: PropTypes.string,

  /**
   * When true, prevents automatic stacking of buttons even when size would
   * normally trigger stacking (e.g., 'sm' size or 'md' with 3+ actions).
   * Buttons will remain in a horizontal layout.
   */
  disableStacking: PropTypes.bool,

  /**
   * The size of the action set. Different button arrangements are used at
   * different sizes, to make best use of the available space.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
};
