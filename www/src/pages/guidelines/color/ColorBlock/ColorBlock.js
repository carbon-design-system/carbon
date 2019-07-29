import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ColorBlock extends React.Component {
  static propTypes = {
    /**
     * should the hex be displayed? this will also prescribe a particular layout
     */
    showhex: PropTypes.bool,
  };

  static renderHex(showhex, hex) {
    let hexLabel = '';
    if (showhex) {
      hexLabel = hex;
    }
    return hexLabel;
  }

  render() {
    const hex = this.props.children;
    const showhex =
      this.props.showhex === 'true' || this.props.showhex === true;

    const colorBlockClassnames = classnames({
      'color-block__color': true,
      'color-block__color--with-label': showhex,
    });
    const colorBlockStyles = {
      backgroundColor: hex,
    };

    return (
      <div className="color-block">
        {ColorBlock.renderHex(showhex, hex)}
        <span className={colorBlockClassnames} style={colorBlockStyles} />
      </div>
    );
  }
}
