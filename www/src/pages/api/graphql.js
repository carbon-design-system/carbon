/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../graphql';

const server = new ApolloServer({
  schema,
});
const start = server.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function graphqlHandler(req, res) {
  await start;

  const handler = server.createHandler({
    path: '/api/graphql',
  });

  if (req.method === 'OPTIONS') {
    res.send('OK');
    return;
  }

  return await handler(req, res);
}
