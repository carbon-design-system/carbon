import React from 'react';
import Packages from '../../../package.json';
import { Tag } from 'carbon-components-react';

const tags = {
  stable: <Tag type="green">Stable</Tag>,
  experimental: <Tag type="teal">Experimental</Tag>,
  new: <Tag type="purple">New</Tag>,
  updated: <Tag type="blue">Updated</Tag>,
  deprectated: <Tag type="red">Deprecated</Tag>,
  underConstruction: <Tag type="cool-gray">Under construction</Tag>,
  notAvailable: <span className="component-status--unavailable">–</span>,
};

class ComponentStatus extends React.Component {
  renderItems = currentItem => {
    return (
      <tr key={currentItem.component}>
        <td>{currentItem.component}</td>
        <td>
          {Object.keys(currentItem.vanilla)
            .filter(key => currentItem.vanilla[key])
            .map(key => {
              return <React.Fragment key={key}>{tags[key]}</React.Fragment>;
            })}
        </td>
        <td>
          {Object.keys(currentItem.react)
            .filter(key => currentItem.react[key])
            .map(key => {
              return <React.Fragment key={key}>{tags[key]}</React.Fragment>;
            })}
        </td>
        <td>
          {Object.keys(currentItem.angular)
            .filter(key => currentItem.angular[key])
            .map(key => {
              return <React.Fragment key={key}>{tags[key]}</React.Fragment>;
            })}
        </td>
        <td>
          {Object.keys(currentItem.vue)
            .filter(key => currentItem.vue[key])
            .map(key => {
              return <React.Fragment key={key}>{tags[key]}</React.Fragment>;
            })}
        </td>
      </tr>
    );
  };

  render() {
    const vanillaVersion = Packages.dependencies['carbon-components'];
    const componentStatus = require('../../data/components.json'); // eslint-disable-line

    return (
      <div className="bx--row component-status">
        <div className="bx--col-lg-12 bx--offset-lg-4">
          <h2 className="page-h2">Current version: {vanillaVersion}</h2>
        </div>
        <div className="bx--col-lg-12 bx--offset-lg-4 bx--no-gutter">
          <table className="page-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Vanilla</th>
                <th>React</th>
                <th>Angular</th>
                <th>Vue</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(componentStatus.components).map(component => {
                return this.renderItems(componentStatus.components[component]);
              })}
            </tbody>
          </table>
        </div>
        <div className="bx--col-lg-8 bx--offset-lg-4 component-status__key">
          <h4 className="page-h4">Key</h4>
        </div>
        <div className="bx--col-lg-8 bx--offset-lg-4 bx--no-gutter">
          <table className="page-table">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tags.stable}</td>
                <td>Component is dev and design production-ready.</td>
              </tr>
              <tr>
                <td>{tags.experimental}</td>
                <td>
                  Component can be used but is not considered stable and changes
                  to it may occur.
                </td>
              </tr>
              <tr>
                <td>{tags.deprectated}</td>
                <td>
                  Component has either been replaced by a new version or it is
                  no longer being supported by the system.
                </td>
              </tr>
              <tr>
                <td>{tags.notAvailable}</td>
                <td>Component is not available in this framework.</td>
              </tr>
              <tr>
                <td>{tags.new}</td>
                <td>
                  Component is new to framework in the last major version
                  update.
                </td>
              </tr>
              <tr>
                <td>{tags.updated}</td>
                <td>
                  An existing component that had been under review, tweaked, and
                  re-released in the last major version.
                </td>
              </tr>
              <tr>
                <td>{tags.underConstruction}</td>
                <td>New components that are currently being worked on.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ComponentStatus;
