import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import RotateButton from '../RotateButton';
import './index.less';

class InterfaceForRQAndMne extends React.Component {
  static defaultProps = {
    children: {},
    onDone: () => {},
    title: '',
    subtitle: '',
    t: () => {},
    btnName: '',
    center: false
  }

  static propTypes = {
    children: PropTypes.shape({
      props: PropTypes.object
    }),
    onDone: PropTypes.func,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    t: PropTypes.func,
    btnName: PropTypes.string,
    center: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      onDone, children, title, subtitle, btnName, t, center
    } = this.props;
    return (
      <>
        <div
          className="interface"
        >
          <div className="titleBar">
            <span className="titlefir">{`-${title}-`}</span>
            <span className="subtitle">{subtitle}</span>
          </div>

          <div className="contentShow" style={center ? { justifyContent: 'center' } : {}}>
            <div className="record-tl" />
            <div className="record-tr" />
            <div className="record-bl" />
            <div className="record-br" />

            {children}

          </div>

          <RotateButton name={btnName || t('done')} click={onDone} />
        </div>
      </>
    );
  }
}

export default withTranslation()(InterfaceForRQAndMne);
