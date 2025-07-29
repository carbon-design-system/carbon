import React from 'react';
import Button, { type ButtonProps } from '../Button';
import { eduColors } from '../../tokens/edu-tokens';

export interface EduButtonProps extends ButtonProps {
  /** Custom inline style */
  style?: React.CSSProperties;
}

const EduButton = React.forwardRef<HTMLButtonElement, EduButtonProps>(
  function EduButton({ style, ...rest }, ref) {
    const defaultStyle = {
      backgroundColor: eduColors.primary,
      color: eduColors.onPrimary,
    } as React.CSSProperties;
    return <Button ref={ref} style={{ ...defaultStyle, ...style }} {...rest} />;
  }
);

EduButton.displayName = 'EduButton';

export default EduButton;
