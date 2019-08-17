import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import './index.less';

class Record extends React.Component {
  static defaultProps = {
    type: 'allRecords',
    info: [],
    t: () => {}
  }

  static propTypes = {
    type: PropTypes.string,
    info: PropTypes.arrayOf(PropTypes.object),
    t: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  recordsMap = (type, info) => {
    let className = null;
    let title = [];
    const { t } = this.props;

    if (type === 'allRecords') {
      title = [t('player'), t('balance'), t('bets')];
      className = 'allRecords';
    } else if (type === 'myRecords') {
      title = [t('bets'), t('balance')];
      className = 'myRecords';
    }

    return (
      <div className="record">
        <div className={`${className} recordTitle`}>
          {
            title.map(data => (<div key={data}>{data}</div>))
          }
        </div>
        <div className="recordShow">
          <div className="record-tl" />
          <div className="record-tr" />
          <div className="record-bl" />
          <div className="record-br" />
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
        </div>
      </div>
    );
  }

  render() {
    const { type, info } = this.props;
    return this.recordsMap(type, info);
  }
}

export default withTranslation()(Record);
