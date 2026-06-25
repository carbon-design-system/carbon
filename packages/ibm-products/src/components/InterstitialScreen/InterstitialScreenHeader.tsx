/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ModalHeader,
  ProgressIndicator,
  ProgressStep,
  usePrefix,
} from '@carbon/react';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { InterstitialScreenContext, blockClass } from './context';
import { getDevtoolsProps } from '../../global/js/utils/devtools';

export interface InterstitialScreenHeaderProps {
  /**
   * Provide the optional content for header section and will be render after header titles and before progress indicator.
   * People can make use of this if they want to have custom header.
   */
  children?: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * Provide an optional title to be applied to the header >.
   */
  headerTitle?: string;
  /**
   * Provide an optional sub title to be applied to the header >.
   */
  headerSubTitle?: string;
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription?: string;
  /**
   * Optional parameter to hide the progress indicator when multiple steps are used.
   */
  hideProgressIndicator?: boolean;
}

export type EnrichedChildren = {
  children: React.ReactNode;
  stepTitle?: string;
  translateWithId?: (id: string) => string;
};

const InterstitialScreenHeader = React.forwardRef<
  HTMLDivElement,
  InterstitialScreenHeaderProps
>((props, ref) => {
  const {
    className = '',
    headerTitle,
    headerSubTitle,
    closeIconDescription,
    hideProgressIndicator,
    children,
    ...rest
  } = props;
  const { bodyChildrenData, isFullScreen, progStep, handleClose, stepCount } =
    React.useContext(InterstitialScreenContext);

  const headerBlockClass = `${blockClass}--internal-header`;
  const carbonPrefix = usePrefix();

  const headerContent = () => {
    return (
      <>
        {(headerTitle || headerSubTitle) && (
          <div className={`${blockClass}--titleContainer`}>
            {headerTitle && <h1>{headerTitle}</h1>}
            {headerSubTitle && <h2>{headerSubTitle}</h2>}
          </div>
        )}

        {children}

        {!hideProgressIndicator &&
          bodyChildrenData &&
          Array.isArray(bodyChildrenData) && (
            <div className={`${blockClass}--progress`}>
              <ProgressIndicator vertical={false} currentIndex={progStep}>
                {bodyChildrenData?.map((child: React.ReactNode, idx) => {
                  if (React.isValidElement<EnrichedChildren>(child)) {
                    const stepKey = `${child.props?.stepTitle?.replace(/\s+/g, '') || 'step'}-${idx}`;

                    return (
                      <ProgressStep
                        key={stepKey}
                        label={child.props.stepTitle ?? `Step ${idx + 1}`}
                        translateWithId={child.props.translateWithId}
                      />
                    );
                  }
                })}
              </ProgressIndicator>
              <div
                aria-live="polite"
                aria-atomic="true"
                className={`${carbonPrefix}--visually-hidden`}
              >
                Step {progStep + 1} of {stepCount}
              </div>
            </div>
          )}
      </>
    );
  };

  const closeModal = () => {
    handleClose?.('close');
  };
  return isFullScreen ? (
    <header
      ref={ref}
      role="presentation"
      className={cx(headerBlockClass, className, {
        [`${headerBlockClass}--has-title`]:
          headerTitle || headerSubTitle || children,
      })}
      {...getDevtoolsProps('InterstitialScreenHeader')}
      {...rest}
    >
      {headerContent()}
    </header>
  ) : (
    <ModalHeader
      ref={ref}
      className={cx(headerBlockClass, className, {
        [`${headerBlockClass}--has-title`]:
          headerTitle || headerSubTitle || children,
      })}
      closeModal={closeModal}
      iconDescription={closeIconDescription}
      {...getDevtoolsProps('InterstitialScreenHeader')}
      {...rest}
    >
      {headerContent()}
    </ModalHeader>
  );
});

export default InterstitialScreenHeader;

InterstitialScreenHeader.propTypes = {
  /**
   * Provide the optional content for header section and will be render after header titles and before progress indicator.
   * People can make use of this if they want to have custom header.
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription: PropTypes.string,
  /**
   * Provide an optional sub title to be applied to the header >.
   */
  headerSubTitle: PropTypes.string,
  /**
   * Provide an optional title to be applied to the header >.
   */
  headerTitle: PropTypes.string,
  /**
   * Optional parameter to hide the progress indicator when multiple steps are used.
   */
  hideProgressIndicator: PropTypes.bool,
};
