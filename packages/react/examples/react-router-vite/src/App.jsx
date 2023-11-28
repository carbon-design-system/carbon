import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button} from '@carbon/react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';

const LandingPage = ({ children }) => (
  <div>
    <h1>React Router & Carbon React Components</h1>
    <section>
      <h2>With breadcrumb</h2>
      <ul>
        <li>
          <Link to="/page-one">Navigate to page 1</Link>
        </li>
        <li>
          <Link to="/page-two">Navigate to page 2</Link>
        </li>
      </ul>
    </section>
    <section>
      {children}
    </section>
  </div>
);

const ButtonExample = () => (
  <LandingPage>
    <Button>Button example</Button>
  </LandingPage>
);

const PageOne = () => (
  <div>
    <h1>React Router & Carbon React Components</h1>
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/page-one">page 1</Link>
      </BreadcrumbItem>
    </Breadcrumb>
    <p>Page 1 content.</p>
  </div>
);

const PageTwo = () => (
  <div>
    <h1>React Router & Carbon React Components</h1>
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/page-two">page 2</Link>
      </BreadcrumbItem>
    </Breadcrumb>
    <p>Page 2 content.</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="page-content">
        <Routes>
          <Route exact={true} path="/" element={<ButtonExample />} />
          <Route exact={true} path="/page-one" element={<PageOne />} />
          <Route exact={true} path="/page-two" element={<PageTwo />} />
          </Routes>
      </div>
    );
  }
}

export default App;