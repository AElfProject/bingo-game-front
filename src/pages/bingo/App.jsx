/**
 * @file App.jsx
 * @author atom-yang
 */
import React from 'react';
import { Button } from 'antd-mobile';
import './index.less';

const app = () => (
  <div>
    <div className="index-container">
      游戏首页
      <Button>按钮</Button>
    </div>
  </div>
);
export default React.memo(app);
