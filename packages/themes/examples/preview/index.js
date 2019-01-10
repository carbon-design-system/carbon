/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import * as colors from '@carbon/colors';
import { themes } from '@carbon/themes';

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
      <h1>Preview</h1>
      <section>
        <h2>Themes</h2>
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
              <tr key={token}>
                <td>
                  <pre>
                    <code>{token}</code>
                  </pre>
                </td>
                {Object.keys(themes).map(theme => {
                  const color = themes[theme][token];
                  return (
                    <td key={theme}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                          style={{
                            width: 50,
                            height: 50,
                            background: color,
                            outline: '1px solid #8a3ffc',
                            marginRight: '1rem',
                          }}
                        />
                        {colorNameLookup[color] || color}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  );
}

render(<App />);
