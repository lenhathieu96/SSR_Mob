import React from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

import Loader from '../../../Components/Loader';
import Table from './Table';

import styles from '../styles/index.css';

TableList.propTypes = {
  data: PropTypes.array.isRequired,
};

const windowWidth = Dimensions.get('window').width;

function TableList(props) {
  const {data} = props;
  return (
    <View style={styles.TableListContainer}>
      {data.length === 0 ? (
        <Loader />
      ) : (
        <FlatList
          numColumns={windowWidth > 850 ? 3 : 2}
          data={data}
          renderItem={({item}) => <Table data={item} />}
          keyExtractor={(item) => item.Table}
          contentContainerStyle={styles.flastlist}
        />
      )}
    </View>
  );
}

export default TableList;
