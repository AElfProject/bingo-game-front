import React from 'react';
import { NavBar, Icon, Popover } from 'antd-mobile';

const { Item } = Popover;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleVisibleChange = visible => {
    console.log('visible', visible);
    this.setState({
      visible,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <NavBar
        mode="light"
        rightContent={(
          <Popover
            visible={visible}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            mask="true"
            overlay={[
              (<Item key="5" value="备份助记词">备份助记词</Item>),
              (<Item key="6" value="退出账户"><span style={{ marginRight: 5 }}>中/EN</span></Item>)
            ]}
          >
            <Icon key="1" type="ellipsis" />
          </Popover>
        )}
      />
    );
  }
}

export default Navigation;
