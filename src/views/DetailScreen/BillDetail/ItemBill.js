import React from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Text from '../../../Components/Text';
import NumberText from '../../../Components/NumberText';
import IconButton from '../../../Components/IconButton';

import * as Progress from 'react-native-progress';

import * as fontSize from '../../../Utils/fontSize';

import styles from '../styles/index.css';
import color from '../../../Utils/Color';

function ItemBill(props) {
  const {item, onDeleteItem, selectFood} = props;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (item.done === 0 && item.served === 0) {
          selectFood(item._id);
        }
      }}>
      <View style={styles.itemBillContainer}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text text={item.name} style={styles.itemBillDesc} />
            <Text style={styles.itemBillQuantity}>
              {item.served}/{item.quantity}
            </Text>
            <NumberText value={item.totalPrice} style={styles.itemBillPrice} />
            {item.done === 0 && item.served === 0 ? (
              <IconButton
                style={styles.btnDelete}
                iconName="times"
                iconSize={fontSize.bigger}
                iconColor={color.red}
                onPress={() => onDeleteItem(item._id)}
              />
            ) : null}
          </View>
          {item.note ? (
            <View style={styles.itemBillNoteContainer}>
              <Icon name="comment-dots" size={fontSize.small} color="gray" />
              <Text text={item.note} style={styles.itemBillNote} />
            </View>
          ) : null}
        </View>
        <Progress.Bar
          style={styles.progressBar}
          progress={item.served / item.quantity}
          width={0.9 * Dimensions.get('window').width}
          color={
            item.served / item.quantity === 1 ? color.finish : color.unfinish
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ItemBill;

ItemBill.propTypes = {
  item: PropTypes.object.isRequired,
  created: PropTypes.bool.isRequired,
  onDeleteItem: PropTypes.func,
};
