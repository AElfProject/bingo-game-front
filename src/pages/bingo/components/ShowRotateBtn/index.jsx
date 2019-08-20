import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const RotateButton = props => {
  const {
    name, width, fontSize, tabIndex
  } = props;
  return (
    <div
      className="ShowBtnConfirm"
      role="button"
      tabIndex={tabIndex}
      onKeyDown={() => {}}
      style={{ width, height: width, fontSize }}
    >
      <span>
        {name}
      </span>
    </div>
  );
};


RotateButton.defaultProps = {
  name: '',
  width: '80px',
  tabIndex: 0,
  fontSize: '20px',
};

RotateButton.propTypes = {
  name: PropTypes.string,
  width: PropTypes.string,
  tabIndex: PropTypes.number,
  fontSize: PropTypes.string,
};
export default RotateButton;
