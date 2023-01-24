import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import RepoPage from './RepoPage';
import { gql, useQuery } from '@apollo/client';
import { REPO_QUERY } from './RepoPage';

describe('RepoPage - ', () => {
  it('should show error UI -', async () => {
    const errorMocks = {
      request: {
        query: REPO_QUERY,
      },
      error: {
        message: new Error('An error occured'),
      },
    };

    render(
      <MockedProvider mocks={[errorMocks]} addTypename={false}>
        <RepoPage />
      </MockedProvider>
    );

    expect(
      await screen.findByText('Error! Error: An error occured')
    ).toBeInTheDocument();
    //There should be no table displayed in case of error conditions
    expect(document.getElementsByClassName('cds--data-table')).toHaveLength(0);
  });

  it('load carbon data table successfully -', async () => {
    const pendingMock = {
      request: {
        query: REPO_QUERY,
      },
      result: {
        data: {
          organization: {
            totalCount: 2,
            repositories: {
              __typename: 'RepositoryConnection',
              nodes: [
                {
                  createdAt: '2019-12-13T17:50:35Z',
                  description:
                    'Carbon Design System SVG icons as Svelte components',
                  homepageUrl: 'https://carbon-icons-svelte.onrender.com',
                  id: 'MDEwOlJlcG9zaXRvcnkyMjc4OTM4MjM=',
                  issues: {
                    totalCount: 5,
                    name: 'carbon-icons-svelte',
                    __typename: 'IssueConnection',
                  },
                  releases: {
                    totalCount: 24,
                    nodes: [
                      {
                        name: '',
                        __typename: 'Release',
                      },
                    ],
                    __typename: 'ReleaseConnection',
                  },
                  stargazers: {
                    totalCount: 321,
                  },
                  updatedAt: '2023-01-20T05:22:01Z',
                  url: 'https://github.com/carbon-design-system/carbon-icons-svelte',
                  name: 'carbon',
                  __typename: 'Repository',
                },
              ],

              totalCount: 1,
            },
            __typename: 'Organization',
          },
        },
      },
    };
    const container = render(
      <MockedProvider mocks={[pendingMock]} addTypename={false}>
        <RepoPage />
      </MockedProvider>
    );

    expect(await screen.findByText('Carbon Repositories')).toBeInTheDocument();

    //test for the presence of column names in the table header
    expect(await screen.findByText(/Name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Created/i)).toBeInTheDocument();
    expect(await screen.findByText(/Updated/i)).toBeInTheDocument();
    expect(await screen.findByText(/Open Issues/i)).toBeInTheDocument();
    expect(await screen.findByText(/Stars/i)).toBeInTheDocument();
    expect(await screen.findByText(/Links/i)).toBeInTheDocument();

    // There should be ONLY 1 table element
    //const table = await screen.findByText('table');
    expect(
      document.getElementsByClassName('cds--data-table-header')
    ).toHaveLength(1);

    // The table should have ONLY 1 thead element
    expect(document.getElementsByClassName('cds--data-table')).toHaveLength(1);
    // The table should have a thead and tbody tag
    expect(document.querySelector('thead')).toBeInTheDocument();
    expect(document.querySelector('tbody')).toBeInTheDocument();
    // Table should have 7 columns including one for row expand
    expect(document.querySelector('tr').childNodes).toHaveLength(Number(7));

    expect(await screen.findByText('carbon')).toBeInTheDocument();
  });
});
