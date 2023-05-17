import {useState} from "react";
import * as CarbonType from "@carbon/type";
import { paramCase } from "change-case";

export default function IndexPage() {
  return (
    <>
      <TableOfContents />
      <FontFaces />
      <TypeStyles />
      <TypeScale />
    </>
  );
}

function TableOfContents() {
  return (
    <>
      <h2>Table of contents</h2>
      <ul>
        <li>
          <a href="#font-faces">Font faces</a>
        </li>
        <li>
          <a href="#type-styles">Type styles</a>
        </li>
        <li>
          <a href="#type-scale">Type scale</a>
        </li>
      </ul>
    </>
  );
}

function FontFaces() {
  return (
    <article>
      <header>
        <h2 id="font-faces">Font Faces</h2>
      </header>
      <p>Used for specifying which fonts to download on the page.</p>
      <table>
        <caption>IBM Plex Sans</caption>
        <thead>
          <tr>
            <td>Weight</td>
            <td>Sample</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Light</td>
            <td className="cds--type-sans cds--type-light">Light</td>
          </tr>
          <tr>
            <td>Regular</td>
            <td className="cds--type-sans">Regular</td>
          </tr>
          <tr>
            <td>Regular Italic</td>
            <td className="cds--type-sans cds--type-italic">Regular</td>
          </tr>
          <tr>
            <td>Semibold</td>
            <td className="cds--type-sans cds--type-semibold">Semibold</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>IBM Plex Sans Condensed</caption>
        <thead>
          <tr>
            <td>Weight</td>
            <td>Sample</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Light</td>
            <td className="cds--type-sans-condensed cds--type-light">Light</td>
          </tr>
          <tr>
            <td>Regular</td>
            <td className="cds--type-sans-condensed">Regular</td>
          </tr>
          <tr>
            <td>Regular Italic</td>
            <td className="cds--type-sans-condensed cds--type-italic">
              Regular
            </td>
          </tr>
          <tr>
            <td>Semibold</td>
            <td className="cds--type-sans-condensed cds--type-semibold">
              Semibold
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>IBM Plex Serif</caption>
        <thead>
          <tr>
            <td>Weight</td>
            <td>Sample</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Light</td>
            <td className="cds--type-serif cds--type-light">Light</td>
          </tr>
          <tr>
            <td>Regular</td>
            <td className="cds--type-serif">Regular</td>
          </tr>
          <tr>
            <td>Semibold</td>
            <td className="cds--type-serif cds--type-semibold">Semibold</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>IBM Plex Mono</caption>
        <thead>
          <tr>
            <td />
            <td />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Light</td>
            <td className="cds--type-mono cds--type-light">Light</td>
          </tr>
          <tr>
            <td>Regular</td>
            <td className="cds--type-mono">Regular</td>
          </tr>
          <tr>
            <td>Semibold</td>
            <td className="cds--type-mono cds--type-semibold">Semibold</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

function TypeScale() {
  return (
    <article>
      <header>
        <h2 id="type-scale">Scale</h2>
      </header>
      <p>Used for deriving a type scale value for a given step.</p>
      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>px</th>
            <th>Actual size</th>
          </tr>
        </thead>
        <tbody>
          {CarbonType.scale.map((size, step) => (
            <tr key={size}>
              <td>{step + 1}</td>
              <td>{size}</td>
              <td className={`type-scale-${step + 1}`}>
                Good design is good business
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

function TypeStyles() {
  const fontFamilies = [
    {
      title: "Arabic",
      fontFamily: "IBM Plex Arabic",
      sample: "السادس",
      dir: "rtl",
    },
    {
      title: "Devanagari",
      fontFamily: "IBM Plex Devanagari",
      sample: "कारन प्रदान",
    },
    {
      title: "Hebrew",
      fontFamily: "IBM Plex Sans Hebrew",
      sample: "אחרים בהתייחסות",
      dir: "rtl",
    },
    {
      title: "Thai",
      fontFamily: "IBM Plex Thai",
      sample: "บลูเบอร์รีแอคทีฟซู",
    },
  ];
 const [expandAll, setExpandAll] = useState(false);
  return (
    <article>
      <header>
        <h2 id="type-styles">Type styles</h2>
      </header>
      <p>Used for applying styles to a text element.</p>
      <details onClick={() => setExpandAll(!expandAll)}>
        <summary>
          <small>Click to expand all token details</small>
        </summary>
      </details>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Sample</th>
            {fontFamilies.map(({ dir, title }) => (
              <th
                key={title}
                style={{ textAlign: dir === "rtl" ? "right" : "left" }}
              >
                {title}
              </th>
            ))}
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(CarbonType.styles).map((token) => (
            <tr key={token}>
              <td>
                <pre>
                  <code>{formatTokenName(token)}</code>
                </pre>
                <details open={expandAll}>
                  <summary>
                    <small>Click to expand token details</small>
                  </summary>
                  <pre>
                    <code>
                      <small>
                        {JSON.stringify(CarbonType.styles[token], null, 1)}
                      </small>
                    </code>
                  </pre>
                </details>
              </td>
              <td className={`cds--type-${formatTokenName(token)}`}>
                <span>Text sample</span>
              </td>
              {fontFamilies.map(({ dir, fontFamily, title, sample }) => (
                <td
                  key={title}
                  className={`cds--type-${formatTokenName(token)}`}
                  style={{ fontFamily }}
                  dir={dir}
                >
                  <span>{sample}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

function formatTokenName(token) {
  return paramCase(token).replace(/(\d+)/g, "-$1");
}
