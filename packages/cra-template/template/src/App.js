import React, { useState } from 'react';
import './App.scss';
import { Content, Theme } from '@carbon/react';
import AppHeader from './components/Header';
import HomePage from './content/HomePage/HomePage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RepoPage from './content/RepoPage';

function App() {
  const [appTheme, modifyAppTheme] = useState('white');
  const sendDataToParent = (value) => {
    modifyAppTheme(value);
  };

  return (
    <Theme theme={appTheme}>
      <AppHeader sendDataToParent={sendDataToParent} />
      <Content>
        <Router>
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/repopage'} element={<RepoPage />} />
          </Routes>
        </Router>
      </Content>
    </Theme>
  );
}

export default App;
