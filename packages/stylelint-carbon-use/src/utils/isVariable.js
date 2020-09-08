import { TOKEN_TYPES } from './tokenizeValue';

export default function isVariable(val) {
  if (typeof val === 'string') {
    return (
      val !== undefined &&
      (val.startsWith('$') || val.startsWith('--') || val.startsWith('var(--'))
    );
  } else {
    // is tokenized
    if (val.type === TOKEN_TYPES.SCSS_VAR) {
      return true;
    } else {
      return val.type === TOKEN_TYPES.FUNCTION && val.value === 'var';
    }
  }
}
