import React from 'react';
import './index.less';

function CopyRight() {
  return (
    <p className="text-center copyright-container">
      <a className="official-website-link" href="https://aelf.io/">
        {`Copyright © ${new Date().getFullYear()} ælf`}
      </a>
    </p>
  );
}

export default React.memo(CopyRight);
