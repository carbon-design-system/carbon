//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { ReactNode } from 'react';
import cx from 'classnames';
import { Button } from '@carbon/react';
import PropTypes from 'prop-types';
import { pkg } from '../../settings';
const componentName = 'CardFooter';
import { Error } from '@carbon/react/icons';

const defaults = {
  actions: Object.freeze([]),
  primaryButtonKind: 'primary',
  productive: false,
  secondaryButtonKind: 'secondary',
};

interface CardFooterProps {
  actions?: ReactNode[] | ReactNode;
  disabled?: boolean;
  footerActionIcon?: React.ElementType;
  hasActions?: boolean;
  hasButton?: boolean;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  primaryButtonDisabled?: boolean;
  primaryButtonHref?: string;
  primaryButtonIcon?: React.ElementType;
  primaryButtonKind?: 'primary' | 'ghost';
  primaryButtonPlacement?: 'top' | 'bottom';
  primaryButtonText?: string;
  productive?: boolean;
  secondaryButtonDisabled?: boolean;
  secondaryButtonHref?: string;
  secondaryButtonIcon?: React.ElementType;
  secondaryButtonKind?: 'secondary' | 'ghost';
  secondaryButtonPlacement?: 'top' | 'bottom';
  secondaryButtonText?: string;
}

export const CardFooter = ({
  actions = defaults.actions,
  disabled,
  footerActionIcon: FooterActionIcon,
  hasActions,
  hasButton,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonDisabled,
  primaryButtonHref,
  primaryButtonIcon,
  primaryButtonKind = 'primary',
  primaryButtonPlacement,
  primaryButtonText,
  productive = defaults.productive,
  secondaryButtonDisabled,
  secondaryButtonHref,
  secondaryButtonIcon,
  secondaryButtonKind = 'secondary',
  secondaryButtonPlacement,
  secondaryButtonText,
}: CardFooterProps) => {
  const blockClass = `${pkg.prefix}--card`;
  const footerClass = `${pkg.prefix}--card__footer`;
  const footerClasses = cx(footerClass, {
    [`${footerClass}-no-button`]: !hasButton,
  });
  return (
    <div className={footerClasses}>
      {secondaryButtonText && secondaryButtonPlacement === 'bottom' && (
        <Button
          kind={productive ? 'ghost' : secondaryButtonKind}
          onClick={onSecondaryButtonClick}
          size="md"
          renderIcon={secondaryButtonIcon}
          href={secondaryButtonHref}
          disabled={secondaryButtonDisabled}
        >
          {secondaryButtonText}
        </Button>
      )}
      {primaryButtonText && primaryButtonPlacement === 'bottom' && (
        <Button
          kind={productive ? 'ghost' : primaryButtonKind}
          onClick={onPrimaryButtonClick}
          size="md"
          renderIcon={primaryButtonIcon}
          href={primaryButtonHref}
          disabled={primaryButtonDisabled}
        >
          {primaryButtonText}
        </Button>
      )}
      {hasActions && <div className={`${blockClass}__actions`}>{actions}</div>}
      {FooterActionIcon && (
        <div className={`${blockClass}__action-icon`}>
          {disabled ? <Error size={16} /> : <FooterActionIcon />}
        </div>
      )}
    </div>
  );
};
/**@ts-ignore */
CardFooter.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  disabled: PropTypes.bool,
  footerActionIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  hasActions: PropTypes.bool,
  hasButton: PropTypes.bool,
  onPrimaryButtonClick: PropTypes.func,
  onSecondaryButtonClick: PropTypes.func,
  primaryButtonDisabled: PropTypes.bool,
  primaryButtonHref: PropTypes.string,
  primaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  primaryButtonKind: PropTypes.oneOf(['primary', 'ghost']),
  primaryButtonPlacement: PropTypes.oneOf(['top', 'bottom']),
  primaryButtonText: PropTypes.string,
  productive: PropTypes.bool,
  secondaryButtonDisabled: PropTypes.bool,
  secondaryButtonHref: PropTypes.string,
  secondaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  secondaryButtonKind: PropTypes.oneOf(['secondary', 'ghost']),
  secondaryButtonPlacement: PropTypes.oneOf(['top', 'bottom']),
  secondaryButtonText: PropTypes.string,
};
/**@ts-ignore */
CardFooter.displayName = componentName;
