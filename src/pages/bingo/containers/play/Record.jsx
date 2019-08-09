import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

class Record extends React.Component {
  static defaultProps = {
    type: 'allRecords'
  }

  static propTypes = {
    type: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.allRecords = ['玩家', '余额', '投注次数'];
    this.myRecords = ['下注次数', '余额'];

    this.allRecordsData = {
      code: 0,
      msg: 'success',
      data: {
        total: 100,
        list: [{
          address: 'csoxW4vTJNT9gdvyWS6W7UqEdkSo9pWyJqBoGSnUHXVnj4ykJ',
          balance: 1231, // 余额
          times: 12321 // 次数
        }]
      }
    };

    this.myRecordsData = {
      code: 0,
      msg: 'success',
      data: {
        total: 100,
        list: [{
          time: 1, // 次序
          result: -100 // 结果
        }]
      }
    };
  }

  recordsMap = (type, info) => {
    let className = null;
    let title = [];

    if (type === 'allRecords') {
      title = this.allRecords;
      className = 'allRecords';
    } else if (type === 'myRecords') {
      title = this.myRecords;
      className = 'myRecords';
    }

    return (
      <>
        <div className={className}>
          {
            title.map(data => (<div key={data}>{data}</div>))
          }
        </div>
        {
          info.map(data => {
            const arr = Object.values(data);
            return (
              <div key={arr[0]} className={className}>
                {arr.map((d, i) => (<div key={`${arr[0] + i}`}>{d}</div>))}
              </div>
            );
          })
        }
      </>
    );
  }

  render() {
    const { type } = this.props;
    let info = null;
    if (type === 'allRecords') {
      info = this.allRecordsData.data.list;
    } else if (type === 'myRecords') {
      info = this.myRecordsData.data.list;
    }

    return this.recordsMap(type, info);
  }
}

export default Record;
