import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '../../Text';
import NumberText from '../../NumberText';
import TextButton from '../../TextButton';
import IconButton from '../../IconButton';

import * as fontSize from '../../../Utils/fontSize';

import styles from './styles/index.css';
import color from '../../../Utils/Color';

const Content = (props) => {
  const {food, onIncreaseFood, onDecreaseFood, onAddNewFood, isUpdate} = props;
  const [note, setNote] = useState('');
  const [isKeyboardShow, setKeyboarShow] = useState(false);

  const _KeyboardDidShow = () => {
    setKeyboarShow(true);
  };

  const _KeyboardDidHide = () => {
    setKeyboarShow(false);
  };
  // get Keyboard Listerner
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _KeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _KeyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _KeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _KeyboardDidHide);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.BSOrderConfig__Body}>
        <View style={styles.Body__Detail}>
          <Text style={styles.Detail__Title}>{food.name}</Text>
          <NumberText
            value={food.totalPrice}
            style={styles.Detail__priceNumber}
          />
        </View>

        <View style={styles.Body__QuantityConfigWrapper}>
          <IconButton
            style={styles.btnQuantity}
            iconName="minus-circle"
            iconSize={fontSize.biggest}
            iconColor={food.quantity === 1 ? color.unactive : ''}
            onPress={() => onDecreaseFood()}
            disabled={food.quantity === 1 ? true : false}
          />
          <NumberText
            value={food.quantity}
            style={styles.QuantityConfigWrapper__QuantityNumber}
          />
          <IconButton
            style={styles.btnQuantity}
            iconName="plus-circle"
            iconSize={fontSize.biggest}
            onPress={() => onIncreaseFood()}
          />
        </View>

        <TextInput
          style={styles.noteInput}
          multiline={true}
          placeholder="Ghi Chú"
          value={food.note ? food.note : note}
          onChangeText={(text) => setNote(text)}
        />
        <View
          style={[
            styles.ButtonWrapper,
            {
              flex: isKeyboardShow ? 0.2 : 0.6,
            },
          ]}>
          <TextButton
            text={isUpdate ? 'Cập Nhập' : 'Thêm Món'}
            textStyle={{color: 'white'}}
            onPress={() => onAddNewFood(note)}
            style={isUpdate ? styles.btnConfirm : styles.btnAdd}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Content;
