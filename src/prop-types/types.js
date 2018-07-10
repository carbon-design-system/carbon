import { oneOf } from 'prop-types';

export const ButtonTypes = {
  buttonKind: oneOf([
    'primary',
    'secondary',
    'danger',
    'ghost',
    'danger--primary',
    'tertiary',
  ]),
};
