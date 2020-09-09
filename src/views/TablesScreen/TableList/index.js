import React from 'react';
import {View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {BoldText} from '../../../Components/Text';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../styles/index.css';

function TableItem(props) {
  const {tableDetail} = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={
        Object.keys(tableDetail).length > 1
          ? styles.itemTableContainer__used
          : styles.itemTableContainer
      }
      onPress={() => navigation.navigate('Detail', {tableDetail})}>
      <Icon name="utensils" style={styles.icon} />
      <BoldText style={[styles.title]}>Bàn {tableDetail.Table}</BoldText>
    </TouchableOpacity>
  );
}

function TableList(props) {
  const windowWidth = Dimensions.get('window').width;
  const {listTable} = props;
  return (
    <View style={styles.TableListContainer}>
      <FlatList
        numColumns={windowWidth > 850 ? 3 : 2}
        data={listTable}
        renderItem={({item}) => <TableItem tableDetail={item} />}
        keyExtractor={(item) => item.Table}
        contentContainerStyle={styles.flastlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

TableList.propTypes = {
  listTable: PropTypes.array.isRequired,
};

export default TableList;
