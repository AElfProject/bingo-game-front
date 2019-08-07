/**
 * @file App.jsx
 * @author atom-yang
 */
import React from 'react';
import AElf from 'aelf-sdk/dist/aelf.umd';
import { request } from '../../common/request';
import './index.less';

import BingoGame from './containers/play';

const defaultPrivateKey = 'a59c14882c023d63e84e5faf36558fdc8dbf1063eed45ce7e507f1cd9bcde1d9';
const wallet = AElf.wallet.getWalletByPrivateKey(defaultPrivateKey);

request('/api/test', {
  test: 1321,
  dadd: {
    dasd: 131
  }
}, {
  method: 'get'
}).then(console.log).catch(console.log);

const app = () => (
  <div>
    <BingoGame wallet={wallet} />
    {/* <div className="index-container">
      游戏首页
      <Button>按钮</Button>
    </div> */}
  </div>
);
export default React.memo(app);
