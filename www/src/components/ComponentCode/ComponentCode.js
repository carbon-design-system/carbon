import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { Link } from 'gatsby';
import { Link20 } from '@carbon/icons-react';
import ComponentExample from '../ComponentExample/ComponentExample';

export default class ComponentCode extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    component: PropTypes.string,
    variation: PropTypes.string,
    codepen: PropTypes.string,
    background: PropTypes.string,
    hasLightVersion: PropTypes.bool,
    hasReactVersion: PropTypes.bool,
    hasAngularVersion: PropTypes.string,
    hasVueVersion: PropTypes.string,
    experimental: PropTypes.bool,
  };

  render() {
    const {
      component,
      name,
      codepen,
      hasLightVersion,
      hasReactVersion,
      hasAngularVersion,
      hasVueVersion,
      variation,
      experimental,
    } = this.props;

    let htmlFile;
    if (experimental) {
      try {
        htmlFile = require(`../../html/${component}/${variation}.html`);
      } catch (err) {} // eslint-disable-line no-empty
    }
    if (!htmlFile) {
      htmlFile = require(`carbon-components/html/${component}/${variation}.html`);
    }

    return (
      <Location>
        {({ location }) => {
          const hash = name
            .replace(/[^\w\s$*_+~.()'"!\-:@]/g, '')
            .toLowerCase()
            .split(' ')
            .join('-');
          const path = location.pathname;

          return (
            <>
              <div className="bx--row">
                <div className="bx--col-lg-12 bx--offset-lg-4">
                  <h2 id={hash} className="page-h2">
                    {hash && (
                      <Link className="anchor-link" to={`${path}#${hash}`}>
                        <Link20
                          className="anchor-link__icon"
                          aria-label="Anchor Link"
                        />
                      </Link>
                    )}
                    {name}
                  </h2>
                </div>
              </div>

              <div className="component-variation bx--row">
                <div className="bx--col-lg-12 bx--offset-lg-4 bx--no-gutter">
                  <ComponentExample
                    codepenSlug={codepen}
                    component={component}
                    variation={variation}
                    htmlFile={htmlFile}
                    hideViewFullRender={this.props.hideViewFullRender}
                    hasLightVersion={hasLightVersion}
                    hasReactVersion={hasReactVersion}
                    hasAngularVersion={hasAngularVersion}
                    hasVueVersion={hasVueVersion}
                    experimental={experimental}
                  />
                </div>
              </div>
            </>
          );
        }}
      </Location>
    );
  }
}
