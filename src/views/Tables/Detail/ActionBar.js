import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

ActionBar.propTypes = {
  index: PropTypes.number.isRequired,
  handleGoBack: PropTypes.func.isRequired,
};

function ActionBar(props) {
  const {index, handleGoBack} = props;
  return (
    <View style={styles.actionBar__container}>
      <TouchableOpacity
        style={styles.actionBar__btn}
        onPress={() => handleGoBack()}>
        <Icon name="chevron-left" size={22} color="white" />
      </TouchableOpacity>
      <Text style={styles.actionBar__title}>Bàn {index}</Text>
      <TouchableOpacity style={styles.actionBar__btn} />
    </View>
  );
}

export default ActionBar;
const styles = StyleSheet.create({
  actionBar__container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 0.1,
  },
  actionBar__title: {
    fontSize: 22,
    fontFamily: 'MavenPro-Bold',
    flex: 0.9,
    color: 'white',
    textAlign: 'center',
  },
  actionBar__btn: {
    flex: 0.1,
    marginLeft: 10,
  },
});
