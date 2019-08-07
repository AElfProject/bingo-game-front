import React from 'react';
import { NavBar, Icon } from 'antd-mobile';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavBar
        mode="light"
        rightContent={[
          <Icon key="1" type="ellipsis" />
        ]}
      />
    );
  }
}

export default Navigation;
