import { PrefixContext } from '../../internal/usePrefix';
import React from 'react';

export const LowerHandle = () => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--lower`}>
        <path d="M15.08 6.46H16v11.08h-.92zM4.46 17.54c-.25 0-.46-.21-.46-.46V6.92a.465.465 0 0 1 .69-.4l8.77 5.08a.46.46 0 0 1 0 .8l-8.77 5.08c-.07.04-.15.06-.23.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);

export const LowerHandleFocus = () => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--lower ${prefix}--slider__thumb-icon--focus`}>
        <path d="M15.08 6.46H16v11.08h-.92zM4.46 17.54c-.25 0-.46-.21-.46-.46V6.92a.465.465 0 0 1 .69-.4l8.77 5.08a.46.46 0 0 1 0 .8l-8.77 5.08c-.07.04-.15.06-.23.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
        <path d="M15.08 0H16v6.46h-.92z" />
        <path d="M0 0h.92v24H0zM15.08 0H16v24h-.92z" />
        <path d="M0 .92V0h16v.92zM0 24v-.92h16V24z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);

export const UpperHandle = () => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--upper`}>
        <path d="M0 6.46h.92v11.08H0zM11.54 6.46c.25 0 .46.21.46.46v10.15a.465.465 0 0 1-.69.4L2.54 12.4a.46.46 0 0 1 0-.8l8.77-5.08c.07-.04.15-.06.23-.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);

export const UpperHandleFocus = () => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--upper ${prefix}--slider__thumb-icon--focus`}>
        <path d="M0 6.46h.92v11.08H0zM11.54 6.46c.25 0 .46.21.46.46v10.15a.465.465 0 0 1-.69.4L2.54 12.4a.46.46 0 0 1 0-.8l8.77-5.08c.07-.04.15-.06.23-.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
        <path d="M.92 24H0v-6.46h.92z" />
        <path d="M16 24h-.92V0H16zM.92 24H0V0h.92z" />
        <path d="M16 23.08V24H0v-.92zM16 0v.92H0V0z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);
