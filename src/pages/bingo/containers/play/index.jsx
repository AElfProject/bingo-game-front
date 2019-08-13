import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from 'store2';
import {
  Flex, List, InputItem, WhiteSpace, Button, Toast, ActivityIndicator, Modal, Tabs
} from 'antd-mobile';
import { If, Then, Else } from 'react-if';
import AElf from 'aelf-sdk';
import PropTypes from 'prop-types';
import { localHttp } from '../../common/constants';
import './index.less';
import Record from './Record';
import Navigation from '../../components/Navigation';
import { STORE_KEY } from '../../../../common/constants';
import { getTopRecords, getPersonalRecords, getRecordsResult } from '../../actions/recordinfo';

class BingoGame extends React.Component {
  static defaultProps = {
    wallet: {
      address: 'csoxW4vTJNT9gdvyWS6W7UqEdkSo9pWyJqBoGSnUHXVnj4ykJ'
    },
    getTopRecords: () => {},
    getPersonalRecords: () => {},
    getRecordsResult: () => {},

    recordInfo: {
      personalRecords: {
        list: []
      },
      topRecords: {
        list: []
      },
    }
  }

  static propTypes = {
    wallet: PropTypes.shape({
      address: PropTypes.string.isRequired
    }),
    getTopRecords: PropTypes.func,
    getPersonalRecords: PropTypes.func,
    getRecordsResult: PropTypes.func,
    recordInfo: PropTypes.shape({
      personalRecords: PropTypes.shape({
        list: PropTypes.array
      }),
      topRecords: PropTypes.shape({
        list: PropTypes.array
      })
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      // When the contract is awarded, the page can be displayed
      // loaded: false,
      loaded: true,
      cards: 0,
      // Determine whether the input is correct
      inputHasError: false,
      errorMessage: 'Please enter a positive integer',
      inputCards: 0,
      // When the bingo game starts to run, it becomes true
      opening: false,
    };

    this.multiTokenContract = null;
    this.bingoGameContract = null;
  }

  componentDidMount() {
    console.log('play', this.props);

    const { sha256 } = AElf.utils;
    const { wallet, getTopRecords: topRecords, getPersonalRecords: personalRecords } = this.props;
    const aelf = new AElf(new AElf.providers.HttpProvider(localHttp));

    // get all records;
    topRecords();
    personalRecords({
      address: store.get(STORE_KEY.ADDRESS),
      pageNum: 1,
      pageSize: 20
    });

    aelf.chain.getChainStatus()
      .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
      .then(zeroC => Promise.all([
        zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Token')),
        zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.BingoGameContract'))
      ]))
      .then(([tokenAddress, bingoAddress]) => Promise.all([
        aelf.chain.contractAt(tokenAddress, wallet),
        aelf.chain.contractAt(bingoAddress, wallet)
      ]))
      .then(([multiTokenContract, bingoGameContract]) => {
        Object.assign(this, { multiTokenContract, bingoGameContract });
        this.setState({ loaded: true }, this.getBalance);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getBalance = () => {
    const { wallet } = this.props;
    const payload = {
      symbol: 'CARD',
      owner: wallet.address
    };
    return this.multiTokenContract.GetBalance.call(payload)
      .then(result => {
        const { cards } = this.state;
        this.setState({
          cards: result.balance
        });
        return result.balance - cards;
      })
      .catch(err => {
        console.log(err);
      });
  }

  cardChange = inputCards => {
    const { cards } = this.state;
    const reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
    if (!reg.test(inputCards)) {
      this.setState({
        inputHasError: true,
        errorMessage: 'Please enter the amount in the correct format'
      });
    } else if (cards - inputCards < 0) {
      this.setState({
        inputHasError: true,
        errorMessage: 'You don\'t have so many cards'
      });
    } else {
      this.setState({
        inputHasError: false
      });
    }

    this.setState({ inputCards });
  };

  onErrorClick = () => {
    const { inputHasError } = this.state;
    if (inputHasError) {
      const { errorMessage } = this.state;
      Toast.info(errorMessage);
    }
  };

  setNumber = value => {
    const { cards } = this.state;
    let inputCards = 0;
    switch (value) {
      case 100:
        inputCards = 100;
        break;
      case 500:
        inputCards = 500;
        break;
      case 'Half':
        inputCards = parseInt(cards / 2, 10);
        break;
      case 'All-In':
        inputCards = parseInt(cards, 10);
        break;
      default:
        inputCards = 0;
    }
    this.setState({ inputCards, inputHasError: false });
  };

  bingoClick = () => {
    const { inputHasError } = this.state;

    if (inputHasError) {
      const { errorMessage } = this.state;
      Toast.info(errorMessage);
    } else {
      this.setState({
        opening: true
      });
      const { inputCards } = this.state;

      // local chain contract start
      const { bingoGameContract } = this;


      bingoGameContract.Play({ value: inputCards })
        .then(result => bingoGameContract.Bingo(result.TransactionId))
        .then(
          this.getBalance
        )
        .then(async difference => {
          const {
            getTopRecords: topRecords, getRecordsResult: recordsResult, getPersonalRecords: personalRecords
          } = this.props;

          await recordsResult({
            result: difference,
            address: store.get(STORE_KEY.ADDRESS)
          });

          personalRecords({
            address: store.get(STORE_KEY.ADDRESS),
            pageNum: 1,
            pageSize: 20
          });
          topRecords();

          let info = null;
          if (difference >= 0) {
            info = `+ ${difference} CARD`;
          } else if (difference < 0) {
            info = `- ${-difference} CARD`;
          }

          const { cards } = this.state;
          Modal.alert(info, `当前账户余额：${cards} CARD`);
          this.setState({
            opening: false
          });
        })
        .catch(err => {
          this.setState({
            opening: false
          });
          console.log(err);
        });
      // local chain contract end
    }
  };

  tabChange = tab => {
    const { getTopRecords: topRecords, getPersonalRecords: personalRecords } = this.props;
    switch (tab.sub) {
      case 'allRecords':
        topRecords();
        break;
      case 'myRecords':
        personalRecords({
          address: store.get(STORE_KEY.ADDRESS),
          pageNum: 1,
          pageSize: 20
        });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      cards,
      loaded,
      inputCards,
      inputHasError,
      opening
    } = this.state;

    const {
      recordInfo: {
        personalRecords: {
          list: personalData
        },
        topRecords: {
          list: topData
        },
      }
    } = this.props;
    return (
      <>
        <Navigation title="Bingo" type="play" />
        <If condition={loaded}>
          <Then>
            <Flex justify="center" direction="column">
              <h1>BingoGame</h1>
              <h2>
              Your CARD: $
                {`${cards} `}
              CARD
              </h2>
              <List id="inputList">
                <InputItem
                  type="money"
                  value={inputCards}
                  placeholder="Subscription amount"
                  clear
                  autoAdjustHeight
                  onChange={this.cardChange}
                  error={inputHasError}
                  onErrorClick={this.onErrorClick}
                  disabled={opening}
                />
              </List>

              <WhiteSpace size="lg" />

              <Flex justify="between">
                <Button
                  size="small"
                  onClick={() => {
                    this.setNumber(100);
                  }}
                  disabled={opening}
                >
                100
                </Button>
                <Button
                  size="small"
                  disabled={opening}
                  onClick={() => this.setNumber(500)}
                >
                500
                </Button>
                <Button
                  size="small"
                  disabled={opening}
                  onClick={() => this.setNumber('Half')}
                >
                Half
                </Button>
                <Button
                  size="small"
                  disabled={opening}
                  onClick={() => this.setNumber('All-In')}
                >
                All-in
                </Button>
              </Flex>

              <WhiteSpace size="lg" />

              <Button
                loading={opening}
                disabled={opening || inputHasError}
                onClick={this.bingoClick}
                className="btnStyle"
              >
                Bingo
              </Button>

              <WhiteSpace size="lg" />

              <Tabs
                tabs={[
                  { title: '所有记录', sub: 'allRecords' },
                  { title: '我的记录', sub: 'myRecords' },
                ]}
                initialPage={0}
                onChange={this.tabChange}
                // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
              >
                <Record type="allRecords" info={topData} />
                <Record type="myRecords" info={personalData} />
              </Tabs>
            </Flex>
          </Then>

          <Else><ActivityIndicator size="large" /></Else>
        </If>
      </>
    );
  }
}

const mapStateToProps = state => ({
  recordInfo: state.recordInfo
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getTopRecords, getPersonalRecords, getRecordsResult
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BingoGame);
