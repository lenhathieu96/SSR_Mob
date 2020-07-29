import React from 'react';
import {TouchableOpacity, FlatList, View} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../styles/index.css';
import Text from '../../../../Components/Text';

Body.propTypes = {
  tables: PropTypes.array.isRequired,
  chooseSwitchTable: PropTypes.func.isRequired,
};

function Body(props) {
  const {tables, chooseSwitchTable} = props;

  const emptyTables = tables.filter((table) => Object.keys(table).length === 1);
  return (
    <View style={styles.BSDetail__Body}>
      <FlatList
        contentContainerStyle={{flex: 1,}}
        data={emptyTables}
        keyExtractor={(item) => item.Table}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.BSDetail__itemContainer}
            onPress={() => chooseSwitchTable(item.Table)}>
            <Text style={styles.BSDetail__itemTitle}>Bàn {item.Table}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Body;
