/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropsWithChildren, ReactNode } from 'react';

import { Card } from '../Card';
import PropTypes from 'prop-types';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

const componentName = 'GetStartedCard';

type MetaData = {
  id?: string;
  icon?: () => ReactNode;
  iconDescription?: string;
};

export interface GetStartedCardProps extends PropsWithChildren {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Optional if the card should be disabled
   */
  disabled?: boolean;

  /**
   * Provides the action icon that's displayed at the footer of the card
   */
  footerActionIcon: React.ElementType;

  /**
   * Optional label for the top of the card
   */
  label?: ReactNode;

  /**
   * Optional media content like an image to be placed in the card
   */
  media?: ReactNode;

  /**
   * Icons that are displayed on the card showing the time and skill needed
   */
  metadata: readonly MetaData[];

  /**
   * Provides the callback for a clickable card
   */
  onClick?: () => void;

  /**
   * Provides the icon that's displayed at the top of the card
   */
  pictogram?: () => ReactNode;

  /**
   * Provides number for card for tasks in a sequential order
   */
  sequence?: number;

  /**
   * Provides the status that's displayed at the top of the card
   */
  status?: 'complete' | 'incomplete';

  /**
   * Title that's displayed at the top of the card
   */
  title?: ReactNode;
}

/**
 * GetStartedCard a card with icon, number, and media variants
 */
export const GetStartedCard = React.forwardRef(
  (props: GetStartedCardProps, ref: React.Ref<HTMLDivElement>) => {
    return (
      <Card
        {...{ ...props, ref, getStarted: true }}
        {...getDevtoolsProps(componentName)}
      />
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

GetStartedCard.displayName = componentName;

GetStartedCard.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Optional if the card should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provides the action icon that's displayed at the footer of the card
   */
  /**@ts-ignore */
  footerActionIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional label for the top of the card
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Optional media content like an image to be placed in the card
   */
  media: PropTypes.node,

  /**
   * Icons that are displayed on the card showing the time and skill needed
   */
  /**@ts-ignore */
  metadata: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      iconDescription: PropTypes.string,
    })
  ),

  /**
   * Provides the callback for a clickable card
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Provides the icon that's displayed at the top of the card
   */
  /**@ts-ignore */
  pictogram: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Provides number for card for tasks in a sequential order
   */
  sequence: PropTypes.number,

  /**
   * Provides the status that's displayed at the top of the card
   */
  status: PropTypes.oneOf(['complete', 'incomplete']),

  /**
   * Title that's displayed at the top of the card
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
