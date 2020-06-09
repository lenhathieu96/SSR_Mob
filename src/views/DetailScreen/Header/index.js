/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList} from 'react-native';
import * as Progress from 'react-native-progress';

import Text, {BoldText} from '../../../Components/Text';
import NumberText from '../../../Components/NumberText';

import color from '../../../utils/Color';
import * as fontSize from '../../../utils/fontSize';
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
          <BoldText style={styles.progressTitle}>Quá Trình Thực Hiện</BoldText>

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
          textStyle={{color: 'white', fontFamily: 'MavenPro-Medium'}}
          color={color.secondary}
          thickness={5}
          strokeCap={'round'}
        />
      </View>
      {/* <View>
        <BoldText style={styles.desc}>Tiến Độ </BoldText>
        <FlatList
          data={bill}
          renderItem={({item}) => (
            <View
              style={{
                padding: 5,
                marginRight: 10,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Progress.Circle
                size={2 * fontSize.biggest}
                progress={0.75}
                showsText={true}
                formatText={() => "2/3"}
                textStyle={{color: 'white', fontFamily: 'MavenPro-Medium'}}
                color={'#e78200'}
                thickness={3}
                strokeCap={'round'}
              />
              <Text style={{color: 'white', fontSize: fontSize.large}}>
                {item.name}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => item._id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View> */}
    </View>
  );
}

export default Header;
