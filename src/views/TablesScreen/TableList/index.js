import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import Table from './Table';

TableList.propTypes = {
  data: PropTypes.array.isRequired,
};

const windowWidth = Dimensions.get('window').width;

function TableList(props) {
  const {data} = props;
  return (
    <View>
      <FlatList
        numColumns={windowWidth > 850 ? 3 : 2}
        data={data}
        renderItem={({item, index}) => <Table index={index} />}
        keyExtractor={(item, index) => index}
        contentContainerStyle={styles.flastlist}
      />
    </View>
  );
}

export default TableList;

const styles = StyleSheet.create({
  flastlist: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
