/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This can be used if there is NO need for "ref"
export type PolymorphicComponentProp<
  C extends React.ElementType,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- https://github.com/carbon-design-system/carbon/issues/20452
  Props = {},
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is the type for the "ref" only
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

// This is a new type utility with ref!
export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- https://github.com/carbon-design-system/carbon/issues/20452
  Props = {},
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };
