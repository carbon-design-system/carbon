import { settings } from 'carbon-components';
import React from 'react';

export const PrefixContext = React.createContext(settings.prefix);

export function usePrefix() {
  return React.useContext(PrefixContext);
}

