import React from 'react';
import PropTypes from 'prop-types';
import styles from './VehicleInfoPeace.module.scss';

const VehicleInfoPeace = ({ label, info }) => (
  <div className={styles.vip}>
    <div>
      {label}
      :
    </div>
    <div>{info}</div>
  </div>
);

VehicleInfoPeace.defaultProps = { info: 'No informarion' };

VehicleInfoPeace.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string
};

export default VehicleInfoPeace;
