import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import classnames from 'classnames';
import { Icon } from 'carbon-components-react';
import ReactGA from 'react-ga';

class CodeExample extends Component {
  static propTypes = {
    htmlFile: PropTypes.string,
  };

  state = {
    copied: false,
    showBtn: false,
    expandedCode: false,
  };

  determineShowBtnState = () => {
    if (this.codeBlock.offsetHeight > 190) {
      this.setState({ showBtn: true });
    }
  };

  handleCopy = () => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2500);
  };

  expandCode = () => {
    this.setState(({ expandedCode }) => ({ expandedCode: !expandedCode }));
  };

  handleClick = () => {
    ReactGA.event({
      category: 'Copy Code',
      action: 'click',
    });
  };

  highlight = node => {
    if (node) {
      if (window.Prism) {
        window.Prism.highlightElement(node);
      }
      this._observerCode = new MutationObserver(() => {
        if (
          window.Prism &&
          Array.prototype.every.call(
            node.childNodes,
            childNode => childNode.nodeType === Node.TEXT_NODE
          )
        ) {
          window.Prism.highlightElement(node, this.determineShowBtnState());
        }
      });
      this._observerCode.observe(node, {
        childList: true,
      });
    } else if (this._observerCode) {
      this._observerCode.disconnect();
      this._observerCode = null;
    }
  };

  render() {
    const { htmlFile } = this.props;
    const { copied, expandedCode, showBtn } = this.state;

    const copyBtnClass = classnames({
      'bx--btn--copy__feedback': true,
      'bx--btn--copy__feedback--displayed': copied,
    });

    const codeExampleClass = classnames({
      'code-example__raw-html': true,
      'code-example__raw-html--expanded': expandedCode,
    });

    const expandBtnIconClass = classnames({
      'code-example__expand--icon': true,
      'code-example__expand--icon--rotated': expandedCode,
    });

    const expandBtnClass = classnames({
      'code-example__expand': showBtn,
      'code-example__expand--hidden': !showBtn,
    });

    const expandCodeBtnText = expandedCode
      ? 'Show less code'
      : 'Show more code';
    return (
      <div className="code-example">
        <div
          className={codeExampleClass}
          ref={ref => {
            this.codeBlock = ref;
          }}>
          <pre className="line-numbers">
            <code className="language-html" ref={this.highlight}>
              {htmlFile}
            </code>
          </pre>
        </div>
        <CopyToClipboard text={htmlFile} onCopy={this.handleCopy}>
          <button
            type="button"
            data-copy-btn
            className="bx--snippet-button code-example__copy-btn"
            onClick={() => this.handleClick()}>
            Copy
            <Icon
              className="code-example__copy-btn--icon bx--snippet__icon"
              name="copy"
              description="Copy code icon"
            />
            <div className={copyBtnClass} data-feedback="Copied!" />
          </button>
        </CopyToClipboard>
        <button
          type="button"
          className={expandBtnClass}
          onClick={this.expandCode}>
          <span>{expandCodeBtnText}</span>
          <Icon
            className={expandBtnIconClass}
            name="chevron--down"
            description="Expand code icon"
          />
        </button>
      </div>
    );
  }
}

export default CodeExample;
