import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import './index.less';

const RotateButton = props => {
  const {
    name, click, width, tabIndex, nameStyle, i18n: { language }
  } = props;
  return (
    <div
      className="btnConfirm"
      role="button"
      tabIndex={tabIndex}
      onClick={click}
      onKeyDown={() => {}}
      style={{ width, height: width }}
    >
      <div style={language === 'en' ? { width: 'auto' } : nameStyle}>
        {name}
      </div>
    </div>
  );
};


RotateButton.defaultProps = {
  name: '',
  click: () => {},
  width: '150px',
  tabIndex: 0,
  nameStyle: {},
  i18n: {
    language: 'zh'
  }
};

RotateButton.propTypes = {
  name: PropTypes.string,
  click: PropTypes.func,
  width: PropTypes.string,
  tabIndex: PropTypes.number,
  nameStyle: PropTypes.shape({
    width: PropTypes.string
  }),
  i18n: PropTypes.shape({
    language: PropTypes.string
  })
};
export default withTranslation()(RotateButton);
