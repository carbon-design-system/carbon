import PropTypes from 'prop-types';
import React from 'react';
import { CodeSnippet } from 'carbon-components-react';

const TypeSpec = ({ children, token, description }) => {
  return (
    <div className="bx--row type-spec">
      <div className="type-spec__example bx--offset-lg-4 bx--col-lg-8 bx--col-md-5">
        <div className={`bx--type-${token}`}>{description}</div>
      </div>
      <div className="type-spec__details bx--col-lg-4 bx--col-md-3">
        <h4>{token}</h4>
        <div>{children}</div>
        <CodeSnippet type="inline">${token}</CodeSnippet>
      </div>
    </div>
  );
};

TypeSpec.propTypes = {
  /**
   * Token name
   */
  token: PropTypes.string,

  /**
   * Sample text and description
   */
  description: PropTypes.string,
};

export default TypeSpec;
