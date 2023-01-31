import 'url-polyfill';

import { toString } from '@carbon/icon-helpers';
import Prism from 'prismjs';
import React, { useState } from 'react';
import metadata from '../../../../metadata.json';

const GITHUB_PICTOGRAM_URL =
  'https://github.com/carbon-design-system/carbon/tree/master/packages/pictograms/src/svg';

export default function IndexPage() {
  const headers = ['Name', 'Preview', 'GitHub', 'Issues'];

  const isBrowser = () => typeof window !== 'undefined';

  return (
    <>
       <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col">
            <h1>Pictograms</h1>
          </div>
        </div>
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-6 cds--col-lg-6">
            <h2>Usage</h2>
            <p>
              Pictograms in Carbon are now provided through a set of packages
              that let you use pictograms in various frameworks. We currently
              support:
            </p>
            <ul>
              <li>
                <a href="//www.npmjs.com/package/@carbon/pictograms">Vanilla</a>
              </li>
              <li>
                <a href="//www.npmjs.com/package/@carbon/pictograms-react">
                  React
                </a>
              </li>
            </ul>
            <p>
              For specific guidance on how to use these pictograms, checkout
              each package's README to learn more!
            </p>
          </div>
        </div>
      </div>
      <section>
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col">
              <Table headers={headers}>
                {metadata.icons.flatMap((icon) => {
                  const { assets, output } = icon;
                  const [asset] = assets;

                  return output.map((info) => {
                    const id = info.moduleName
                    const source = [GITHUB_PICTOGRAM_URL, asset.filepath].join(
                      '/'
                    );

                    return (
                      <tr key={id} id={id}>
                        <td className="icon-name">
                          <a href={`#${id}`}>{info.descriptor.name}</a>
                        </td>
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
                      </tr>
                    );
                  });
                })}
              </Table>
            </div>
          </div>
        </div>
      </section>
    </>
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

function getBugTemplate(name, source) {
  const url = new URL(
    'https://github.com/carbon-design-system/carbon/issues/new'
  );
  const params = new URLSearchParams();
  params.append('title', `🔍 Visual bug for the \`${name}\` icon`);
  params.append(
    'body',
    `<!-- Feel free to remove sections that aren't relevant. -->

There is an issue for the \`${name}\` pictogram when viewing [the elements demo](https://carbon-elements.netlify.com/pictograms/examples/preview/).

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
