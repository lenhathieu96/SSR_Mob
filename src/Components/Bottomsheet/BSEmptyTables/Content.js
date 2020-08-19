import React from 'react';
import {TouchableOpacity, FlatList, View} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles/index.css';
import Text from '../../Text';

function Content(props) {
  const {tables, chooseSwitchTable} = props;

  const emptyTables = tables.filter((table) => Object.keys(table).length === 1);
  return (
    <View style={styles.BSEmptyTables__Body}>
      <FlatList
        contentContainerStyle={{flex: 1}}
        data={emptyTables}
        keyExtractor={(item) => item.Table}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.BSEmptyTables__itemContainer}
            onPress={() => chooseSwitchTable(item.Table)}>
            <Text style={styles.BSEmptyTables__itemTitle}>
              Bàn {item.Table}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

Content.propTypes = {
  tables: PropTypes.array.isRequired,
  chooseSwitchTable: PropTypes.func.isRequired,
};
export default Content;
