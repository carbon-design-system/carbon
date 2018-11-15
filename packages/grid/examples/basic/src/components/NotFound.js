import React from 'react';
import { Link } from '@reach/router';

export default function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>
        <Link to="/">Head back home</Link>
      </p>
    </div>
  );
}
