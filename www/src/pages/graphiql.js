/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'graphiql/graphiql.css';

import GraphiQL from 'graphiql';

export default function GraphiQLPage() {
  return (
    <GraphiQL
      fetcher={async (graphQLParams, headers) => {
        const data = await fetch('/api/graphql', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify(graphQLParams),
          credentials: 'same-origin',
        });
        return data.json().catch(() => data.text());
      }}
    />
  );
}
