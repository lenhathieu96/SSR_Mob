import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import Text from '../../../Components/Text';
import NumberText from '../../../Components/NumberText';
import IconButton from '../../../Components/IconButton';

ItemBill.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function ItemBill(props) {
  const {item, onDelete} = props;
  console.log(item);
  return (
    <View>
      <View style={styles.itemBillContainer}>
        <Text text={item.name} />
        <NumberText value={item.quantity} />
        <Text text={item.note} />
      </View>
    </View>
  );
}

export default ItemBill;

const styles = StyleSheet.create({
  itemBillContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'MavenPro-Regular',
    fontSize: 18,
  },
  desc: {
    fontSize: 18,
    fontFamily: 'MavenPro-Regular',
  },
});
