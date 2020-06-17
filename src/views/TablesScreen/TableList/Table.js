import React from 'react';

import {TouchableOpacity} from 'react-native';
import {BoldText} from '../../../Components/Text';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../styles/index.css';

function Table(props) {
  const {tableDetail} = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={
        Object.keys(tableDetail).length > 1
          ? styles.itemTableContainer__used
          : styles.itemTableContainer
      }
      onPress={() => navigation.navigate('Detail', {tableDetail})}>
      <Icon name="utensils" style={styles.icon} />
      <BoldText style={styles.title}>Bàn {tableDetail.Table}</BoldText>
    </TouchableOpacity>
  );
}

export default Table;
