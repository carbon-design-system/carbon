/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren } from 'react';
import { ReactAttr } from '../../types/common';

type RenderAsExcludedProps<BaseProps> = 'as' | keyof BaseProps;

type RenderAsDefaultProps<BaseProps> = BaseProps & {
  as?: undefined;
} & Omit<ReactAttr<HTMLDivElement>, RenderAsExcludedProps<BaseProps>>;

type RenderAsIntrinsicProps<
  BaseProps,
  K extends keyof JSX.IntrinsicElements
> = BaseProps & {
  as: K;
} & Omit<JSX.IntrinsicElements[K], RenderAsExcludedProps<BaseProps>>;

type PropsWithClassName<P> = P & { className?: string };
type PropsWithClassNameAndChildren<P> = PropsWithChildren<
  PropsWithClassName<P>
>;

type RenderAsCustomComponentProps<BaseProps, T> =
  T extends React.JSXElementConstructor<
    infer P extends PropsWithClassNameAndChildren<any>
  >
    ? BaseProps & {
        as: React.JSXElementConstructor<P>;
      } & Omit<P, RenderAsExcludedProps<BaseProps>>
    : never;

export type RenderAsProps<BaseProps, T> =
  | RenderAsDefaultProps<BaseProps>
  | (T extends keyof JSX.IntrinsicElements
      ? RenderAsIntrinsicProps<BaseProps, T>
      : RenderAsCustomComponentProps<BaseProps, T>);
