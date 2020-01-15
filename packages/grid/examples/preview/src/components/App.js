import prettify from 'prettify-xml';
import Prism from 'prismjs';
import React from 'react';
import ReactDOM from 'react-dom/server';

export default function App() {
  return (
    <main>
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col">
            <h1>Grid</h1>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <ul>
              {sections.map(section => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {sections.map(section => (
        <section key={section.name}>
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col-sm-4 bx--col-md-8 bx--col-lg-8">
                <h2 id={section.id}>{section.name}</h2>
                <p>{section.description}</p>
              </div>
            </div>
          </div>
          {section.examples.map(example => (
            <article key={example.name}>
              <div className="bx--grid">
                <div className="bx--row">
                  <div className="bx--col-sm-4 bx--col-md-8 bx--col-lg-8">
                    <h3>{example.name}</h3>
                    {example.description && <p>{example.description}</p>}
                  </div>
                </div>
              </div>
              <div className="example">
                {React.createElement(example.content)}
              </div>
              <div className="bx--grid">
                <div className="bx--row">
                  <div className="bx--col">
                    <details>
                      <summary>Code</summary>
                      <pre className="language-js">
                        <code
                          className="language-js"
                          dangerouslySetInnerHTML={{
                            __html: Prism.highlight(
                              prettify(
                                ReactDOM.renderToStaticMarkup(
                                  React.createElement(example.content)
                                )
                              ),
                              Prism.languages.javascript,
                              'javscript'
                            ),
                          }}
                        />
                      </pre>
                    </details>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      ))}
    </main>
  );
}

const sections = [
  {
    id: 'usage',
    name: 'Usage',
    description: (
      <React.Fragment>
        The default grid format closely mirrors Bootstrap's grid. At the
        top-level, you define a container with the <code>.bx--grid</code> class.
        Inside of a grid, you have multiple rows where you use{' '}
        <code>.bx--row</code>. Inside of a row, you use our column classes (
        <code>.bx--col</code>, <code>{`.bx--col-<breakpoint>-<span>`}</code>)
      </React.Fragment>
    ),
    examples: [
      {
        name: 'Auto columns',
        content() {
          return (
            <div className="bx--grid">
              <div className="bx--row">
                <div className="bx--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="bx--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="bx--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="bx--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        name: 'Column span per breakpoint',
        description:
          'Use the column helpers to specify different column spans at different widths',
        content: () => (
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col-sm-1 bx--col-md-2 bx--col-lg-4">
                <div className="outside">
                  <div className="inside">Content</div>
                </div>
              </div>
              <div className="bx--col-sm-1 bx--col-md-2 bx--col-lg-6">
                <div className="outside">
                  <div className="inside">Content</div>
                </div>
              </div>
              <div className="bx--col-sm-1 bx--col-md-2 bx--col-lg-4">
                <div className="outside">
                  <div className="inside">Content</div>
                </div>
              </div>
              <div className="bx--col-sm-1 bx--col-md-2 bx--col-lg-2">
                <div className="outside">
                  <div className="inside">Content</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'offset',
    name: 'Offset',
    description: 'Use offset classes to offset content by a given column span',
    examples: [
      {
        name: 'Default offset usage',
        content: () => (
          <div className="bx--grid">
            {Array.from({ length: 16 }).map((_, i) => {
              const offset = 15 - i;
              const span = 16 - offset;
              return (
                <div key={i} className="bx--row">
                  <div className={`bx--offset-lg-${offset} bx--col-lg-${span}`}>
                    <div className="outside">
                      <div className="inside">{span}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ),
      },
    ],
  },
  {
    id: 'condensed-grid',
    name: 'Condensed grid',
    description:
      'A condensed grid collapses the gutter to 2px. Useful for fluid layouts. Rows have 2px of margin between them to match gutter.',
    examples: [
      {
        name: 'Default usage',
        content: () => (
          <div className="bx--grid bx--grid--condensed">
            <div className="bx--row">
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="bx--row">
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'Mixed row content',
        description:
          'Use a helper class to specify a single row as condensed. Rows that are adjacent and are condensed will have 2px of margin between them to match gutter.',
        content: () => (
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="bx--row bx--row--condensed">
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="bx--row bx--row--condensed">
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'no-gutters',
    name: 'No gutters',
    desription:
      'Sometimes it is useful to have no gutters in a layout, particularly for fluid layouts. You can specify no gutters on a column-by-column basis or for all columns in a row.',
    examples: [
      {
        name: 'No gutters',
        description: 'Single column usage of bx--no-gutter',
        content: () => (
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col bx--no-gutter">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col bx--no-gutter">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col bx--no-gutter">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col bx--no-gutter">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'No gutters',
        description: 'Row usage of bx--no-gutter',
        content: () => (
          <div className="bx--grid">
            <div className="bx--row bx--no-gutter">
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'No gutters - directional',
        description:
          'You can also specify no gutters for either direction, for both columns and rows',
        content: () => (
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col bx--no-gutter--left">
                <div className="outside">
                  <div className="inside">No gutter on left side</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
            <div className="bx--row">
              <div className="bx--col bx--no-gutter--right">
                <div className="outside">
                  <div className="inside">No gutter on right side</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
            <div className="bx--row bx--no-gutter--left">
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">No gutter on left side</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">No gutter on left side</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">No gutter on left side</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">No gutter on left side</div>
                </div>
              </div>
            </div>
            <div className="bx--row bx--no-gutter--right">
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">No gutter on right side</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">No gutter on right side</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">No gutter on right side</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">No gutter on right side</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'hang',
    name: 'Hanging content',
    description:
      'When working with no gutters, it is helpful to keep content inside of the columns aligned with other rows in the same grid. In order to do this, we use a combinated of no-gutter and hang classes.',
    examples: [
      {
        name: 'Hanging text',
        description:
          'In order to hang text, you will need to specify no gutter on the left-hand side and use hang on the inner text that you want to align',
        content: () => (
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="bx--row bx--no-gutter--left">
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <div className="bx--aspect-ratio--object image-example">
                    Full width image
                  </div>
                </div>
                <div className="outside bx--hang--left">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <div className="bx--aspect-ratio--object image-example">
                    Full width image
                  </div>
                </div>
                <div className="outside bx--hang--left">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <div className="bx--aspect-ratio--object image-example">
                    Full width image
                  </div>
                </div>
                <div className="outside bx--hang--left">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <div className="bx--aspect-ratio--object image-example">
                    Full width image
                  </div>
                </div>
                <div className="outside bx--hang--left">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'aspect-ratio',
    name: 'Aspect ratio',
    description:
      'When designing fluid layouts, sometimes it is helpful for an asset or card to be a specific aspect ratio. We offer several classes for specifying aspect ratio for given content.',
    examples: [
      {
        name: '16x9',
        content: () => (
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--16x9">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--16x9">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--16x9">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--16x9">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: '2x1',
        content: () => (
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--2x1">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--2x1">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--2x1">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--2x1">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: '4x3',
        content: () => (
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--4x3">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--4x3">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--4x3">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--4x3">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: '1x1',
        content: () => (
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <div className="bx--aspect-ratio--object">
                    <div className="outside">
                      <div className="inside">1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'full-bleed',
    name: 'Full bleed',
    description:
      'When wanting background colors to go edge-to-edge, you will need to create a wrapping node around your grid with the color that you are looking to apply.',
    examples: [
      {
        name: 'Usage',
        description:
          'In this example, we create an outer div and give it the class name bleed which we then style with a background color.',
        content: () => (
          <div className="bleed">
            <div className="bx--grid">
              <div className="bx--row">
                <div className="bx--col">
                  <div className="outside">
                    <div className="inside">1</div>
                  </div>
                </div>
                <div className="bx--col">
                  <div className="outside">
                    <div className="inside">1</div>
                  </div>
                </div>
                <div className="bx--col">
                  <div className="outside">
                    <div className="inside">1</div>
                  </div>
                </div>
                <div className="bx--col">
                  <div className="outside">
                    <div className="inside">1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'full-width',
    name: 'Full width',
    description:
      'By default, the grid has a max width set. You can remove this by using a grid modifier class.',
    examples: [
      {
        name: 'Usage',
        content: () => (
          <div className="bx--grid bx--grid--full-width">
            <div className="bx--row">
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="bx--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
];
