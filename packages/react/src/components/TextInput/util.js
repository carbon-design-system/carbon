const invalidProps = ({ invalid, errorId }) => ({
  'data-invalid': invalid,
  'aria-invalid': invalid,
  'aria-describedby': errorId,
});

const warnProps = ({ warnId }) => ({
  'aria-describedby': warnId,
});

export const textInputProps = ({
  invalid,
  sharedTextInputProps,
  errorId,
  warn,
  warnId,
}) => ({
  ...sharedTextInputProps,
  ...(invalid ? invalidProps({ invalid, errorId }) : {}),
  ...(!invalid && warn ? warnProps({ warnId }) : {}),
});
