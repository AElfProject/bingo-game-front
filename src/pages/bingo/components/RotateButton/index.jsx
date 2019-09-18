import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import './index.less';

const RotateButton = props => {
  const {
    name, click, tabIndex, i18n: { language }, className, size, type
  } = props;
  return (
    <div
      className={`${className} btnConfirm${size === 'small' ? ' btnSmall' : ''}`}
      role="button"
      tabIndex={tabIndex}
      onClick={click}
      onKeyDown={() => {}}
    >
      <div className="btnConfirmWord" style={language === 'en' || type === 'en' ? { width: 'auto' } : {}}>
        {name}
      </div>
    </div>
  );
};


RotateButton.defaultProps = {
  tabIndex: 0,
  i18n: {
    language: 'zh'
  },
  className: '',
  size: 'normal',
  type: 'zh'
};

RotateButton.propTypes = {
  name: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
  i18n: PropTypes.shape({
    language: PropTypes.string
  }),
  className: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string
};
export default withTranslation()(RotateButton);
