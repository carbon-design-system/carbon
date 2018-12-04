import React from 'react';
import { Router, Link } from '@reach/router';
import ExamplesPage from './ExamplesPage';
import BasicUsagePage from './BasicUsagePage';
import OffsetPage from './OffsetPage';
import PaddingPage from './PaddingPage';
import BleedPage from './BleedPage';
import CondensedPage from './CondensedPage';
import HangPage from './HangPage';
import AspectRatioPage from './AspectRatioPage';
import FullBleedPage from './FullBleedPage';
import NotFound from './NotFound';

const { PATH_PREFIX = '' } = process.env;

export default function App() {
  return (
    <Router>
      <ExamplesPage path={PATH_PREFIX === '' ? '/' : PATH_PREFIX} />
      <BasicUsagePage path={`${PATH_PREFIX}/basic`} />
      <OffsetPage path={`${PATH_PREFIX}/offset`} />
      <PaddingPage path={`${PATH_PREFIX}/padding`} />
      <BleedPage path={`${PATH_PREFIX}/bleed`} />
      <CondensedPage path={`${PATH_PREFIX}/condensed`} />
      <HangPage path={`${PATH_PREFIX}/hang`} />
      <AspectRatioPage path={`${PATH_PREFIX}/aspect-ratio`} />
      <FullBleedPage path={`${PATH_PREFIX}/full-bleed`} />
      <NotFound default />
    </Router>
  );
}
