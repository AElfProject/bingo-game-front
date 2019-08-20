import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { useTranslation } from 'react-i18next';
import RotateButton from '../../components/RotateButton';

const RegisterModal = props => {
  const {
    confirm, nth
  } = props;
  const { t } = useTranslation();
  const { address } = props;
  return (
    <div className="registerModal">
      <div className="modalTitle">
        <span>
          -
          {t('registerSuccessTitle')}
          -
        </span>
      </div>
      {/* modelContent Positioning in absolute positioning, width & height are fixed */}
      <div className="modalContent">
        <div>
          {t('registerSuccessInfoFir')}
        </div>
        <div className="modal-info-1">
          {t('registerSuccessInfoSec')}
        </div>
        <div className="modal-info-2">{nth}</div>
        <div>
          {t('registerSuccessInfoThird')}
        </div>
        <div className="modal-info-4">
          ——
          {t('address')}
          ——
        </div>
        <div className="addressShow">
          {address}
        </div>
      </div>
      <RotateButton
        name={t('startGame')}
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


RegisterModal.defaultProps = {
  confirm: () => {},
  nth: 0,
  address: ''
};

RegisterModal.propTypes = {
  confirm: PropTypes.func,
  nth: PropTypes.number,
  address: PropTypes.string
};
export default RegisterModal;
