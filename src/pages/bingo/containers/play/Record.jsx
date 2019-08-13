import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

class Record extends React.Component {
  static defaultProps = {
    type: 'allRecords',
    info: []
  }

  static propTypes = {
    type: PropTypes.string,
    info: PropTypes.arrayOf(PropTypes.object)
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.allRecords = ['玩家', '余额', '投注次数'];
    this.myRecords = ['下注次数', '余额'];
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
    const { type, info } = this.props;
    return this.recordsMap(type, info);
  }
}

export default Record;
