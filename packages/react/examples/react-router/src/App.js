import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ClickableTile,
  Column,
  Content,
  Grid,
  Header,
  HeaderContainer,
  HeaderMenu,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  Heading,
  SkipToContent,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@carbon/react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.scss';

function Homepage() {
  return (
    <>
      <Heading>Welcome!</Heading>
      <br />
      <p>
        This is the home page, you can navigate to different routes using the
        header.
      </p>
    </>
  );
}

const tabs = [
  {
    id: 'tab-one',
    label: 'Tab one',
    content: 'This is tab one',
  },
  {
    id: 'tab-two',
    label: 'Tab two',
    content: 'This is tab two',
  },
];

function PageOne() {
  const navigate = useNavigate();
  const params = useParams();
  const selectedIndex = tabs.findIndex((tab) => params.tabId === tab.id);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage={selectedIndex < 0}>
          <Link to="/page-one">Page one</Link>
        </BreadcrumbItem>
        {selectedIndex >= 0 && (
          <BreadcrumbItem isCurrentPage>
            {tabs[selectedIndex].label}
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Heading>Page one</Heading>
      <br />
      <p>Click on a tab to check the navigation</p>
      <br />
      <Tabs selectedIndex={selectedIndex}>
        <TabList aria-label="Page one tabs">
          {tabs.map((tab) => (
            <Tab key={tab.id} onClick={() => navigate(`/page-one/${tab.id}`)}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}

function PageTwo() {
  const navigate = useNavigate();

  return (
    <>
      <Heading>Page two</Heading>
      <br />
      <section>
        <Button as={Link} to="/">
          Return to home page
        </Button>
      </section>
      <br />
      <section>
        <Grid narrow>
          <Column lg={4}>
            <ClickableTile onClick={() => navigate('/page-one/tab-one')}>
              Go to Tab one on Page one
            </ClickableTile>
          </Column>
          <Column lg={4}>
            <ClickableTile onClick={() => navigate('/page-one/tab-two')}>
              Go to Tab two on Page one
            </ClickableTile>
          </Column>
        </Grid>
      </section>
    </>
  );
}

function renderUI() {
  return (
    <>
      <Header>
        <SkipToContent />
        <HeaderName as={Link} to="/">
          [Platform]
        </HeaderName>
        <HeaderNavigation>
          <HeaderMenu menuLinkName="Page one">
            <HeaderMenuItem as={Link} to="/page-one">
              No Tab selected
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} to="/page-one/tab-one">
              Tab one
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} to="/page-one/tab-two">
              Tab two
            </HeaderMenuItem>
          </HeaderMenu>
          <HeaderMenuItem as={Link} to="/page-two">
            Page two
          </HeaderMenuItem>
        </HeaderNavigation>
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/page-one/:tabId?" element={<PageOne />} />
          <Route path="/page-two" element={<PageTwo />} />
        </Routes>
      </Content>
    </>
  );
}

function App() {
  return <HeaderContainer render={renderUI} />;
}

export default App;
