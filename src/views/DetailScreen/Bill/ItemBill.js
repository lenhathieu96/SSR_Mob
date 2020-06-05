import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/vi-VN';

ItemBill.propTypes = {
  item: PropTypes.object.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function ItemBill(props) {
  const {item, onIncrease, onDecrease, onDelete} = props;
  console.log(item);
  return (
    <View>
      <View style={styles.itemBillContainer}>
        <Text style={[styles.desc, {flex: 0.4}]}>{item.name}</Text>
        <Button title="-" />
        <Text style={styles.desc}>{item.quantity}</Text>
        <Button title="+" />
        <Text style={[styles.desc, {flex: 0.3}]}>
          {new Intl.NumberFormat('vi-VN').format(item.price)}
        </Text>
        <Button title="x" />
      </View>
      <TextInput
        placeholder="chu thich"
        style={{
          borderBottomWidth: 1,
          fontSize: 18,
          fontFamily: 'MavenPro-Regular',
          padding: 5,
          borderColor: 'rgba(0, 0, 1, 0.151)',
        }}
      />
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
