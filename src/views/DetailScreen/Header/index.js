/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import * as Progress from 'react-native-progress';

import Text, {BoldText} from '../../../Components/Text';
import NumberText from '../../../Components/NumberText';

import color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/fontSize';
import styles from '../styles/index.css';

Header.propTypes = {
  orders: PropTypes.array.isRequired,
};

function Header(props) {
  const {orders} = props;
  const totalPrice = orders.reduce(
    (price, order) => (price += order.totalPrice),
    0,
  );
  const served = orders.filter((order) => order.served === order.quantity)
    .length;
  return (
    <View style={styles.headerDetailContainer}>
      <View style={styles.moneyContainer}>
        <Text style={styles.desc}>Tổng Tiền</Text>

        <View style={{flexDirection: 'row'}}>
          <NumberText value={totalPrice} style={styles.money} />
          <Text style={styles.money}>VNĐ</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressDetailContainer}>
          <BoldText style={[styles.progressTitle]}>
            Quá Trình Thực Hiện
          </BoldText>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.progressDetail}>
              {served} / {orders.length}
            </Text>
            <Text style={styles.desc}>Món đã được phục vụ</Text>
          </View>
        </View>

        <Progress.Circle
          size={2.5 * fontSize.biggest}
          progress={served / orders.length}
          showsText={true}
          formatText={() => Math.round((served / orders.length) * 100) + ' % '}
          textStyle={{
            color: 'white',
            fontFamily: 'MavenPro-Medium',
            fontWeight: 'bold',
          }}
          color={served / orders.length === 1 ? color.finish : color.unfinish}
          thickness={5}
          strokeCap={'round'}
        />
      </View>
    </View>
  );
}

export default Header;
