//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { PropsWithChildren, ReactNode, forwardRef } from 'react';

import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon';
import { Card } from '../Card';
import PropTypes from 'prop-types';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { prepareProps } from '../../global/js/utils/props-helper';
import { ActionIcon } from '../Card/Card';

export interface ExpressiveCardProps extends PropsWithChildren {
  /**
   * Icons that are displayed on the card. Refer to design documentation for implementation guidelines. Note: href is deprecated. Set link.href for href functionality. If you are setting link object, href is a required property. link object supports all anchor element properties. Precedence: link.href > href. If link.href or href is set => anchor element, else button.
   */
  actionIcons?: ActionIcon[];
  /**
   * Content that shows in the body of the card
   */
  // children: PropTypes.node,
  /**
   * Optional user provided class
   */
  className?: string;
  /**
   * Optional prop that allows you to pass any component.
   */
  decorator?: ReactNode | boolean;
  /**
   * Optional header description
   */
  description?: ReactNode;
  /**
   * Optional label for the top of the card
   */
  label?: ReactNode;
  /**
   * Optional media content like an image to be placed in the card
   */
  media?: ReactNode;
  /**
   * Establishes the position of the media in the card
   */
  mediaPosition?: 'top' | 'left';
  /**
   * Provides the callback for a clickable card
   */
  onClick?: () => void;
  /**
   * Function that's called from the primary button or action icon
   */
  onPrimaryButtonClick?: () => void;
  /**
   * Function that's called from the secondary button
   */
  onSecondaryButtonClick?: () => void;
  /**
   * Provides the icon that's displayed at the top of the card
   */
  pictogram?: CarbonIconType;
  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  primaryButtonHref?: string;
  /**
   * Optional prop to allow overriding the icon rendering. Can be a React component class
   */
  primaryButtonIcon?: () => void | object;
  /**
   * Establishes the kind of button displayed for the primary button
   */
  primaryButtonKind?: 'primary' | 'ghost';
  /**
   * The text that's displayed in the primary button
   */
  primaryButtonText?: string;
  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  secondaryButtonHref?: string;
  /**
   * Optional prop to allow overriding the icon rendering. Can be a React component class
   */
  secondaryButtonIcon?: () => void | object;
  /**
   * Establishes the kind of button displayed for the secondary button
   */
  secondaryButtonKind?: 'secondary' | 'ghost';
  /**
   * The text that's displayed in the secondary button
   */
  secondaryButtonText?: string;
  /**
   * **Experimental:** For all cases a `Slug` component can be provided.
   * Clickable tiles only accept a boolean value of true and display a hollow slug.
   * @deprecated please use the `decorator` prop
   */
  slug?: ReactNode | boolean;

  /**
   * Title that's displayed at the top of the card
   */
  title?: ReactNode;
}

const componentName = 'ExpressiveCard';

export const ExpressiveCard = forwardRef(
  (props: ExpressiveCardProps, ref: React.Ref<HTMLDivElement>) => {
    const validProps = prepareProps(props, [
      'actionIconsPosition',
      'overflowActions',
      'productive',
      'titleSize',
    ]);

    return (
      <Card ref={ref} {...validProps} {...getDevtoolsProps(componentName)} />
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

ExpressiveCard.propTypes = {
  /**
   * Icons that are displayed on the card. Refer to design documentation for implementation guidelines. Note: href is deprecated. Set link.href for href functionality. If you are setting link object, href is a required property. link object supports all anchor element properties. Precedence: link.href > href. If link.href or href is set => anchor element, else button.
   */
  /**@ts-ignore */
  actionIcons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      onKeyDown: PropTypes.func,
      onClick: PropTypes.func,
      iconDescription: PropTypes.string,
      /**
       * @deprecated please use the `link.href` instead
       */
      href: PropTypes.string,
      link: PropTypes.shape({
        href: PropTypes.string.isRequired,
      }),
    })
  ),
  /**
   * Content that shows in the body of the card
   */
  children: PropTypes.node,
  /**
   * Optional user provided class
   */
  className: PropTypes.string,
  /**
   * Optional prop that allows you to pass any component.
   */
  decorator: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  /**
   * Optional header description
   */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Optional label for the top of the card
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Optional media content like an image to be placed in the card
   */
  media: PropTypes.node,
  /**
   * Establishes the position of the media in the card
   */
  mediaPosition: PropTypes.oneOf(['top', 'left']),
  /**
   * Provides the callback for a clickable card
   */
  onClick: PropTypes.func,
  /**
   * Function that's called from the primary button or action icon
   */
  onPrimaryButtonClick: PropTypes.func,
  /**
   * Function that's called from the secondary button
   */
  onSecondaryButtonClick: PropTypes.func,
  /**
   * Provides the icon that's displayed at the top of the card
   */
  /**@ts-ignore */
  pictogram: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  primaryButtonHref: PropTypes.string,
  /**
   * Optional prop to allow overriding the icon rendering. Can be a React component class
   */
  /**@ts-ignore */
  primaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Establishes the kind of button displayed for the primary button
   */
  primaryButtonKind: PropTypes.oneOf(['primary', 'ghost']),
  /**
   * The text that's displayed in the primary button
   */
  primaryButtonText: PropTypes.string,
  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  secondaryButtonHref: PropTypes.string,
  /**
   * Optional prop to allow overriding the icon rendering. Can be a React component class
   */
  /**@ts-ignore */
  secondaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Establishes the kind of button displayed for the secondary button
   */
  secondaryButtonKind: PropTypes.oneOf(['secondary', 'ghost']),
  /**
   * The text that's displayed in the secondary button
   */
  secondaryButtonText: PropTypes.string,
  /**
   * **Experimental:** For all cases a `Slug` component can be provided.
   * Clickable tiles only accept a boolean value of true and display a hollow slug.
   * @deprecated please use the `decorator` prop
   */
  slug: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),

  /**
   * Title that's displayed at the top of the card
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

ExpressiveCard.displayName = componentName;
