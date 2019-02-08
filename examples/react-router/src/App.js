import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Tabs, Tab } from 'carbon-components-react';
import { Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
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
      <h2>With tabs</h2>
      {children}
    </section>
  </div>
);

const TabOne = withRouter(({ history }) => (
  <Tabs selected={0}>
    <Tab onClick={() => history.push('/')} label="Tab 1">
      <div>Tab 1 content.</div>
    </Tab>
    <Tab onClick={() => history.push('/tab-two')} label="Tab 2" />
  </Tabs>
));

const TabTwo = withRouter(({ history }) => (
  <Tabs selected={1}>
    <Tab onClick={() => history.push('/')} label="Tab 1" />
    <Tab onClick={() => history.push('/tab-two')} label="Tab 2">
      <div>Tab 2 content.</div>
    </Tab>
  </Tabs>
));

const TabOneContent = () => (
  <LandingPage>
    <TabOne />
  </LandingPage>
);

const TabTwoContent = () => (
  <LandingPage>
    <TabTwo />
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
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="page-content">
        <Switch>
          <Route exact={true} path="/" component={TabOneContent} />
          <Route exact={true} path="/page-one" component={PageOne} />
          <Route exact={true} path="/page-two" component={PageTwo} />
          <Route exact={true} path="/tab-two" component={TabTwoContent} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
