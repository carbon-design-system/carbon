import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'carbon-components-react';
import classnames from 'classnames';

import CodeExample from '../CodeExample/CodeExample';

/**
 * The UI to show live code as well as its source.
 */
const ComponentExample = ({ htmlFile, component, variant, codepenSlug, hideViewFullRender }) => {
  const classNames = classnames({
    'component-example__live--rendered': true,
    [component]: true,
  });

  const lightUIclassnames = classnames({
    'component-example': true,
    'bx--global-light-ui': component === 'tabs',
  });

  const codepenLink = codepenSlug && `https://codepen.io/team/carbon/full/${codepenSlug}/`;
  const componentLink = variant ? `/component/${component}/${variant}` : `/component/${component}`;

  const viewFullRender = hideViewFullRender ? null : (
    <Link className="component-example__view-full-render" target="_blank" href={codepenLink || componentLink}>
      {codepenLink ? 'View on CodePen' : 'View full render'}
    </Link>
  );

  return (
    <div className={lightUIclassnames}>
      <div className="svg--sprite" aria-hidden="true" />
      <div className="component-example__live">
        <iframe
          className={classNames}
          data-role="window"
          src={componentLink}
          sandbox="allow-same-origin allow-scripts allow-forms"
          marginWidth="0"
          marginHeight="0"
          frameBorder="0"
          vspace="0"
          hspace="0"
          scrolling="yes"
        />
        {viewFullRender}
      </div>
      <CodeExample htmlFile={htmlFile} />
    </div>
  );
};

ComponentExample.propTypes = {
  /**
   * The source code.
   */
  htmlFile: PropTypes.string,

  /**
   * The component name.
   */
  component: PropTypes.string,

  /**
   * The component variant name.
   */
  variant: PropTypes.string,

  /**
   * `true` to hide "view full render" link.
   */
  hideViewFullRender: PropTypes.bool,

  /**
   * The slug of the CodePen link.
   */
  codepenSlug: PropTypes.string,
};

export default ComponentExample;
