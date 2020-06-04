import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/vi-VN';

import styles from './index.css';

Item.propTypes = {
  data: PropTypes.object.isRequired,
  selectItem: PropTypes.func.isRequired,
};

function Item(props) {
  const {data, selectItem} = props;
  return (
    <TouchableOpacity
      style={styles.menuItemContainer}
      onPress={() => selectItem(data._id)}>
      <Text style={[styles.desc, {flex: 1}]}>{data.name}</Text>
      <Text style={styles.desc}>
        {new Intl.NumberFormat('vi-VN').format(data.price)}
      </Text>
    </TouchableOpacity>
  );
}

export default Item;
