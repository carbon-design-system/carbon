import { useMemo } from 'react';

/**
 * @param {string} id A user-specified unique ID. If present, ID won't be
 * auto-generated and the given one will be used.
 * @returns {string} The auto-generated unique ID.
 */
const useUniqueId = (id) => {
  const uniqueId = useMemo(() => Math.random().toString(36).slice(2), []);
  return id || uniqueId;
};

export default useUniqueId;
