import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput} from 'react-native';

import IconButton from '../../Components/IconButton';
import Text from '../../Components/Text';
import NumberText from '../../Components/NumberText';
import TextButton from '../../Components/TextButton';

import styles from './styles/index.css';

BottomSheetBody.propTypes = {};

function BottomSheetBody(props) {
  const {food, onIncreaseFood, onDecreaseFood, onAddNewFood} = props;

  const [note, setNote] = useState('');

  return (
    <View style={styles.bottomSheetBody}>
      <View style={{flex: 0.9, justifyContent: 'flex-start'}}>
        <View style={{flex: 0.4, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.bottomSheetTitle}>{food.name}</Text>
            <NumberText
              value={food.totalPrice}
              style={styles.bottomSheetNumber}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconButton
              iconName="minus-circle"
              onPress={() => onDecreaseFood()}
              disabled={food.quantity === 1 ? true : false}
            />
            <NumberText
              value={food.quantity}
              style={styles.bottomSheetNumber}
            />
            <IconButton
              iconName="plus-circle"
              onPress={() => onIncreaseFood()}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ghi Chú"
            value={note}
            onChangeText={(text) => setNote(text)}
          />
        </View>
      </View>
      <TextButton
        text="Thêm Món"
        onPress={() => onAddNewFood(note)}
        style={styles.btnAdd}
      />
    </View>
  );
}

export default BottomSheetBody;
