/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ActionBar from './ActionBar';
import HeaderDetail from './Header';

const windowWith = Dimensions.get('window').width;

function Detail({route, navigation: {goBack, navigate}}) {
  const {tableIndex} = route.params;

  const handleGoBack = () => goBack();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <ActionBar index={tableIndex} handleGoBack={handleGoBack} />
        <View>
          <Text>Bàn Trống !</Text>
        </View>
        {/*  <HeaderDetail />*/}
      </SafeAreaView>
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => navigate('Menu')}>
          <Icon name="plus-circle" size={36} color="#283593" />
          <Text
            style={{
              fontFamily: 'MavenPro-Bold',
              color: '#283593',
              fontSize: 24,
            }}>
            Thêm Món Mới
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#283593',
  },
  headerContainer: {
    height: (windowWith * 3) / 4,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: -25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
