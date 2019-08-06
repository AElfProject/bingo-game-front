/**
 * @file App.jsx
 * @author atom-yang
 */
import React from 'react';
import { Button } from 'antd-mobile';
import { request } from '../../common/request';
import './index.less';

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
    <div className="index-container">
      游戏首页
      <Button>按钮</Button>
    </div>
  </div>
);
export default React.memo(app);
