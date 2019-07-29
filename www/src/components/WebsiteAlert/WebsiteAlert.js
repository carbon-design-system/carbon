import React from 'react';
import { ArrowRight20, Information20 } from '@carbon/icons-react';
import { Link } from 'gatsby';

export default class WebsiteAlert extends React.Component {
  render() {
    const { alertTitle, alertDescription, buttonText, buttonTo } = this.props;
    return (
      <aside aria-label="alert banner" className="website-alert">
        <Information20 className="website-alert__icon" />
        <p className="website-alert__text">
          <span>{alertTitle}</span>
          <span /> <span>{alertDescription}</span>
        </p>
        <Link className="website-alert__button" tabIndex="-1" to={buttonTo}>
          <button
            className="bx--btn bx--btn--secondary bx--btn--sm"
            type="button">
            <span>{buttonText}</span>
            <ArrowRight20 />
          </button>
        </Link>
      </aside>
    );
  }
}
