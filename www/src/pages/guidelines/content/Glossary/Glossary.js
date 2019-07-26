import React, { Component } from 'react';
import GlossaryList from '../GlossaryList/GlossaryList';
import GlossaryNav from '../GlossaryNav/GlossaryNav';

class Glossary extends Component {
  render() {
    const glossary = require('../../data/guidelines/glossary.js'); // eslint-disable-line
    return (
      <div className="glossary">
        <GlossaryNav />
        <div className="bx--row">
          <div className="bx--col-lg-7 bx--offset-lg-4">
            <GlossaryList glossary={glossary} />
          </div>
          <div className="bx--col-lg-1 bx--offset-lg-4" />
        </div>
      </div>
    );
  }
}

export default Glossary;
