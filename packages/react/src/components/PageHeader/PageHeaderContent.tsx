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
  useRef,
  RefObject,
} from 'react';
import { useId } from '../../internal/useId';
import classnames from 'classnames';
import { Column, Grid } from '../Grid';
import { Section, Heading } from '../Heading';
import { blockClass } from './utils';
import { usePageHeader, type PageHeaderObserverState } from './context';
import { TruncatedText } from '../TruncatedText';

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
   * The PageHeaderContent's title. Accepts a string or ReactNode.
   * If a string is provided, TruncatedText is used with automatic overflow handling.
   */
  title: React.ReactNode;
  /**
   * Specify the element or component used to render the title.
   */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | typeof Heading;
  /**
   * Specify the maximum number of lines the title can span before truncating.
   */
  titleTruncate?: number;
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
    titleAs: TitleTag = 'h1',
    titleTruncate,
    renderIcon: IconElement,
    contextualActions,
    pageActions,
    ...other
  }: PageHeaderContentProps,
  ref
) {
  const contentRef = useRef<HTMLDivElement>(null);
  const componentRef = (ref ?? contentRef) as RefObject<HTMLDivElement>;
  const {
    setRefs,
    setPageActionsInstance,
    observerState,
    fullWidthGrid,
    narrowGrid,
  } = usePageHeader();
  const classNames = classnames(
    {
      [`${blockClass}__content`]: true,
    },
    className
  );
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleLines = titleTruncate ?? (contextualActions ? 1 : 2);
  const truncatedTextId = useId(`${blockClass}__content__title__truncatedText`);

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

  return (
    <Section as="div" className={classNames} ref={componentRef} {...other}>
      <Grid fullWidth={!!fullWidthGrid} narrow={narrowGrid}>
        <Column lg={16} md={8} sm={4}>
          <div className={`${blockClass}__content__title-wrapper`}>
            <div className={`${blockClass}__content__start`}>
              <div className={`${blockClass}__content__title-container`}>
                {IconElement && (
                  <div
                    className={`${blockClass}__content__icon`}
                    aria-hidden="true">
                    <IconElement />
                  </div>
                )}

                <TitleTag
                  ref={titleRef}
                  className={`${blockClass}__content__title`}>
                  {typeof title === 'string' ? (
                    <TruncatedText
                      id={truncatedTextId}
                      className={`${blockClass}__content__title-text`}
                      align="bottom"
                      value={title}
                      lines={titleLines}
                      type="tooltip"
                    />
                  ) : (
                    <span className={`${blockClass}__content__title-text`}>
                      {title}
                    </span>
                  )}
                </TitleTag>
              </div>
              {contextualActions && (
                <div className={`${blockClass}__content__contextual-actions`}>
                  {contextualActions}
                </div>
              )}
            </div>
            {typeof pageActions === 'function'
              ? pageActions(observerState)
              : pageActions}
          </div>
          {children}
        </Column>
      </Grid>
    </Section>
  );
});

PageHeaderContent.displayName = 'PageHeaderContent';
