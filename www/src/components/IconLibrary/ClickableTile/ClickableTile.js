import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ClickableTile } from 'carbon-components-react';
import { Launch20 } from '@carbon/icons-react';
import { ArrowRight24 } from '@carbon/icons-react';

export default class ClickTile extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    titleLarge: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    excerpt: PropTypes.string,
    dark: PropTypes.string,
    actionIcon: PropTypes.string,
  };

  render() {
    const {
      children,
      href,
      date,
      author,
      title,
      titleLarge,
      type,
      description,
      excerpt,
      dark,
      actionIcon,
    } = this.props;

    const classNames = classnames({
      tile: true,
      'tile--resource': type === 'resource',
      'tile--article': type === 'article',
      'tile--dark': dark,
    });

    if (type === 'resource') {
      return (
        <div className={classNames}>
          <div className="bx--aspect-ratio bx--aspect-ratio--2x1">
            <div className="bx--aspect-ratio--object">
              <ClickableTile
                target="_blank"
                rel="noopener noreferrer"
                href={href}>
                <div className="tile__info">
                  <h5>
                    {title}
                    {titleLarge ? (
                      <span className="tile__info-title-large">
                        {titleLarge}
                      </span>
                    ) : null}
                  </h5>

                  <div className="tile__caption">
                    {description ? (
                      <p className="tile__description">{description}</p>
                    ) : null}
                    {author ? <p className="tile__author">{author}</p> : null}
                    {date ? <p className="tile__date">{date}</p> : null}
                  </div>
                </div>
                <div className="tile__img">{children}</div>
                <div className="tile__link-icon">
                  {actionIcon === 'arrowRight' ? (
                    <ArrowRight24 aria-label="Open resource" />
                  ) : (
                    <Launch20 aria-label="Open resource" />
                  )}
                </div>
              </ClickableTile>
            </div>
          </div>
        </div>
      );
    }

    if (type !== 'resource') {
      return (
        <ClickableTile
          target="_blank"
          rel="noopener noreferrer"
          className={classNames}
          href={href}>
          <div className="tile__img">{children}</div>
          <div className="bx--aspect-ratio bx--aspect-ratio--2x1">
            <div className="bx--aspect-ratio--object">
              <div className="tile__info ">
                <div className="tile__info-title ">
                  <h5>{title}</h5>
                </div>
                <div className="tile__caption">
                  {author ? <p className="tile__author">{author}</p> : null}
                  {date ? <p className="tile__date">{date}</p> : null}
                  {excerpt ? <p className="tile__excerpt">{excerpt}</p> : null}
                </div>
              </div>
            </div>
          </div>
        </ClickableTile>
      );
    }
  }
}
