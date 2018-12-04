import React from 'react';
import { colors, tokens } from '../../../../es';

function Table({ children }) {
  return (
    <table>
      <thead>
        <th>Token</th>
        <th>Value</th>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function Code({ children }) {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}

export default function App() {
  return (
    <main>
      <h1>Basic example</h1>
      <ul>
        <li>
          <a href="#colors">Colors</a>
        </li>
        <li>
          <a href="#tokens">Tokens</a>
        </li>
      </ul>
      <section id="colors">
        <header>
          <h2>All colors</h2>
        </header>
        <Table>
          {Object.keys(colors).map(key => (
            <tr key={key}>
              <td>
                <Code>{key}</Code>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: colors[key],
                      marginRight: '0.5rem',
                      outline: '1px solid #8a3ffc',
                    }}
                  />
                  {colors[key]}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </section>
      <section id="tokens">
        <header>
          <h2>Tokens</h2>
        </header>
        <Table>
          {Object.keys(tokens).map(key => (
            <tr key={key}>
              <td>
                <Code>{key}</Code>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: tokens[key],
                      marginRight: '0.5rem',
                      outline: '1px solid #8a3ffc',
                    }}
                  />
                  {tokens[key]}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </section>
    </main>
  );
  return 'App!';
}
