import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { useTranslation } from 'react-i18next';
import { If, Then } from 'react-if';
import RotateButton from '../RotateButton';

const ModalContent = props => {
  const {
    confirm, children, title, btnName
  } = props;
  const { t } = useTranslation();
  return (
    <div className="modalContent">
      <If condition={title}>
        <Then>
          <div className="modalTitle">
            <span>
              -
              {t('registerSuccessTitle')}
              -
            </span>
          </div>
        </Then>
      </If>
      {/* modelContent Positioning in absolute positioning, width & height are fixed */}
      <div className="content">
        {children}
      </div>
      <RotateButton
        name={btnName || t('startGame')}
        width="110px"
        nameStyle={{
          fontSize: '15px',
          width: '30px'
        }}
        click={confirm}
      />
    </div>
  );
};


ModalContent.defaultProps = {
  confirm: () => {},
  children: {},
  title: false,
  btnName: null
};

ModalContent.propTypes = {
  confirm: PropTypes.func,
  children: PropTypes.shape({
    props: PropTypes.object
  }),
  title: PropTypes.bool,
  btnName: PropTypes.string
};
export default ModalContent;
