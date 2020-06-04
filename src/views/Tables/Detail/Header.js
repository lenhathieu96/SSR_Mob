/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import * as Progress from 'react-native-progress';

import 'intl';
import 'intl/locale-data/jsonp/vi-VN';
HeaderDetail.propTypes = {};

function HeaderDetail(props) {
  const value = 200000;

  return (
    <View style={styles.container}>
      <View style={styles.moneyContainer}>
        <Text style={styles.desc}>Tổng Tiền</Text>
        <Text style={styles.money}>
          {new Intl.NumberFormat('vi-VN').format(value)} VNĐ
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressDetail}>
          <Text
            style={{
              flex: 0.8,
              fontFamily: 'MavenPro-Bold',
              fontSize: 22,
              color: 'white',
            }}>
            Quá Trình Thực Hiện
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'MavenPro-Regular',
                color: '#e78200',
                fontSize: 18,
                marginRight: 10,
              }}>
              2/4
            </Text>
            <Text style={styles.desc}>Món đã được phục vụ</Text>
          </View>
        </View>
        <Progress.Circle
          size={90}
          progress={0.5}
          showsText={true}
          formatText={() => '50%'}
          textStyle={{color: 'white', fontFamily: 'MavenPro-Medium'}}
          color={'#e78200'}
          thickness={5}
          strokeCap={'round'}
        />
      </View>
    </View>
  );
}

export default HeaderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  desc: {
    color: 'white',
    fontFamily: 'MavenPro-Regular',
    fontSize: 18,
  },
  moneyContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  money: {
    fontFamily: 'MavenPro-Bold',
    color: '#e78200',
    fontSize: 24,
    padding: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDetail: {
    flexDirection: 'column',
    flex: 1,
  },
});
