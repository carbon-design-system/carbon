const invalidProps = (invalidId) => ({
  'data-invalid': true,
  'aria-invalid': true,
  'aria-describedby': invalidId,
});

const warnProps = (warnId) => ({
  'aria-describedby': warnId,
});

const helperProps = (helperId) => ({
  'aria-describedby': helperId,
});

export const textInputProps = ({
  sharedTextInputProps,
  invalid,
  invalidId,
  warn,
  warnId,
  hasHelper,
  helperId,
}) => ({
  ...sharedTextInputProps,
  ...(invalid ? invalidProps(invalidId) : {}),
  ...(warn ? warnProps(warnId) : {}),
  ...(hasHelper ? helperProps(helperId) : {}),
});
