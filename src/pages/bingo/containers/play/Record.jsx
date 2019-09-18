import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { PullToRefresh } from 'antd-mobile';
import './index.less';

class Record extends React.Component {
  static defaultProps = {
    type: 'allRecords',
    info: [],
    t: () => {},
    refresh: () => {}
  }

  static propTypes = {
    type: PropTypes.string,
    info: PropTypes.arrayOf(PropTypes.object),
    t: PropTypes.func,
    refresh: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  recordsMap = (type, info) => {
    let className = null;
    let title = [];
    let parameterName = null;
    const { t, refresh } = this.props;
    const { refreshing } = this.state;

    if (type === 'allRecords') {
      title = [t('player'), t('balance'), t('bets')];
      className = 'allRecords';
      parameterName = ['address', 'total', 'times'];
    } else if (type === 'myRecords') {
      title = [t('time'), t('result')];
      className = 'myRecords';
      parameterName = ['time', 'result'];
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
          <PullToRefresh
            className="recordContent"
            damping={60}
            indicator={
              { activate: t('pullRefresh'), deactivate: t('refreshImmediately'), finish: t('completeRefresh') }
            }
            direction="down"
            refreshing={refreshing}
            onRefresh={() => {
              this.setState({ refreshing: true });
              refresh()
                .then(() => {
                  this.setState({ refreshing: false });
                });
            }}
          >
            {
              info.map(data => (
                <div key={data[parameterName[0]]} className={className}>
                  {parameterName.map((d, i) => (<div key={`${data[parameterName[0]] + i}`}>{data[d]}</div>))}
                </div>
              ))
            }
          </PullToRefresh>
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
