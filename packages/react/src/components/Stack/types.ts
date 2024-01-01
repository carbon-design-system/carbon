import { SPACING_STEPS } from './definitions';

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Provide a custom element type to render as the outermost element in
   * the Stack component. By default, this component will render a `div`.
   */
  as?: (() => React.ReactNode) | string | React.ElementType;

  /**
   * Provide the elements that will be rendered as children inside of the Stack
   * component. These elements will have having spacing between them according
   * to the `step` and `orientation` prop
   */
  children?: React.ReactNode;

  /**
   * Provide a custom class name to be used by the outermost element rendered by
   * Stack
   */
  className?: string;

  /**
   * Provide either a custom value or a step from the spacing scale to be used
   * as the gap in the layout
   */
  gap?: string | (typeof SPACING_STEPS)[number];

  /**
   * Specify the orientation of them items in the Stack
   */
  orientation?: 'horizontal' | 'vertical';
}
