import React from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import Text from '../../../Components/Text';
import NumberText from '../../../Components/NumberText';
import IconButton from '../../../Components/IconButton';

import * as Progress from 'react-native-progress';

import * as fontSize from '../../../utils/fontSize';

import styles from '../styles/index.css';
import color from '../../../utils/Color';

ItemBill.propTypes = {
  item: PropTypes.object.isRequired,
  created: PropTypes.bool.isRequired,
  onDeleteItem: PropTypes.func,
};

function ItemBill(props) {
  const {item, onDeleteItem, selectFood} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        if (item.done === 0 && item.served === 0) {
          selectFood(item._id);
        }
      }}>
      <View style={styles.itemBillContainer}>
        <Progress.Bar
          style={{justifyContent: 'space-evenly'}}
          progress={item.served / item.quantity}
          color={
            item.served / item.quantity === 1 ? color.finish : color.unfinish
          }
          width={0.9 * Dimensions.get('window').width}
          height={2 * fontSize.biggest}>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'column',
              top: 5,
              left: 5,
              right: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text text={item.name} style={styles.itemBillDesc} />
              <Text style={styles.itemBillQuantity}>
                {item.served}/{item.quantity}
              </Text>
              <NumberText
                value={item.totalPrice}
                style={styles.itemBillPrice}
              />
              {item.done === 0 && item.served === 0 ? (
                <IconButton
                  style={styles.btnDelete}
                  iconName="trash"
                  iconSize={fontSize.bigger}
                  onPress={() => onDeleteItem(item._id)}
                />
              ) : null}
            </View>
            <Text
              text={item.note}
              style={{
                fontSize: fontSize.large,
                padding: 10,
                fontStyle: 'italic',
              }}
            />
          </View>
        </Progress.Bar>
      </View>
    </TouchableOpacity>
  );
}

export default ItemBill;
