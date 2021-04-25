import React, { useEffect, useState,useRef } from 'react';
import { useTable } from 'react-table';
import tinymce from 'tinymce/tinymce';

import 'tinymce/plugins/code';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/table';
import 'tinymce/plugins/textcolor';

import { octokit } from './client';

export const PullRequests = () => {
  const [data, setData] = useState([
    {
      createdAt: '',
    },
  ]);

  useEffect(() => {
    octokit
      .request('GET /repos/{owner}/{repo}/commits', {
        owner: 'akash-rajput',
        repo: 'code-splitting',
      })
      .then((response) => setData(response.data));


      tinymce.init({
        selector: `#editor`,
        content_style:
          '.mce-content-body {font-size:12px;font-family:Arial,sans-serif;}',
        height: 500,
        width: 754,
        skin_url: `/skins/lightgray`,
        toolbar1: `undo redo | formatselect | bold italic strikethrough
          forecolor backcolor | link |
          alignleft aligncenter alignright alignjustify |
          numlist bullist outdent indent |
          removeformat | fontselect | fontsizeselect | ${toolbar}`,
        plugins: 'code table lists colorpicker textcolor pagebreak',
        fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
        setup: editor => {
        },
      });
  }, []);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
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
      <h1 className="title">Pull Requests</h1>
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
      <div
      >
        <textarea id="editor" />
        <label>

        </label>
        <div id="editor-modal" />
      </div>
       <button onClick={log}>Log editor content</button>
    </div>
  );
};

export default PullRequests;