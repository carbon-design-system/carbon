import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button';
import { Tools16, Stop16, Restart16 } from '@rocketsoftware/icons-react';

function renderActionButtons(type, onClick) {
  const stop = Stop16;
  const reboot = Restart16;
  const maintenance = Tools16;

  let svg;
  if (type === 'Stop') {
    svg = stop;
    return (
      <Button
        className="bx--resource-header__button"
        onClick={onClick}
        small
        renderIcon={svg}
        kind="ghost">
        {type}
      </Button>
    );
  } else if (type === 'Reboot') {
    svg = reboot;
    return (
      <Button
        className="bx--resource-header__button"
        onClick={onClick}
        renderIcon={svg}
        small
        kind="ghost">
        {type}
      </Button>
    );
  } else if (type === 'Maintenance') {
    svg = maintenance;
    return (
      <Button
        className="bx--resource-header__button"
        onClick={onClick}
        small
        renderIcon={svg}
        kind="ghost">
        {type}
      </Button>
    );
  }
}

// function renderTitleStatus() {
//   return (
//     <div className="bx--resource-header__status-item bx--resource-header__status-item--active">
//       Active
//     </div>
//   );
// }

function renderStatus(status) {
  return status.map((item, i) => {
    const statusClasses = classNames(
      {
        'bx--resource-header__status-item--active': item.isTrue,
      },
      'bx--resource-header__status-item'
    );

    return (
      <div key={i} className={statusClasses}>
        {item.text}
      </div>
    );
  });
}

const ResourceHeader = ({
  className,
  icon,
  isActive,
  renderActions,
  renderBreadcrumbs,
  renderMaintenance,
  renderReboot,
  renderStop,
  status,
  subtitle,
  title,
  // ...other
}) => {
  const resourceHeaderClasses = classNames('bx--resource-header', className);

  return (
    <header className={resourceHeaderClasses}>
      <section className="bx--resource-header__container">
        <div className="bx--resource-header__container--left">
          {renderBreadcrumbs && renderBreadcrumbs()}
          <div className="bx--resource-header__content-container">
            {icon && <div className="bx--resource-header__icon">{icon}</div>}
            <div className="bx--resource-header__content">
              {title && (
                <div className="bx--resource-header__title">
                  <h3>{title}</h3>
                  {isActive && (
                    <div className="bx--resource-header__status-item bx--resource-header__status-item--active">
                      Active
                    </div>
                  )}
                </div>
              )}
              <div className="bx--resource-header__subtitle">
                {subtitle &&
                  subtitle.map((item, key) => (
                    <span key={key}>{item} &nbsp;</span>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bx--resource-header__container--right">
          <div className="bx--resource-header__status">
            <div>
            {status && renderStatus(status)}
            </div>
          </div>
          <div className="bx--resource-header__actions">
            {renderStop && renderActionButtons('Stop', renderStop)}
            {renderReboot && renderActionButtons('Reboot', renderReboot)}
            {renderMaintenance &&
              renderActionButtons('Maintenance', renderMaintenance)}
            {renderActions && renderActions()}
          </div>
        </div>
      </section>
    </header>
  );
};

ResourceHeader.propTypes = {
  /**
   * The CSS class names of the resource header
   */
  className: PropTypes.string,
  /**
   * The icon to be rendered in the header.
   */
  icon: PropTypes.node,
  /**
   * `true` to show the status text next to the resource header title.
   */
  isActive: PropTypes.bool,
  /**
   * The function used to create and show an action dropdown.
   */
  renderActions: PropTypes.func,
  /**
   * The function used to create and show breadcrumbs.
   */
  renderBreadcrumbs: PropTypes.func,
  /**
   * The function used to show and attach actions to the maintenance icon
   */
  renderMaintenance: PropTypes.func,
  /**
   * The function used to show and attach actions to the reboot icon
   */
  renderReboot: PropTypes.func,
  /**
   * The function used to show and attach actions to the stop icon
   */
  renderStop: PropTypes.func,
  /**
   * The array used to show status text above the action icons
   */
  status: PropTypes.array,
  /**
   * The array used to show subtitle text below the resource header title
   */
  subtitle: PropTypes.array,
  /**
   * The title of the resource header
   */
  title: PropTypes.string,
};

export default ResourceHeader;
