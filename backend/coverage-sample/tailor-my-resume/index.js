import React, { useEffect } from 'react';
import './prettify.css';
import './base.css';

const CodeCoverageReport = () => {
  useEffect(() => {
    // Ensure prettyPrint and other scripts run on component mount
    if (window.prettyPrint) {
      window.prettyPrint();
    }
    if (window.sorter) {
      window.sorter.init();
    }
    if (window.blockNavigation) {
      window.blockNavigation();
    }
  }, []);

  return (
    <div>
      <div className='wrapper'>
        <div className='pad1'>
          <h1>
            <a href='../index.html'>All files</a> tailor-my-resume
          </h1>
          <div className='clearfix'>
            <div className='fl pad1y space-right2'>
              <span className='strong'>87.09% </span>
              <span className='quiet'>Statements</span>
              <span className='fraction'>27/31</span>
            </div>

            <div className='fl pad1y space-right2'>
              <span className='strong'>50% </span>
              <span className='quiet'>Branches</span>
              <span className='fraction'>2/4</span>
            </div>

            <div className='fl pad1y space-right2'>
              <span className='strong'>50% </span>
              <span className='quiet'>Functions</span>
              <span className='fraction'>2/4</span>
            </div>

            <div className='fl pad1y space-right2'>
              <span className='strong'>87.09% </span>
              <span className='quiet'>Lines</span>
              <span className='fraction'>27/31</span>
            </div>
          </div>
          <p className='quiet'>
            Press <em>n</em> or <em>j</em> to go to the next uncovered block,{' '}
            <em>b</em>, <em>p</em> or <em>k</em> for the previous block.
          </p>
          <div className='quiet'>
            Filter:
            <input
              onInput={() => {
                if (window.onInput) {
                  window.onInput();
                }
              }}
              type='search'
              id='fileSearch'
            />
          </div>
        </div>
        <div className='status-line high'></div>
        <div className='pad1'>
          <table className='coverage-summary'>
            <thead>
              <tr>
                <th
                  data-col='file'
                  data-fmt='html'
                  data-html='true'
                  className='file'
                >
                  File
                </th>
                <th
                  data-col='pic'
                  data-type='number'
                  data-fmt='html'
                  data-html='true'
                  className='pic'
                ></th>
                <th
                  data-col='statements'
                  data-type='number'
                  data-fmt='pct'
                  className='pct'
                >
                  Statements
                </th>
                <th
                  data-col='statements_raw'
                  data-type='number'
                  data-fmt='html'
                  className='abs'
                ></th>
                <th
                  data-col='branches'
                  data-type='number'
                  data-fmt='pct'
                  className='pct'
                >
                  Branches
                </th>
                <th
                  data-col='branches_raw'
                  data-type='number'
                  data-fmt='html'
                  className='abs'
                ></th>
                <th
                  data-col='functions'
                  data-type='number'
                  data-fmt='pct'
                  className='pct'
                >
                  Functions
                </th>
                <th
                  data-col='functions_raw'
                  data-type='number'
                  data-fmt='html'
                  className='abs'
                ></th>
                <th
                  data-col='lines'
                  data-type='number'
                  data-fmt='pct'
                  className='pct'
                >
                  Lines
                </th>
                <th
                  data-col='lines_raw'
                  data-type='number'
                  data-fmt='html'
                  className='abs'
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='file high' data-value='db.js'>
                  <a href='db.js.html'>db.js</a>
                </td>
                <td data-value='85.71' className='pic high'>
                  <div className='chart'>
                    <div className='cover-fill' style={{ width: '85%' }}></div>
                    <div
                      className='cover-empty'
                      style={{ width: '15%' }}
                    ></div>
                  </div>
                </td>
                <td data-value='85.71' className='pct high'>
                  85.71%
                </td>
                <td data-value='14' className='abs high'>
                  12/14
                </td>
                <td data-value='50' className='pct medium'>
                  50%
                </td>
                <td data-value='4' className='abs medium'>
                  2/4
                </td>
                <td data-value='100' className='pct high'>
                  100%
                </td>
                <td data-value='2' className='abs high'>
                  2/2
                </td>
                <td data-value='85.71' className='pct high'>
                  85.71%
                </td>
                <td data-value='14' className='abs high'>
                  12/14
                </td>
              </tr>
              <tr>
                <td className='file high' data-value='index.js'>
                  <a href='index.js.html'>index.js</a>
                </td>
                <td data-value='88.23' className='pic high'>
                  <div className='chart'>
                    <div className='cover-fill' style={{ width: '88%' }}></div>
                    <div
                      className='cover-empty'
                      style={{ width: '12%' }}
                    ></div>
                  </div>
                </td>
                <td data-value='88.23' className='pct high'>
                  88.23%
                </td>
                <td data-value='17' className='abs high'>
                  15/17
                </td>
                <td data-value='100' className='pct high'>
                  100%
                </td>
                <td data-value='0' className='abs high'>
                  0/0
                </td>
                <td data-value='0' className='pct low'>
                  0%
                </td>
                <td data-value='2' className='abs low'>
                  0/2
                </td>
                <td data-value='88.23' className='pct high'>
                  88.23%
                </td>
                <td data-value='17' className='abs high'>
                  15/17
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='push'></div>
      </div>
      <div className='footer quiet pad2 space-top1 center small'>
        Code coverage generated by
        <a href='https://istanbul.js.org/' target='_blank' rel='noopener noreferrer'>
          istanbul
        </a>{' '}
        at 2024-02-07T14:13:32.881Z
      </div>
    </div>
  );
};

export default CodeCoverageReport;
