import React, {useState} from 'react';
import {TouchableOpacity, FlatList, View} from 'react-native';
import PropTypes from 'prop-types';

import ConfirmModal from '../../Modal/Confirm';
import Text from '../../Text';

import styles from './styles/index.css';
function Content(props) {
  const {tables, chooseSwitchTable} = props;

  const [chosenTable, setChosenTable] = useState();
  const [modalVisible, setVisibleModal] = useState(false);

  const emptyTables = tables.filter((table) => Object.keys(table).length === 1);

  const toggleModal = (isShow, table) => {
    setVisibleModal(isShow);
    if (isShow) {
      setChosenTable(table);
    }
  };
  return (
    <View style={styles.BSEmptyTables__Body}>
      <FlatList
        data={emptyTables}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.Table}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.BSEmptyTables__itemContainer}
            onPress={() => {
              toggleModal(true, item.Table);
            }}>
            <Text style={styles.BSEmptyTables__itemTitle}>
              Bàn {item.Table}
            </Text>
          </TouchableOpacity>
        )}
      />
      <ConfirmModal
        modalVisible={modalVisible}
        chosenTable={chosenTable}
        switchTable={chooseSwitchTable}
        toggleModal={toggleModal}
      />
    </View>
  );
}

Content.propTypes = {
  tables: PropTypes.array.isRequired,
  chooseSwitchTable: PropTypes.func.isRequired,
};
export default Content;

// chooseSwitchTable(item.Table)
