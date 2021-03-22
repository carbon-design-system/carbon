import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect on the client, useEffect on the server
const useIsomorphicEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicEffect;
