import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const RotateButton = props => {
  const {
    name, width, fontSize, tabIndex
  } = props;
  const style = {};
  if (width) {
    Object.assign(style, {
      width, height: width,
    });
  }
  if (fontSize) {
    style.fontSize = fontSize;
  }
  return (
    <div
      className="ShowBtnConfirm"
      role="button"
      tabIndex={tabIndex}
      onKeyDown={() => {}}
      style={style}
    >
      <span className="ShowBtnConfirmWord">
        {name}
      </span>
    </div>
  );
};


RotateButton.defaultProps = {
  width: '',
  tabIndex: 0,
  fontSize: '',
};

RotateButton.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  tabIndex: PropTypes.number,
  fontSize: PropTypes.string,
};
export default RotateButton;
