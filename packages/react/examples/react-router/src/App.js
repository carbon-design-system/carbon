import React from 'react';
import { Breadcrumb, BreadcrumbItem, Tabs, Tab, TabList, TabPanel, TabPanels, Content } from '@carbon/react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
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

const TabOne = () => {
  let navigate = useNavigate();
  return (
  <Tabs selectedIndex={0}>
        <TabList aria-label='Tab list'>
      <Tab onClick={() => navigate('/')}>Tab 1</Tab>
      <Tab onClick={() => navigate('/tab-two')}>Tab 2</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <div>Tab 1 content.</div>
      </TabPanel>
      <TabPanel/>
    </TabPanels>
  </Tabs>
)};

const TabTwo = () => {
  let navigate = useNavigate();
  
  return (
  <Tabs selectedIndex={1}>
    <TabList aria-label='Tab list'>
      <Tab onClick={() => navigate('/')}>Tab 1</Tab>
      <Tab onClick={() => navigate('/tab-two')}>Tab 2</Tab>
    </TabList>
    <TabPanels>
      <TabPanel/>
      <TabPanel>
        <div>Tab 2 content.</div>
      </TabPanel>
    </TabPanels>
  </Tabs>
)};

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

function App() {
  return (
    <Content className='page-content'>
      <Routes>
        <Route path="/" element={<TabOneContent />} />
        <Route path="/page-one" element={<PageOne />} />
        <Route path="/page-two" element={<PageTwo />} />
        <Route path="/tab-two" element={<TabTwoContent />} />
      </Routes>
    </Content>
  );
}

export default App;
