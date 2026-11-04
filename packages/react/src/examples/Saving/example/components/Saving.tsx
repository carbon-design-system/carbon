/**
 * Copyright IBM Corp. 2026
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
import cx from 'classnames';

export type SavingType = 'manual' | 'auto';
export type SavingStatus = 'default' | 'in-progress' | 'success' | 'fail';

const blockClass = 'saving-pattern';

export interface SavingProps {
  className?: string;
  defaultIconDescription?: string;
  defaultText?: string;
  failIconDescription?: string;
  failText?: string;
  inProgressIconDescription?: string;
  inProgressText?: string;
  onRequestCancel?(event: React.MouseEvent<HTMLButtonElement>): void;
  onRequestSave?(event: React.MouseEvent<HTMLButtonElement>): void;
  secondaryButtonText?: string;
  status: SavingStatus;
  successIconDescription?: string;
  successText?: string;
  type: SavingType;
}

export const Saving = forwardRef<HTMLDivElement, SavingProps>(
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
    },
    ref
  ) => {
    const statusObj = {
      default: {
        text: defaultText,
        iconDescription: defaultIconDescription,
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <Save size={16} {...props} />
        ),
      },
      'in-progress': {
        text: inProgressText,
        iconDescription: inProgressIconDescription,
        icon: (props: object) => <InlineLoading size={16} {...props} />,
      },
      success: {
        text: successText,
        iconDescription: successIconDescription,
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <CheckmarkOutline size={16} {...props} />
        ),
      },
      fail: {
        text: failText,
        iconDescription: failIconDescription,
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <ErrorOutline size={16} {...props} />
        ),
      },
    };

    return (
      <div {...rest} ref={ref} className={cx(blockClass, className)}>
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

Saving.displayName = 'Saving';
