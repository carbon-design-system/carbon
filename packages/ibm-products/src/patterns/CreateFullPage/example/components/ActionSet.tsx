/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, ButtonSet, InlineLoading } from '@carbon/react';
import React, { ComponentProps, PropsWithChildren } from 'react';
import { ButtonProps } from '@carbon/react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ButtonKind } from '@carbon/react';

const blockClass = 'action-set';
const componentName = 'ActionSet';

export const ButtonSizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

export type ButtonSize = (typeof ButtonSizes)[number];

type ActionSetButtonProps = ComponentProps<typeof Button>;

const ActionSetButton = React.forwardRef(
  (
    {
      className,
      disabled,
      kind,
      label,
      loading,
      isExpressive = true,
      ...rest
    }: PropsWithChildren<ActionSetButtonProps>,
    ref
  ) => (
    <Button
      {...rest}
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
  actions: ButtonProps<React.ElementType>[];
  buttonSize?: ButtonSize;
  className?: string;
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
      primaryActions + secondaryActions + dangerActions + ghostActions
    ) {
      problems.push(
        `you can only have 'primary', 'danger', 'secondary', 'ghost' and 'danger--ghost' buttons in a ${componentName}`
      );
    }
    return problems.length > 0
      ? console.log(
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
      size = defaults.size as ButtonSize,
      ...rest
    } = props;
    validateActionSetProps({ actions, size });
    const buttons = (actions && actions.slice?.(0)) || [];

    // We stack the buttons in a sm set, or if there are three or more in a md set.
    const stacking = willStack(size, buttons.length);

    // Order of button kinds: ghost first, then danger--ghost, then most other types,
    // then danger, and finally primary
    const buttonOrder = (kind) =>
      ({
        ghost: 1,
        'danger--ghost': 2,
        danger: 4,
        primary: 5,
      })[kind] ?? 3;

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
          const { key, ...actionProps } = action;
          return (
            <ActionSetButton
              key={key || index}
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
