/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import * as colors from '@carbon/colors';
import { themes, formatTokenName } from '@carbon/themes';

const mountNode = document.getElementById('root');
function render(element) {
  ReactDOM.render(element, mountNode);
}

const colorNameLookup = Object.keys(colors).reduce(
  (acc, color) => ({
    ...acc,
    [colors[color]]: color,
  }),
  {}
);
const tokens = Object.keys(themes[Object.keys(themes)[0]]);

function App() {
  return (
    <React.Fragment>
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col">
            <h1>
              <code>@carbon/themes</code>
            </h1>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <ul>
              <li>
                <a href="#themes">Themes</a>
              </li>
              <li>
                <a href="#theming">Theming</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section id="themes">
        <div className="bx--grid">
          <header className="bx--row">
            <div className="bx--col">
              <h2>Themes</h2>
            </div>
          </header>
          <div className="bx--row">
            <div className="bx--col">
              <table>
                <thead>
                  <tr>
                    <th>Token</th>
                    {Object.keys(themes).map(theme => (
                      <th key={theme}>{theme} theme</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tokens.map(token => (
                    <tr key={token} id={token}>
                      <td>
                        <a href={`#${token}`}>
                          <pre>
                            <code>{formatTokenName(token)}</code>
                          </pre>
                        </a>
                      </td>
                      {Object.keys(themes).map(theme => {
                        const color = themes[theme][token];
                        return (
                          <td key={theme}>
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}>
                              <div
                                style={{
                                  width: 50,
                                  height: 50,
                                  background: color,
                                  outline: '1px solid #8a3ffc',
                                  marginRight: '1rem',
                                }}
                              />
                              <code>
                                {colorNameLookup[color]
                                  ? formatTokenName(colorNameLookup[color])
                                  : color}
                              </code>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section id="theming">
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col">
              <header>
                <h2>Theming</h2>
              </header>
            </div>
          </div>
          <div className="bx--row">
            <div className="bx--col">
              <article className="theming-example">
                <header>
                  <h3>Basic component theming</h3>
                </header>
                <div className="theming-example-preview">
                  <div className="my-component">My component</div>
                  <div className="theme">
                    <div className="my-component">My themed component</div>
                  </div>
                </div>
                <details>
                  <summary>Code</summary>
                  <pre>
                    <code>{`@mixin my-component() {
  .my-component {
    color: $interactive-02;
  }
}

// Include default \`$interactive-02\` styling
@include my-component();

// Include themed \`$interactive-02\` styling from g100 theme
@include carbon--theme($carbon--theme--g100) {
  .theme {
    @include my-component();
  }
}`}</code>
                  </pre>
                </details>
              </article>
            </div>
          </div>
          <div className="bx--row">
            <div className="bx--col">
              <article className="theming-example">
                <header>
                  <h3>Custom tokens</h3>
                </header>
                <div className="theming-example-preview">
                  <div className="my-custom-token-component">
                    My custom <span className="custom-token">token</span>{' '}
                    component
                  </div>
                  <div className="theme">
                    <div className="my-custom-token-component">
                      My custom <span className="custom-token">token</span>{' '}
                      component
                    </div>
                  </div>
                </div>
                <details>
                  <summary>Code</summary>
                  <pre>
                    <code>{`
$default-custom-theme: map-merge(
  $carbon--theme--white,
  (
    custom-token-01: #171717,
  )
);
$custom-token-01: map-get(
  $default-custom-theme,
  custom-token-01
) !default !global;

@mixin my-custom-token-component() {
  .my-custom-token-component {
    color: $interactive-01;
  }

  .my-custom-token-component .custom-token {
    color: $custom-token-01;
  }
}

@include my-custom-token-component();

@mixin custom-theme($theme: $default-custom-theme) {
  @include carbon--theme($theme) {
    $custom-token-01: map-get($theme, custom-token-01) !global;
    @content;
  }

  @if $theme != $default-custom-theme {
    @include custom-theme($default-custom-theme);
  }
}

$custom-theme: map-merge(
  $default-custom-theme,
  (
    interactive-01: #ee538b,
    custom-token-01: #8a3ffc,
  )
);

.theme {
  @include custom-theme($custom-theme) {
    @include my-custom-token-component();
  }
}
`}</code>
                  </pre>
                </details>
              </article>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

render(<App />);
