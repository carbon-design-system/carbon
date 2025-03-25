/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  /**
   * Specify the children elements to be rendered inside of the <Portal>
   */
  children: ReactNode;
  /**
   * Provide a ref for a container node to render the portal
   */
  container?: React.RefObject<HTMLElement | null>;
}

/**
 * Helper component for rendering content within a portal. By default, the
 * portal will render into document.body. You can customize this behavior with
 * the `container` prop. Any `children` provided to this component will be
 * rendered inside of the container.
 */
function Portal({
  container,
  children,
}: PortalProps): React.ReactPortal | null {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMountNode(container ? container.current : document.body);
  }, [container]);

  if (mountNode) {
    return ReactDOM.createPortal(children, mountNode);
  }

  return null;
}

export { Portal };
