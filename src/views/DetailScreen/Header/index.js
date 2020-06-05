/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

import Text, {BoldText} from '../../../Components/Text';
import NumberText from '../../../Components/NumberText';

import styles from '../styles/index.css';

Header.propTypes = {};

function Header(props) {
  const value = 200000;

  return (
    <View style={styles.headerDetailContainer}>
      <View style={styles.moneyContainer}>
        <Text style={styles.desc}>Tổng Tiền</Text>

        <View style={{flexDirection: 'row'}}>
          <NumberText text={value} style={styles.money} />
          <Text style={styles.money}>VNĐ</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressDetailContainer}>
          <BoldText style={styles.progressTitle}>Quá Trình Thực Hiện</BoldText>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.progressDetail}>2/4</Text>
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

export default Header;
