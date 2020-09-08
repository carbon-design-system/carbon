import { getPropSpec } from './propUtils';

export default function isValidOption(option) {
  /* istanbul ignore next */
  const arrOpts = Array.isArray(option) ? option : [option];

  for (const opt of arrOpts) {
    if (!getPropSpec(opt)) {
      // eslint-disable-next-line no-console
      console.warn(
        `Invalid option supplied, expect regular expression or string. "${opt}"`
      );

      return false;
    }
  }

  return true;
}
