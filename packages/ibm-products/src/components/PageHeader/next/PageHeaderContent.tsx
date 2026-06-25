/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  type ComponentType,
  type FunctionComponent,
  useEffect,
  useState,
  useRef,
  RefObject,
} from 'react';
import { useIsomorphicEffect } from '../../../global/js/hooks';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Column,
  DefinitionTooltip,
  Grid,
  unstable_Text as Text,
  Section,
  Heading,
} from '@carbon/react';
import { blockClass } from '../PageHeaderUtils';
import { usePageHeader, type PageHeaderObserverState } from './context';

/**
 * -----------------
 * PageHeaderContent
 * -----------------
 */
export interface PageHeaderContentProps {
  /**
   * Provide child elements to be rendered inside PageHeaderContent.
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be added to your PageHeaderContent
   */
  className?: string;
  /**
   * Provide an optional icon to render in front of the PageHeaderContent's title.
   */
  renderIcon?: ComponentType | FunctionComponent;
  /**
   * The PageHeaderContent's title
   */
  title: string;
  /**
   * Specify the element or component used to render the title.
   */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | typeof Heading;
  /**
   * The PageHeaderContent's contextual actions
   */
  contextualActions?: React.ReactNode;
  /**
   * The PageHeaderContent's page actions.
   * Can be a ReactNode or a function that receives observer state.
   */
  pageActions?:
    | React.ReactNode
    | ((state: PageHeaderObserverState) => React.ReactNode);
}

export const PageHeaderContent = React.forwardRef<
  HTMLDivElement,
  PageHeaderContentProps
>(function PageHeaderContent(
  {
    className,
    children,
    title,
    titleAs = 'h1',
    renderIcon: IconElement,
    contextualActions,
    pageActions,
    ...other
  }: PageHeaderContentProps,
  ref
) {
  const contentRef = useRef<HTMLDivElement>(null);
  const componentRef = (ref ?? contentRef) as RefObject<HTMLDivElement>;
  const { setRefs, setPageActionsInstance } = usePageHeader();
  const classNames = classnames(
    {
      [`${blockClass}__content`]: true,
    },
    className
  );
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (componentRef?.current) {
      setRefs((prev) => ({ ...prev, contentRef: componentRef, titleRef }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof pageActions === 'function') {
      setPageActionsInstance(() => pageActions);
    } else {
      setPageActionsInstance(pageActions ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageActions]);

  const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

  const isEllipsisActive = (element: HTMLHeadingElement) => {
    setIsEllipsisApplied(element.offsetHeight < element.scrollHeight);
    return element.offsetHeight < element.scrollHeight;
  };

  useIsomorphicEffect(() => {
    titleRef.current && isEllipsisActive(titleRef.current);
  }, [title]);

  return (
    <Section as="div" className={classNames} ref={componentRef} {...other}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className={`${blockClass}__content__title-wrapper`}>
            <div className={`${blockClass}__content__start`}>
              <div className={`${blockClass}__content__title-container`}>
                {IconElement && (
                  <div className={`${blockClass}__content__icon`}>
                    <IconElement />
                  </div>
                )}

                {isEllipsisApplied ? (
                  <DefinitionTooltip definition={title}>
                    <Text
                      ref={titleRef}
                      as={titleAs}
                      className={`${blockClass}__content__title`}
                    >
                      {title}
                    </Text>
                  </DefinitionTooltip>
                ) : (
                  <Text
                    ref={titleRef}
                    as={titleAs}
                    className={`${blockClass}__content__title`}
                  >
                    {title}
                  </Text>
                )}
              </div>
              {contextualActions && (
                <div className={`${blockClass}__content__contextual-actions`}>
                  {contextualActions}
                </div>
              )}
            </div>
            {typeof pageActions === 'function'
              ? pageActions({
                  fullyCollapsed: false,
                  titleClipped: false,
                  contentActionsClipped: false,
                })
              : pageActions}
          </div>
          {children}
        </Column>
      </Grid>
    </Section>
  );
});

PageHeaderContent.displayName = 'PageHeaderContent';

PageHeaderContent.propTypes = {
  /**
   * Provide child elements to be rendered inside PageHeaderContent.
   */
  children: PropTypes.node,
  /**
   * Specify an optional className to be added to your PageHeaderContent
   */
  className: PropTypes.string,
  /**
   * The PageHeaderContent's contextual actions
   */
  contextualActions: PropTypes.node,
  /**
   * The PageHeaderContent's page actions
   */
  pageActions: PropTypes.node,
  /**
   * Provide an optional icon to render in front of the PageHeaderContent's title.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * The PageHeaderContent's subtitle
   */
  subtitle: PropTypes.string,
  /**
   * The PageHeaderContent's title
   */
  title: PropTypes.string.isRequired,
  /**
   * Specify the element or component used to render the title.
   */
  titleAs: PropTypes.oneOfType([
    PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    PropTypes.elementType,
  ]),
};
