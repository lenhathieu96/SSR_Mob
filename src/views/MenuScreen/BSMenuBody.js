import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput} from 'react-native';

import IconButton from '../../Components/IconButton';
import Text from '../../Components/Text';
import NumberText from '../../Components/NumberText';
import TextButton from '../../Components/TextButton';

import * as fontSize from '../../Utils/fontSize';

import styles from './styles/index.css';

BSMenuBody.propTypes = {
  food: PropTypes.object.isRequired,
  onIncreaseFood: PropTypes.func.isRequired,
  onDecreaseFood: PropTypes.func.isRequired,
  onAddNewFood: PropTypes.func.isRequired,
};

function BSMenuBody(props) {
  const {food, onIncreaseFood, onDecreaseFood, onAddNewFood, isUpdate} = props;

  const [note, setNote] = useState('');

  return (
    <View style={styles.BSMenu__Body}>
      <View style={{flex: 0.9, justifyContent: 'flex-start'}}>
        <View style={{flex: 0.4, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.BSMenu__Title}>{food.name}</Text>
            <NumberText value={food.totalPrice} style={styles.BSMenu__Number} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconButton
              style={styles.btnQuantity}
              iconName="minus-circle"
              onPress={() => onDecreaseFood()}
              disabled={food.quantity === 1 ? true : false}
              iconSize={fontSize.biggest}
            />
            <NumberText
              value={food.quantity}
              style={styles.bottomSheetNumber}
            />
            <IconButton
              style={styles.btnQuantity}
              iconName="plus-circle"
              onPress={() => onIncreaseFood()}
              iconSize={fontSize.biggest}
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
        text={isUpdate ? 'Cập Nhập' : 'Thêm Món'}
        onPress={() => onAddNewFood(note)}
        style={isUpdate ? styles.btnConfirm : styles.btnAdd}
      />
    </View>
  );
}

export default BSMenuBody;
