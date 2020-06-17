import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';

import Text from '../../Components/Text';
import NumberText from '../../Components/NumberText';
import styles from './styles/index.css';

Item.propTypes = {
  data: PropTypes.object.isRequired,
  selectFood: PropTypes.func.isRequired,
};

function Item(props) {
  const {data, selectFood} = props;
  return (
    <TouchableOpacity
      style={styles.menuItemContainer}
      onPress={() => selectFood(data._id)}>
      <Text text={data.name} style={styles.itemName} />
      <NumberText value={data.price} style={styles.itemPrice} />
    </TouchableOpacity>
  );
}

export default Item;
