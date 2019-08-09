import React from 'react';
import { connect } from 'react-redux';
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

class BingoGame extends React.Component {
  static defaultProps = {
    wallet: {
      address: 'csoxW4vTJNT9gdvyWS6W7UqEdkSo9pWyJqBoGSnUHXVnj4ykJ'
    },
  }

  static propTypes = {
    wallet: PropTypes.shape({
      address: PropTypes.string.isRequired
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

  componentWillMount() {

  }

  componentDidMount() {
    console.log(this.props);
    const { sha256 } = AElf.utils;
    const { wallet } = this.props;
    const aelf = new AElf(new AElf.providers.HttpProvider(localHttp));

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
      const { bingoGameContract } = this;

      bingoGameContract.Play({ value: inputCards })
        .then(result => bingoGameContract.Bingo(result.TransactionId))
        .then(
          this.getBalance
        )
        .then(difference => {
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
    }
  };

  // dispatch = () => {
  //   const { dispatch } = this.props;
  //   dispatch({ type: 'SERVICE_FETCH_LIST_SUCCESS', });
  // }

  render() {
    const {
      cards,
      loaded,
      inputCards,
      inputHasError,
      opening
    } = this.state;
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
                  { title: '所有记录', sub: '1' },
                  { title: '我的记录', sub: '2' },
                ]}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
              >
                <Record type="allRecords" />
                <Record type="myRecords" />
              </Tabs>
            </Flex>
          </Then>

          <Else><ActivityIndicator size="large" /></Else>
        </If>
        {/* <Button onClick={this.dispatch}>test</Button> */}
      </>
    );
  }
}

export default connect(
  state => state,
)(BingoGame);
