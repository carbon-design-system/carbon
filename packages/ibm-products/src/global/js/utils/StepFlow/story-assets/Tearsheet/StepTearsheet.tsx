/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import { Tearsheet } from '../../../../../../components/Tearsheet';

import { useStepContext } from '../../StepContext';
import { StepState } from '../../types';

interface Props {
  children?: ReactNode;
  influencer?: ((a: StepState) => ReactNode) | null;
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  hasCloseIcon?: boolean;
  closeIconDescription?: string;
  selectorPrimaryFocus?: string;
}

export const StepTearsheet = ({
  children,
  open,
  onClose,
  influencer,
  title,
  hasCloseIcon,
  closeIconDescription = 'Close',
  selectorPrimaryFocus,
  ...rest
}: Props) => {
  const state = useStepContext();
  const influencerContent = influencer?.(state) || null;

  return (
    <Tearsheet
      {...rest}
      influencer={influencerContent}
      open={open}
      onClose={onClose}
      title={title}
      hasCloseIcon={hasCloseIcon}
      closeIconDescription={closeIconDescription}
      selectorPrimaryFocus={selectorPrimaryFocus}
    >
      {children}
    </Tearsheet>
  );
};
