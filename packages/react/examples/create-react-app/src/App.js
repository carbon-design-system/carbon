import 'carbon-components/scss/globals/scss/styles.scss';

import React, { Component } from 'react';
import { Accordion, AccordionItem } from 'carbon-components-react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React, with Carbon!</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <article className="App__demo">
          <h3 className="App__demo-title">Carbon Components</h3>
          <Accordion>
            <AccordionItem title="Example">
              <p>
                This is a Component imported from Carbon and styled with the CSS
                from the main Carbon Components GitHub repo!
              </p>
            </AccordionItem>
            <AccordionItem title="Questions?">
              <p>
                Hi there!{' '}
                <span aria-label="Hand wave" role="img">
                  👋{' '}
                </span>{' '}
                if you have any questions about this demo, or are running into
                any issues setting this up in your own development environment,
                please feel free to reach out to us on Slack or make an issue on
                the GitHub Repository.
              </p>
            </AccordionItem>
          </Accordion>
        </article>
      </div>
    );
  }
}

export default App;
