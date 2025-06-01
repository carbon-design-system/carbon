import React, {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { usePresence } from './usePresence';

type PresenceProps = { open: boolean };

export const Presence = ({
  children,
  ...props
}: PropsWithChildren<PresenceProps>) => {
  const parentContextValue = usePresenceContext();

  if (parentContextValue) {
    return (
      <PresenceContext.Provider value={parentContextValue}>
        {children}
      </PresenceContext.Provider>
    );
  }

  return <PresenceInner {...props}>{children}</PresenceInner>;
};

type PresenceContextType<T extends HTMLElement = HTMLDivElement> = {
  presenceRef: RefObject<T | null>;
  isExiting: boolean;
};
const PresenceContext = createContext<PresenceContextType>(
  undefined as unknown as PresenceContextType
);
export const usePresenceContext = <T extends HTMLElement = HTMLDivElement>() =>
  useContext(PresenceContext) as unknown as PresenceContextType<T>;

const PresenceInner = ({
  open,
  children,
}: PropsWithChildren<PresenceProps>) => {
  const presenceRef = useRef<HTMLDivElement>(null);
  const [isPresent, isExiting] = usePresence(presenceRef, open);

  const contextValue = useMemo(
    () => ({
      presenceRef,
      isExiting,
    }),
    [isExiting]
  );

  if (!isPresent) return null;

  return (
    <PresenceContext.Provider value={contextValue}>
      {children}
    </PresenceContext.Provider>
  );
};
