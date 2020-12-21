import 'url-polyfill';

import { getAttributes, toString } from '@carbon/icon-helpers';
import Prism from 'prismjs';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import metadata from '../../metadata.json';

const GITHUB_ICON_URL =
  'https://github.com/carbon-design-system/carbon/tree/master/packages/icons/src/svg';

function App({ metadata }) {
  const headers = ['Name', 'Size', 'Preview', 'GitHub', 'Issues', 'Path'];

  return (
    <React.Fragment>
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col">
            <h1>Icons</h1>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-md-6 bx--col-lg-6">
            <h2>Usage</h2>
            <p>
              Icons in Carbon are now provided through a set of packages that
              let you use icons in various frameworks. We currently support:
            </p>
            <ul>
              <li>
                <a href="//www.npmjs.com/package/@carbon/icons">Vanilla</a>
              </li>
              <li>
                <a href="//www.npmjs.com/package/@carbon/icons-angular">
                  Angular
                </a>
              </li>
              <li>
                <a href="//www.npmjs.com/package/@carbon/icons-react">React</a>
              </li>
              <li>
                <a href="//www.npmjs.com/package/@carbon/icons-vue">Vue</a>
              </li>
              <li>
                <a href="//www.npmjs.com/package/carbon-icons-svelte">Svelte</a>
              </li>
            </ul>
            <p>
              In order to use icons in alongside these packages, you will need a
              couple of pieces of information, namely the icon size and name.
              For most product UIs, you will want to use the 16x16 icons.
            </p>
            <em>
              Note: You can share links to specific icons by clicking on the
              name of an icon in the table below and sharing that URL with a
              collaborator.
            </em>
            <p>
              In order to make use of an icon, you should look at the{' '}
              <strong>Path</strong> header. This header will provide you with
              the path to import the module in code. In general, the structure
              of how to import an icon will follow:
            </p>
            <pre>
              <code
                className="language-js"
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(
                    `import IconName from '@carbon/icon-<package>/es/<path-to-icon>/<size>';`,
                    Prism.languages.javascript,
                    'javascript'
                  ),
                }}
              />
            </pre>
            <p>
              For example, if I wanted to import the <a href="#16%2Fadd">add</a>{' '}
              icon in React, it would look like:
            </p>
            <pre>
              <code
                className="language-js"
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(
                    `import IconName from '@carbon/icon-react/es/add/16';`,
                    Prism.languages.javascript,
                    'javascript'
                  ),
                }}
              />
            </pre>
            <p>
              The path information comes from the table below under the{' '}
              <strong>Path</strong> header. If you would like to use CommonJS or
              UMD modules, you can replace the path value of <code>es</code>{' '}
              with either <code>lib</code> or <code>umd</code> respectively.
            </p>
            <p>
              For specific guidance on how to use these icons, checkout each
              package's README to learn more!
            </p>
          </div>
        </div>
      </div>
      <section>
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col">
              <Table headers={headers}>
                {metadata.icons.flatMap(icon => {
                  const { assets, output } = icon;
                  const defaultAsset = assets.find(asset => asset.size === 32);

                  return output.map(info => {
                    const id = window.encodeURIComponent(info.moduleName);
                    let asset = assets.find(asset => {
                      if (info.size === 'glyph') {
                        return !asset.size;
                      }
                      return asset.size === info.size;
                    });
                    let downsized = false;

                    if (!asset) {
                      downsized = true;
                      asset = defaultAsset;
                    }

                    const source = [GITHUB_ICON_URL, asset.filepath].join('/');
                    let name = icon.name;
                    if (downsized) {
                      name = `${name} (Downsized to ${info.size})`;
                    }
                    const size =
                      info.size === 'glyph'
                        ? 'glyph'
                        : `${info.size}x${info.size}`;

                    return (
                      <tr key={id} id={id}>
                        <td className="icon-name">
                          <a href={`#${id}`}>{name}</a>
                        </td>
                        <td>{size}</td>
                        <td className="icon-preview-container">
                          <div
                            className="icon-preview"
                            dangerouslySetInnerHTML={{
                              __html: toString(info.descriptor),
                            }}
                          />
                        </td>
                        <td>
                          <a
                            href={source}
                            rel="noopener noreferrer"
                            target="_blank">
                            Source
                          </a>
                        </td>
                        <td>
                          <a
                            href={getBugTemplate(icon.name, source)}
                            rel="noopener noreferrer"
                            target="_blank">
                            Create
                          </a>
                        </td>
                        <td>
                          <div className="icon-code-snippets">
                            <code>{info.filepath}</code>
                          </div>
                        </td>
                      </tr>
                    );
                  });
                })}
              </Table>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function Table({ children, headers }) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function render() {
  ReactDOM.render(<App metadata={metadata} />, document.getElementById('root'));
}

function getBugTemplate(name, source) {
  const url = new URL(
    'https://github.com/carbon-design-system/carbon/issues/new'
  );
  const params = new URLSearchParams();
  params.append('title', `🔍 Visual bug for the \`${name}\` icon`);
  params.append(
    'body',
    `<!-- Feel free to remove sections that aren't relevant. -->

There is an issue for the \`${name}\` icon when viewing [the elements demo](https://carbon-elements.netlify.com/icons/examples/preview/).

The source for this icon is available [here](${source}).

## Detailed description

> Describe in detail the issue you're having.

> Is this a feature request (new component, new icon), a bug, or a general issue?

> Is this issue related to a specific component?

> What did you expect to happen? What happened instead? What would you like to see changed?

> What browser are you working in?

> What version of the Carbon Design System are you using?

> What offering/product do you work on? Any pressing ship or release dates we should be aware of?

## Steps to reproduce the issue

1. Step one
2. Step two
3. Step three
4. etc.

## Additional information

- Screenshots or code
- Notes
`
  );
  url.search = params;
  return url.href;
}

render();

if (module.hot) {
  module.hot.dispose(() => {
    render();
  });
}
