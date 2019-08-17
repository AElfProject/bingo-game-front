import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const Background = props => {
  const { children } = props;
  return (
    <div id="background">
      {children}
    </div>
  );
};


Background.defaultProps = {
  children: {}
};

Background.propTypes = {
  children: PropTypes.shape({
    props: PropTypes.object
  })
};
export default Background;
