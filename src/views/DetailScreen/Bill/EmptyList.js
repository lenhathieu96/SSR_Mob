import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BoldText} from '../../../Components/Text';

import styles from '../styles/index.css';

EmptyList.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

function EmptyList(props) {
  const {onNavigate} = props;
  return (
    <TouchableOpacity
      style={styles.emptyListContainer}
      onPress={() => onNavigate()}>
      <Icon name="plus-circle" size={36} color="#283593" />
      <BoldText style={styles.emptyListTitle}>Thêm Món Mới</BoldText>
    </TouchableOpacity>
  );
}

export default EmptyList;
