import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';

import { octokit, REPO, REPO_OWNER } from './client';

export const PullRequests = () => {
  const [data, setData] = useState([]);
  const [commentPull, setCommentPull] = useState();

  const onModalOpen = (pull) => {
    setCommentPull(pull);
  };
  const onModalClose = () => {
    setCommentPull(null);
  };

  const onAddComment = () => {
    octokit
      .request(`POST ${commentPull}/comments`, {
        body: editorRef.current.getContent(),
        position: 0,
      })
      .then(() => {
        alert('Comment added');
      });
  };

  useEffect(() => {
    octokit
      .request('GET /repos/{owner}/{repo}/pulls', {
        owner: REPO_OWNER,
        repo: REPO,
        state: 'all',
      })
      .then((response) => setData(response.data));
  }, []);

  const editorRef = useRef(null);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'updated_at',
      },
      {
        Header: 'Base',
        accessor: 'base.label',
      },
      {
        Header: 'Head',
        accessor: 'head.label',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'View',
        accessor: 'html_url',
        Cell: (cell) => {
          return (
            <a href={cell.value} target="_blank">
              view
            </a>
          );
        },
      },
      {
        Header: 'Comment',
        accessor: 'url',
        Cell: (cell) => {
          return (
            <button
              onClick={() => {
                onModalOpen(cell.value);
              }}
            >
              Add comment
            </button>
          );
        },
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
      <Modal
        isOpen={!!commentPull}
        onRequestClose={onModalClose}
        contentLabel="Add Comment"
      >
        <h2>Comment on pull request</h2>
        <button onClick={onModalClose}>close</button>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
        <button onClick={onAddComment}>Add comment</button>
      </Modal>
    </div>
  );
};

export default PullRequests;
