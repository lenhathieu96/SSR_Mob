import React from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions} from 'react-native';
import Text from '../../../Components/Text';
import NumberText from '../../../Components/NumberText';
import IconButton from '../../../Components/IconButton';

import * as Progress from 'react-native-progress';

import * as fontSize from '../../../utils/fontSize';

import styles from '../styles/index.css';
import color from '../../../utils/Color';

ItemBill.propTypes = {
  item: PropTypes.object.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

function ItemBill(props) {
  const {item, onDeleteItem} = props;
  return (
    <View style={styles.itemBillContainer}>
      <View style={{flexDirection: 'row'}}>
        <Text text={item.name} style={styles.itemBillDesc} />
        <NumberText value={item.quantity} style={styles.itemBillQuantity} />
        <NumberText value={item.totalPrice} style={styles.itemBillPrice} />
        <IconButton
          style={styles.btnDelete}
          iconName="trash"
          iconSize={fontSize.huge}
          onPress={() => onDeleteItem(item._id)}
        />
      </View>
      <Text text={item.note} style={styles.itemBillNote} />
      <Progress.Bar progress={0.9} color={color.secondary} width={0.9*Dimensions.get('window').width} height={fontSize.large}>
<Text style={{alignSelf:"center",position:"absolute",top:0.5}}>2/4</Text>
</Progress.Bar>
    </View>
  );
}

export default ItemBill;
