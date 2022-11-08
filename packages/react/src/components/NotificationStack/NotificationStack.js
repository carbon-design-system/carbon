/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ToastNotification } from '../Notification';
import { useNotification } from '../../internal/useNotification/useNotification';
import { usePrefix } from '../../internal/usePrefix';

/**
 * Component to wrapper the notification children
 * Used for update the element height
 */
const NotificationWrapper = ({
  children,
  className,
  style,
  id,
  onHeightUpdate,
}) => {
  const [height, setHeight] = React.useState();
  const ref = React.useCallback(
    (el) => {
      if (el) {
        const updateHeight = () => {
          const height = el.firstChild.getBoundingClientRect().height;
          setHeight(height);
          onHeightUpdate(id, height);
        };
        updateHeight();
      }
    },
    [id, onHeightUpdate]
  );

  return (
    <div ref={ref} className={className} style={{ ...style, height }}>
      {children}
    </div>
  );
};
NotificationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  onHeightUpdate: PropTypes.func.isRequired,
  style: PropTypes.object,
};
NotificationWrapper.defaultProps = {
  className: null,
  style: null,
};

/**
 * NotificationStack component
 */
const NotificationStack = ({ className }) => {
  const prefix = usePrefix();
  const { notifications, handlers } = useNotification();

  return (
    <div className={cx(`${prefix}-stack-notif-container`, className)}>
      {notifications?.map((notif) => {
        return !notif.destroyed ? (
          <NotificationWrapper
            id={notif.id}
            key={notif.id}
            onHeightUpdate={handlers.updateHeight}
            className={cx(`${prefix}-stack-notif-container--inner-container`, {
              [`${prefix}-stack-notif-container--inner-container--open`]: notif.isOpen,
            })}
          >
            <ToastNotification
              className={cx('inner-toast', {
                'inner-toast--open': notif.isOpen,
                'inner-toast--closed': notif.isOpen === false,
              })}
              onTransitionEnd={(e) => {
                // Check if the transition that ended is the one that happens when the notification
                //  is closed. If that's the case, destroy the notification afterwards.
                if (
                  Array.from(e.target.classList).includes('inner-toast') &&
                  e.propertyName === 'transform' &&
                  !Array.from(e.target.classList).includes(
                    'inner-toast--open'
                  ) &&
                  !notif.destroyed
                ) {
                  handlers.destroyNotification(notif.id);
                }
              }}
              kind={notif.kind}
              title={notif.title}
              subtitle={notif.subtitle}
              caption={notif.caption}
              lowContrast={!!notif.lowContrast}
              onClose={() => false}
              onCloseButtonClick={(e) => {
                if (notif.onCloseButtonClick) {
                  notif.onCloseButtonClick(e);
                }
                handlers.closeNotification(notif.id);
              }}
              iconDescription={notif.iconDescription}
              hideCloseButton={notif.hideCloseButton}
              role={notif.role}
            >
              {notif.children}
            </ToastNotification>
          </NotificationWrapper>
        ) : null;
      })}
    </div>
  );
};
NotificationStack.propTypes = {
  className: PropTypes.string,
};
NotificationStack.defaultProps = { className: null };
export default NotificationStack;
