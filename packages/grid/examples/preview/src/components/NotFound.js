import React from 'react';
import { Link } from '@reach/router';

const { PATH_PREFIX = '' } = process.env;

export default function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>
        <Link to={`${PATH_PREFIX}/`}>Head back home</Link>
      </p>
    </div>
  );
}
