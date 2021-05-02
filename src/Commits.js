import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { octokit, REPO, REPO_OWNER } from './client';

export const Commits = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    octokit
      .request('GET /repos/{owner}/{repo}/commits', {
        owner: REPO_OWNER,
        repo: REPO,
      })
      .then((response) => setData(response.data));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'commit.author.date',
      },
      {
        Header: 'Hash',
        accessor: 'sha',
      },
      {
        Header: 'Message',
        accessor: 'commit.message',
      },
      {
        Header: 'Author',
        accessor: 'author.login',
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="container column-display">
      <h1 className="title">Commits</h1>
      <hr />
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Commits;