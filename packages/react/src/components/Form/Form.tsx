/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type ComponentProps, useEffect } from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface FormProps extends ComponentProps<'form'> {
  /**
   * WebMCP: Clearly name the tool, based on its purpose
   */
  toolName?: string;

  /**
   * WebMCP: Describe what action the tool takes and its purpose
   */
  toolDescription?: string;

  /**
   * WebMCP: Event handler called when an AI agent activates the tool
   */
  onToolactivated?: (event: Event & { toolName: string }) => void;

  /**
   * WebMCP: Event handler called when a user cancels the agentic operation
   */
  onToolcancel?: (event: Event & { toolName: string }) => void;
}

export default function Form({
  className,
  children,
  toolName,
  toolDescription,
  onToolactivated,
  onToolcancel,
  ...other
}: Readonly<FormProps>) {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--form`, className);
  const formRef = React.useRef<HTMLFormElement>(null);

  // Set up event listeners for WebMCP events
  useEffect(() => {
    const handleToolactivated = (event: Event) => {
      if (onToolactivated) {
        onToolactivated(event as Event & { toolName: string });
      }
    };

    const handleToolcancel = (event: Event) => {
      if (onToolcancel) {
        onToolcancel(event as Event & { toolName: string });
      }
    };

    // Add event listeners to window as per WebMCP spec
    if (onToolactivated) {
      window.addEventListener('toolactivated', handleToolactivated);
    }
    if (onToolcancel) {
      window.addEventListener('toolcancel', handleToolcancel);
    }

    return () => {
      if (onToolactivated) {
        window.removeEventListener('toolactivated', handleToolactivated);
      }
      if (onToolcancel) {
        window.removeEventListener('toolcancel', handleToolcancel);
      }
    };
  }, [onToolactivated, onToolcancel]);

  return (
    <form
      ref={formRef}
      className={classNames}
      {...(toolName && { toolname: toolName })}
      {...(toolDescription && { tooldescription: toolDescription })}
      {...other}>
      {children}
    </form>
  );
}

Form.propTypes = {
  /**
   * Provide children to be rendered inside of the <form> element
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied on the containing <form> node
   */
  className: PropTypes.string,

  /**
   * WebMCP: Event handler called when a user cancels the agentic operation
   */
  onToolcancel: PropTypes.func,

  /**
   * WebMCP: Event handler called when an AI agent activates the tool
   */
  onToolactivated: PropTypes.func,

  /**
   * WebMCP: Describe what action the tool takes and its purpose
   */
  toolDescription: PropTypes.string,

  /**
   * WebMCP: Clearly name the tool, based on its purpose
   */
  toolName: PropTypes.string,
};
