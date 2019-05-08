const invalidProps = ({ invalid, errorId }) => ({
  'data-invalid': invalid,
  'aria-invalid': invalid,
  'aria-describedby': errorId,
});

export const textInputProps = ({ invalid, sharedTextInputProps, errorId }) => ({
  ...sharedTextInputProps,
  ...(invalid ? invalidProps({ invalid, errorId }) : {}),
});
