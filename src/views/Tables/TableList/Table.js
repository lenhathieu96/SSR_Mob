import React from 'react';

import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const containerSize = windowWidth > 850 ? 0.3 * windowWidth : 0.4 * windowWidth;

function Table(props) {
  const {index} = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Detail', {tableIndex: index + 1})}>
      <Icon name="utensils" style={styles.icon} />
      <Text style={styles.title}>Bàn {index + 1}</Text>
    </TouchableOpacity>
  );
}

export default Table;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 1, 0.151)',
    borderWidth: 1,
    height: containerSize,
    width: containerSize,
  },

  icon: {
    color: '#283593',
    fontSize: 48,
  },

  title: {
    fontFamily: 'MavenPro-Regular',
    fontSize: 24,
    color: '#283593',
    fontWeight: 'bold',
  },
});
