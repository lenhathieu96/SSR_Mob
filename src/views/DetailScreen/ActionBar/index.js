import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {BoldText} from '../../../Components/Text';

import styles from '../styles/index.css';

ActionBar.propTypes = {
  index: PropTypes.number.isRequired,
  handleGoBack: PropTypes.func.isRequired,
};

function ActionBar(props) {
  const {index, handleGoBack} = props;

  return (
    <View style={styles.actionBarContainer}>
      <TouchableOpacity
        style={styles.actionBarBtn}
        onPress={() => handleGoBack()}>
        <Icon name="chevron-left" size={22} color="white" />
      </TouchableOpacity>
      <BoldText style={[styles.actionBarTitle]}>Bàn {index}</BoldText>
      <TouchableOpacity style={styles.actionBarBtn} />
    </View>
  );
}

export default ActionBar;
