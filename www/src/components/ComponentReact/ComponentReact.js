import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as reactComponent from 'carbon-components-react';

const items = [
  {
    id: 'item-1',
    text: 'Item 1',
  },
  {
    id: 'item-2',
    text: 'Item 2',
  },
  {
    id: 'item-3',
    text: 'Item 3',
  },
  {
    id: 'item-4',
    text: 'Item 4',
  },
];

class ComponentReactExample extends Component {
  static propTypes = {
    name: PropTypes.string,
    component: PropTypes.string,
    variation: PropTypes.string,
    hasAngularVersion: PropTypes.bool,
  };

  componentDidMount() {
    this.addReactComponent();
  }

  addReactComponent = () => {
    let NewComponent = reactComponent[this.props.component];

    if (this.props.component === 'ComboBox') {
      ReactDOM.render(
        <NewComponent
          items={items}
          itemToString={item => (item ? item.text : '')}
          placeholder="Filter..."
        />,
        this.comp
      );
    } else if (this.props.variation === 'MultiSelect.Filterable') {
      NewComponent = reactComponent.MultiSelect.Filterable;
      ReactDOM.render(
        <NewComponent
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={() => {}}
          placeholder="Filter"
        />,
        this.comp
      );
    } else if (this.props.variation === 'MultiSelect') {
      ReactDOM.render(
        <NewComponent
          items={items}
          itemToString={item => (item ? item.text : '')}
          label="MultiSelect Label"
        />,
        this.comp
      );
    } else if (this.props.variation === 'MultiSelect.Inline') {
      NewComponent = reactComponent.MultiSelect;
      ReactDOM.render(
        <NewComponent
          items={items}
          itemToString={item => (item ? item.text : '')}
          label="MultiSelect Label"
          type="inline"
        />,
        this.comp
      );
    }
  };

  render() {
    const { name, component, variation, hasAngularVersion } = this.props;
    const storybookMessage = {
      'MultiSelect-MultiSelect.Filterable': 'Check off Filterable in KNOBS tab',
      'MultiSelect-MultiSelect.Inline': 'Select inline in UI type in KNOBS tab',
    }[`${component}-${variation || 'default'}`];
    const storybookVariation = {
      'MultiSelect-MultiSelect': '',
      'MultiSelect-MultiSelect.Filterable': '',
      'MultiSelect-MultiSelect.Inline': '',
    }[`${component}-${variation || 'default'}`];
    const componentLink = `http://react.carbondesignsystem.com/?selectedKind=${component}&selectedStory=${storybookVariation ||
      'default'}`;

    const getLibraryLinks = () => {
      if (hasAngularVersion) {
        return (
          <>
            <a
              href="https://github.com/ibm/carbon-components-react"
              target="_blank">
              our React
            </a>{' '}
            and{' '}
            <a
              href="https://github.com/ibm/carbon-components-angular"
              target="_blank">
              Angular libraries
            </a>
          </>
        );
      }

      return (
        <a
          href="https://github.com/ibm/carbon-components-react"
          target="_blank">
          our React library
        </a>
      );
    };

    return (
      <>
        <div className="bx--row">
          <div className="bx--col-lg-12 bx--offset-lg-4">
            <h2 className="page-h2">{name}</h2>
            <p className="component-example__heading-label page-p">
              This component is currently only available in {getLibraryLinks()}.
            </p>
          </div>
        </div>
        <div className="component-variation bx--row">
          <div className="bx--col-lg-12 bx--offset-lg-4 bx--no-gutter">
            <div>
              <div className="svg--sprite" aria-hidden="true" />
              <div className="component-example__live">
                <div className="component-example__live--rendered">
                  <div ref={comp => (this.comp = comp)} />
                </div>
                <a
                  href={componentLink}
                  className="component-example__view-full-render component-example__view-full-render--react"
                  rel="noopener noreferrer">
                  View on React Storybook
                  {storybookMessage && ` (${storybookMessage})`}
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ComponentReactExample;
