//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, {
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from 'react';

import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon';
import { Card } from '../Card';
import PropTypes from 'prop-types';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { prepareProps } from '../../global/js/utils/props-helper';
import { ActionIcon } from '../Card/Card';

const componentName = 'ProductiveCard';

type overflowAction = {
  id?: string;
  itemText?: string;
  onClick?: (event: MouseEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
};
type PlacementType = 'top' | 'bottom';
type ClickZoneType = 'one' | 'two' | 'three';
export interface ProductiveCardProps extends PropsWithChildren {
  /**
   * Icons that are displayed on the card. Refer to design documentation for implementation guidelines. Note: href is deprecated. Set link.href for href functionality. If you are setting link object, href is a required property. link object supports all anchor element properties. Precedence: link.href > href. If link.href or href is set => anchor element, else button.
   */
  actionIcons?: ActionIcon[];
  /**
   * Optional prop that allows you to pass any component.
   */
  decorator?: ReactNode | boolean;

  /**
   * Determines if the action icons are on the top or bottom of the card
   */
  actionsPlacement?: PlacementType;
  /**
   * Optional user provided class
   */
  className?: string;
  /**
   * Designates which zones of the card are clickable. Refer to design documentation for implementation guidelines
   */
  clickZone?: ClickZoneType;
  /**
   * Optional header description
   */
  description?: ReactNode;
  /**
   * Optional label for the top of the card
   */
  label?: ReactNode;

  /**
   * Provides the callback for a clickable card
   */
  onClick?: (event: MouseEvent) => void;

  /**
   * Provides the callback for keydown events on the card
   */
  onKeyDown?: (event: KeyboardEvent) => void;

  /**
   * Function that's called from the primary button or action icon
   */
  onPrimaryButtonClick?: () => void;
  /**
   * Function that's called from the secondary button
   */
  onSecondaryButtonClick?: () => void;
  /**
   * Use an overflow menu instead of action icons. Refer to design documentation for implementation guidelines
   */
  overflowActions?: overflowAction[];
  /**
   * Sets the text for the OverflowMenu aria label and the OverflowMenu trigger button tooltip.
   * Overrides `iconDescription` prop.
   */
  overflowAriaLabel?: string;
  /**
   * Determines if the primary button is enabled or not
   */
  primaryButtonDisabled?: boolean;
  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  primaryButtonHref?: string;
  /**
   * Optional prop to allow overriding the icon rendering. Can be a React component class
   */
  primaryButtonIcon?: CarbonIconType;
  /**
   * Determines if the primary button is on the top or bottom of the card
   */
  primaryButtonPlacement?: PlacementType;
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
  secondaryButtonIcon?: CarbonIconType;
  /**
   * Determines if the secondary button is on the top or bottom of the card
   */
  secondaryButtonPlacement?: PlacementType;
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

  /**
   * Determines title size
   */
  titleSize?: 'default' | 'large';

  /**
   * Sets the text for the OverflowMenu trigger button tooltip and OverflowMenu aria label,
   * gets overridden by the `overflowAriaLabel` prop.
   *
   * @deprecated Please use the `overflowAriaLabel` prop instead.
   */
  iconDescription?: string;
}

export const ProductiveCard = forwardRef(
  (
    { actionsPlacement = 'top', children, ...rest }: ProductiveCardProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const validProps = prepareProps(rest, [
      'media',
      'mediaPosition',
      'pictogram',
      'primaryButtonClick',
      'productive',
      'secondaryButtonKind',
    ]);
    return (
      <Card
        {...{
          ...validProps,
          actionsPlacement,
          ref,
          productive: true,
        }}
        {...getDevtoolsProps(componentName)}
      >
        {children}
      </Card>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

ProductiveCard.propTypes = {
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
   * Determines if the action icons are on the top or bottom of the card
   */
  actionsPlacement: PropTypes.oneOf(['top', 'bottom']),
  /**
   * Content that shows in the body of the card
   */
  children: PropTypes.node,
  /**
   * Optional user provided class
   */
  className: PropTypes.string,
  /**
   * Designates which zones of the card are clickable. Refer to design documentation for implementation guidelines
   */
  clickZone: PropTypes.oneOf(['one', 'two', 'three']),
  /**
   * Optional prop that allows you to pass any component.
   */
  decorator: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  /**
   * Optional header description
   */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Sets the text for the OverflowMenu trigger button tooltip and OverflowMenu aria label,
   * gets overridden by the `overflowAriaLabel` prop.
   *
   * @deprecated Please use the `overflowAriaLabel` prop instead.
   */
  iconDescription: PropTypes.string,
  /**
   * Optional label for the top of the card
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Provides the callback for a clickable card
   */
  onClick: PropTypes.func,
  /**
   * Function that's called from the primary button or action icon
   */
  onPrimaryButtonClick: PropTypes.func,
  /**
   * Function that's called from the secondary button or action icon
   */
  onSecondaryButtonClick: PropTypes.func,
  /**
   * Use an overflow menu instead of action icons. Refer to design documentation for implementation guidelines
   */
  /**@ts-ignore */
  overflowActions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      itemText: PropTypes.string,
      onClick: PropTypes.func,
      onKeyDown: PropTypes.func,
    })
  ),
  /**
   * Sets the text for the OverflowMenu aria label and the OverflowMenu trigger button tooltip.
   * Overrides `iconDescription` prop.
   */
  overflowAriaLabel: PropTypes.string,
  /**
   * Determines if the primary button is enabled or not
   */
  primaryButtonDisabled: PropTypes.bool,
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
   * Determines if the primary button is on the top or bottom of the card
   */
  primaryButtonPlacement: PropTypes.oneOf(['top', 'bottom']),
  /**
   * The text that's displayed in the primary button
   */
  /**@ts-ignore */
  primaryButtonText: PropTypes.node,
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
   * Determines if the secondary button is on the top or bottom of the card
   */
  secondaryButtonPlacement: PropTypes.oneOf(['top', 'bottom']),
  /**
   * The text that's displayed in the secondary button
   */
  /**@ts-ignore */
  secondaryButtonText: PropTypes.node,
  /**
   * **Experimental:** For all cases a `Slug` component can be provided.
   * Clickable tiles only accept a boolean value of true and display a hollow slug.
   */
  slug: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  /**
   * Title that's displayed at the top of the card
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Determines title size
   */
  titleSize: PropTypes.oneOf(['default', 'large']),
};

ProductiveCard.displayName = componentName;
