import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import Text from '../../Components/Text';
import NumberText from '../../Components/NumberText';
import styles from './styles/index.css';

BottomSheetBody.propTypes = {};

function BottomSheetBody(props) {
  const {food} = props;
  return (
    <View style={styles.bottomSheetBody}>
      <Text>{food.name}</Text>
      <NumberText text={food.price} />
      <NumberText text={food.quantity} />
    </View>
  );
}

export default BottomSheetBody;
