import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CodeExample from '../CodeExample/CodeExample';
import * as carbonComponents from 'carbon-components/es/globals/js/components';
import {
  DIRECTION_TOP,
  DIRECTION_BOTTOM,
} from 'carbon-components/es/components/floating-menu/floating-menu';
import InlineLoadingDemoButton from '../../content/components/inline-loading/inline-loading-demo-button';
import settings from 'carbon-components/es/globals/js/settings';
import { RadioButtonGroup, RadioButton } from 'carbon-components-react';
import { Launch16 } from '@carbon/icons-react';

/**
 * Determines how the vertical position of live demo container should affect the floating menu position offset.
 * Refs:
 * https://github.com/IBM/carbon-components/blob/v9.0.0/src/components/floating-menu/floating-menu.js#L61
 * https://github.com/IBM/carbon-components/blob/v9.0.0/src/components/floating-menu/floating-menu.js#L69
 * @type {Object<string, number>}
 */
const liveDemoContainerVerticalPositionFactors = {
  [DIRECTION_TOP]: 1,
  [DIRECTION_BOTTOM]: -1,
};

const components = {
  ...carbonComponents,
  InlineLoadingDemoButton,
};

const componentNamesMap = {
  Card: ['OverflowMenu'],
  CodeSnippet: ['CodeSnippet', 'CopyButton'],
  DataTable: ['DataTable', 'DataTableV2', 'OverflowMenu', 'Toolbar'],
  DetailPageHeader: ['OverflowMenu', 'Tab'],
  InlineLoading: ['InlineLoading', 'InlineLoadingDemoButton'],
  OrderSummary: ['Dropdown'],
  Tabs: ['Tab', 'ContentSwitcher'],
};

class ComponentExample extends Component {
  static propTypes = {
    htmlFile: PropTypes.string,
    component: PropTypes.string,
    variation: PropTypes.string,
    hideViewFullRender: PropTypes.bool,
    codepenSlug: PropTypes.string,
    hasLightVersion: PropTypes.string,
    hasReactVersion: PropTypes.bool,
    hasAngularVersion: PropTypes.string,
    hasVueVersion: PropTypes.string,
    experimental: PropTypes.bool,
  };

  static _initHandles = new WeakMap();

  state = {
    currentFieldColor: 'field-01',
    currentHTMLfile: this.props.htmlFile,
  };

  onSwitchFieldColors = value => {
    this.setState({
      currentFieldColor: value,
    });

    let newHTML;
    let currentComponent = this.props.component;
    const currentVariation = this.props.variation;
    if (
      currentComponent !== currentVariation &&
      !currentVariation.includes(currentComponent)
    ) {
      currentComponent = currentVariation;
    }
    if (value === 'field-02') {
      if (
        (currentVariation !== 'text-input--password' &&
          currentVariation.includes('--')) ||
        currentVariation === 'code-snippet--inline'
      ) {
        newHTML = require(`carbon-components/html/${currentComponent}/${currentVariation}-light.html`);
      } else {
        newHTML = require(`carbon-components/html/${currentComponent}/${currentVariation}--light.html`);
      }
    } else {
      newHTML = require(`carbon-components/html/${currentComponent}/${currentVariation}.html`);
    }
    this.setState({
      currentHTMLfile: newHTML,
    });
  };

  _ref = null;

  _handles = [];

  _liveContainerRef = createRef();

  _liveDemoRef = ref => {
    this._ref = ref;
    this._releaseAndInstantiateComponents();
  };

  componentDidUpdate({ htmlFile }) {
    const { prevHtmlFile } = this.props;
    if (prevHtmlFile !== htmlFile) {
      this._releaseAndInstantiateComponents();
    }
  }

  _releaseAndInstantiateComponents() {
    const handles = this._handles;
    for (let instance = handles.pop(); instance; instance = handles.pop()) {
      instance.release();
    }
    const ref = this._ref;
    if (ref) {
      const { component } = this.props;
      const currentComponent = component
        .replace(/-([a-z])/g, (match, token) => token.toUpperCase())
        .replace(/^([a-z])/, (match, token) => token.toUpperCase());
      // TODO: See if instances with different prefixes may exist as the same time.
      // If so, we need to figure out more sophisticted approach here.
      settings.prefix = 'bx';
      (componentNamesMap[currentComponent] || [currentComponent]).forEach(
        name => {
          const TheComponent = components[name];
          if (TheComponent) {
            const options = {};
            if (name === 'DatePicker') {
              // Same as `this._liveContainerRef.current`, but that may not have been set up yet
              const liveContainerRef = ref.closest('.component-example__live');
              options.appendTo = liveContainerRef;
              options.onPreCalendarPosition = (
                selectedDates,
                value,
                { _positionElement, calendarContainer }
              ) => {
                // Make it "post" positioning handler
                Promise.resolve().then(() => {
                  const {
                    left: inputLeft,
                    top: inputTop,
                  } = _positionElement.getBoundingClientRect();
                  const {
                    left: containerLeft,
                    top: containerTop,
                  } = liveContainerRef.getBoundingClientRect();
                  calendarContainer.style.left = `${inputLeft -
                    containerLeft}px`;
                  calendarContainer.style.top = `${inputTop -
                    containerTop +
                    _positionElement.offsetHeight}px`;
                });
              };
            }
            if (name === 'OverflowMenu' || name === 'Tooltip') {
              ['objMenuOffset', 'objMenuOffsetFlip'].forEach(optionName => {
                if (TheComponent.options[optionName]) {
                  options[optionName] = (menuBody, direction, trigger) => {
                    const origOffset = TheComponent.options[optionName](
                      menuBody,
                      direction,
                      trigger
                    );
                    const liveContainerRef = this._liveContainerRef.current;
                    if (liveContainerRef) {
                      const { left: origLeft, top: origTop } = origOffset;
                      const {
                        left: liveContainerLeft,
                        top: liveContainerTop,
                      } = liveContainerRef.getBoundingClientRect();
                      const borderWidth =
                        name !== 'OverflowMenu'
                          ? 0
                          : parseInt(
                              liveContainerRef.ownerDocument.defaultView
                                .getComputedStyle(liveContainerRef)
                                .getPropertyValue('border-left-width') // FF doesn't have one for `border-width`
                            );
                      const adjustLeft =
                        liveContainerLeft +
                        borderWidth +
                        menuBody.ownerDocument.defaultView.pageXOffset;
                      const adjustTop =
                        liveContainerTop +
                        borderWidth +
                        menuBody.ownerDocument.defaultView.pageYOffset;
                      return {
                        left: origLeft - adjustLeft,
                        top:
                          origTop +
                          adjustTop *
                            liveDemoContainerVerticalPositionFactors[direction],
                      };
                    }
                    return origOffset;
                  };
                }
              });
            }
            if (TheComponent.prototype.createdByLauncher) {
              const initHandles = this.constructor._initHandles;
              if (!initHandles.has(TheComponent)) {
                initHandles.set(
                  TheComponent,
                  TheComponent.init(ref.ownerDocument, options)
                );
              }
            } else {
              const selectorInit = TheComponent.options.selectorInit;
              // Gatsby's setup seems to use `.concat()` for [...arraylike], which does not work for `NodeList`
              handles.push(
                ...Array.from(ref.querySelectorAll(selectorInit)).map(elem =>
                  TheComponent.create(elem, options)
                )
              );
            }
          }
        }
      );
    }
  }

  componentWillReceiveProps(props) {
    if (this.state.currentHTMLfile !== props.htmlFile) {
      this.setState({ currentHTMLfile: props.htmlFile });
    }
  }

  render() {
    const {
      component,
      codepenSlug,
      hasLightVersion,
      hasReactVersion,
      hasAngularVersion,
      hasVueVersion,
      experimental,
    } = this.props;

    const { currentHTMLfile = '', currentFieldColor } = this.state;
    const demoHtml = currentHTMLfile;

    const classNames = classnames({
      'component-example__live--rendered': true,
      [`${component}`]: true,
    });

    const lightUIclassnames = classnames({
      'component-example': true,
      'bx--global-light-ui': component === 'tabs',
    });

    let componentName =
      component
        .replace(/-/g, ' ')
        .charAt(0)
        .toUpperCase() + component.replace(/-/g, ' ').substring(1);

    if (componentName.split(' ').length > 1) {
      componentName = `${componentName.split(' ')[0]} ${componentName
        .split(' ')[1]
        .charAt(0)
        .toUpperCase() + componentName.split(' ')[1].substring(1)}`;
    }

    let componentNameLink = componentName;
    if (componentName.split(' ').length > 1) {
      componentNameLink = `${componentName.split(' ')[0]}${componentName
        .split(' ')[1]
        .charAt(0)
        .toUpperCase() + componentName.split(' ')[1].substring(1)}`;
    }

    const liveBackgroundClasses = classnames(
      'component-example__live',
      `component-example__live--${component}`,
      {
        'component-example__live--light':
          (currentFieldColor === 'field-02') & (hasLightVersion === true),
      }
    );

    const componentLink = `https://codepen.io/team/carbon/full/${codepenSlug}/`;
    const counter = Math.floor(Math.random() * 100) + 1;

    return (
      <div className={lightUIclassnames}>
        <div
          className={liveBackgroundClasses}
          ref={this._liveContainerRef}
          data-floating-menu-container>
          <div className={classNames}>
            <div
              ref={this._liveDemoRef}
              dangerouslySetInnerHTML={{ __html: demoHtml }}
            />
          </div>
        </div>
        <div className="component-toolbar">
          <div className="component-toolbar__current">Vanilla JS</div>
          <div className="component-toolbar__links">
            {hasReactVersion === true && experimental !== true && (
              <a
                href={`http://react.carbondesignsystem.com/?selectedKind=${componentNameLink}`}
                target="_blank"
                rel="noopener noreferrer">
                React <Launch16 />
              </a>
            )}
            {hasReactVersion === true && experimental === true && (
              <a
                href={`http://react-experimental.carbondesignsystem.com/?selectedKind=${componentNameLink}`}
                target="_blank"
                rel="noopener noreferrer">
                React <Launch16 />
              </a>
            )}
            {/* hasAngularVersion should be the query part of the storybook url */}
            {typeof hasAngularVersion === 'string' && (
              <a
                href={`http://angular.carbondesignsystem.com/${hasAngularVersion}`}
                target="_blank"
                rel="noopener noreferrer">
                Angular <Launch16 />
              </a>
            )}
            {typeof hasVueVersion === 'string' && (
              <a
                href={`http://vue.carbondesignsystem.com/?path=/story/components-cv${hasVueVersion}`}
                target="_blank"
                rel="noopener noreferrer">
                Vue <Launch16 />
              </a>
            )}
            {codepenSlug !== undefined && (
              <a target="_blank" href={componentLink} rel="noopener noreferrer">
                CodePen <Launch16 />
              </a>
            )}
          </div>
          {hasLightVersion === true && (
            <div className="component-toolbar__switcher">
              <RadioButtonGroup
                defaultSelected={currentFieldColor}
                name={`radio-button-group-${counter}`}
                legend="Field selector"
                onChange={this.onSwitchFieldColors}>
                <RadioButton
                  value="field-01"
                  id={`field-01-${counter}`}
                  labelText="field-01"
                />
                <RadioButton
                  value="field-02"
                  id={`field-02-${counter}`}
                  labelText="field-02"
                />
              </RadioButtonGroup>
            </div>
          )}
        </div>
        <CodeExample htmlFile={currentHTMLfile} />
      </div>
    );
  }
}

export default ComponentExample;
