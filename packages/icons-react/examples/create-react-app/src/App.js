import React, { Component } from 'react';
import { Button } from 'carbon-components-react';
import ArrowRight16 from '@carbon/icons-react/es/arrow--right/16';
import Add16 from '@carbon/icons-react/es/add/16';
import Download16 from '@carbon/icons-react/es/download/16';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-wrapper">
            <Button kind="primary" style={{ fill: '#fff' }}>
              Primary Button <ArrowRight16 className="bx--btn__icon" />
            </Button>

            <Button kind="secondary" href="#">
              Secondary Button Link <Add16 className="bx--btn__icon" />
            </Button>

            <Button kind="tertiary" href="#" as="div">
              Tertiary Custom Button <Download16 className="bx--btn__icon" />
            </Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
