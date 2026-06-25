/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, InlineLoading } from '@carbon/react';
import {
  CheckmarkOutline,
  ErrorFilled,
  ErrorOutline,
  Save,
} from '@carbon/react/icons';
import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

const componentName = 'Saving';

type Type = 'manual' | 'auto';
type Status = 'default' | 'in-progress' | 'success' | 'fail';

export interface SavingProps {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * Description for default state icon (manual).
   */
  defaultIconDescription?: string;
  /**
   * Default text for the save button (manual). Per design guidelines you probably don't want to display this in the auto mode.
   */
  defaultText?: string;
  /**
   * Description for fail state icon (manual).
   */
  failIconDescription?: string;
  /**
   * Text for failure state.
   */
  failText?: string;
  /**
   * Description for in progress state icon (manual).
   */
  inProgressIconDescription?: string;
  /**
   * Text for in progress state.
   */
  inProgressText?: string;
  /**
   * Function handler for cancel button (manual).
   */
  onRequestCancel?(event: React.MouseEvent<HTMLButtonElement>): void;
  /**
   * Function handler for save button (manual).
   */
  onRequestSave?(event: React.MouseEvent<HTMLButtonElement>): void;
  /**
   * Text for the secondary or cancel button (manual).
   */
  secondaryButtonText?: string;
  /**
   * The status of the save. default being the untouched default state -> in-progress being a save has been initiated -> fail or success being the outcome.
   */
  status: Status;
  /**
   * Description for success state icon (manual).
   */
  successIconDescription?: string;
  /**
   * Text for success state
   */
  successText?: string;
  /**
   * Designates the style of the save component. Manual uses a set of buttons and auto just displays a string. See usage guidelines for additional information.
   */
  type: Type;
}

export const Saving = forwardRef(
  (
    {
      secondaryButtonText,
      className,
      defaultIconDescription,
      defaultText,
      failIconDescription,
      failText,
      inProgressIconDescription,
      inProgressText,
      onRequestCancel,
      onRequestSave,
      status,
      successIconDescription,
      successText,
      type,
      ...rest
    }: SavingProps,
    ref
  ) => {
    const statusObj = {
      default: {
        text: defaultText,
        iconDescription: defaultIconDescription,
        icon: (props) => <Save size={16} {...props} />,
      },
      ['in-progress']: {
        text: inProgressText,
        iconDescription: inProgressIconDescription,
        icon: (props) => <InlineLoading size={16} {...props} />,
      },
      success: {
        text: successText,
        iconDescription: successIconDescription,
        icon: (props) => <CheckmarkOutline size={16} {...props} />,
      },
      fail: {
        text: failText,
        iconDescription: failIconDescription,
        icon: (props) => <ErrorOutline size={16} {...props} />,
      },
    };
    const blockClass = `${pkg.prefix}--saving`;

    return (
      <div
        {...rest}
        ref={ref as never}
        className={cx(blockClass, className)}
        {...getDevtoolsProps(componentName)}
      >
        {type === 'auto' ? (
          <div className={`${blockClass}__message`}>
            {status === 'fail' && (
              <div className={`${blockClass}__error-icon`}>
                <ErrorFilled size={16} />
              </div>
            )}
            <p className={`${blockClass}__text`}>{statusObj[status]?.text}</p>
          </div>
        ) : (
          <div className={`${blockClass}__buttons`}>
            <Button
              onClick={onRequestCancel}
              kind="secondary"
              disabled={status !== 'in-progress'}
              type="button"
            >
              {secondaryButtonText}
            </Button>
            <Button
              onClick={onRequestSave}
              kind="primary"
              renderIcon={statusObj[status]?.icon}
              iconDescription={statusObj[status]?.iconDescription}
              disabled={status === 'in-progress'}
              type="button"
            >
              {statusObj[status]?.text}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

Saving.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * Description for default state icon (manual).
   */
  defaultIconDescription: PropTypes.string,
  /**
   * Default text for the save button (manual). Per design guidelines you probably don't want to display this in the auto mode.
   */
  defaultText: PropTypes.string,
  /**
   * Description for fail state icon (manual).
   */
  failIconDescription: PropTypes.string,
  /**
   * Text for failure state.
   */
  failText: PropTypes.string,
  /**
   * Description for in progress state icon (manual).
   */
  inProgressIconDescription: PropTypes.string,
  /**
   * Text for in progress state.
   */
  inProgressText: PropTypes.string,
  /**
   * Function handler for cancel button (manual).
   */
  onRequestCancel: PropTypes.func,
  /**
   * Function handler for save button (manual).
   */
  onRequestSave: PropTypes.func,
  /**
   * Text for the secondary or cancel button (manual).
   */
  secondaryButtonText: PropTypes.string,
  /**
   * The status of the save. default being the untouched default state -> in-progress being a save has been initiated -> fail or success being the outcome.
   */
  status: PropTypes.oneOf<Status>(['default', 'in-progress', 'success', 'fail'])
    .isRequired,
  /**
   * Description for success state icon (manual).
   */
  successIconDescription: PropTypes.string,
  /**
   * Text for success state
   */
  successText: PropTypes.string,
  /**
   * Designates the style of the save component. Manual uses a set of buttons and auto just displays a string. See usage guidelines for additional information.
   */
  type: PropTypes.oneOf<Type>(['manual', 'auto']).isRequired,
};

Saving.displayName = componentName;
