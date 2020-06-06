import React, {useState} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';

import TextButton from '../../Components/TextButton';

import ActionBar from './ActionBar';
import Header from './Header';
import ItemBill from './Bill/ItemBill';
import EmptyList from './Bill/EmptyList';

import socket from '../../Connect/SocketIO';

import styles from './styles/index.css';
import EmptyHeader from './Header/EmptyHeader';

function Detail({route, navigation: {goBack, navigate}}) {
  const {data} = route.params;

  const [bill, setBill] = useState(
    Object.keys(data).length > 1 ? data.Order : [],
  );

  const handleGoBack = () => goBack();

  const onNavigate = () => {
    navigate('Menu', {handleMenuBack});
  };

  const onCreateBill = () => {
    let newBill = {
      Order: bill,
      Table: data.Table,
      TotalPrice: bill.reduce((price, order) => (price += order.totalPrice), 0),
    };
    socket.emit('createBill', newBill);
    socket.on('createBillResult', (result) => {
      if (result) {
        navigate('tables');
      }
    });
  };

  const handleMenuBack = (item) => {
    let tempData = [...bill];
    const index = tempData.findIndex((order) => order._id === item._id);
    if (index > -1) {
      tempData[index].quantity += item.quantity;
      tempData[index].totalPrice =
        tempData[index].quantity * tempData[index].price;
    } else {
      tempData.push(item);
    }
    setBill(tempData);
  };

  const onDeleteItem = (itemID) => {
    let tempData = [...bill];
    const filterBill = tempData.filter((item) => item._id !== itemID);
    setBill(filterBill);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <ActionBar index={data.Table} handleGoBack={handleGoBack} />
        {bill.length === 0 ? <EmptyHeader /> : <Header bill={bill} />}
      </SafeAreaView>

      <View style={styles.bodyContainer}>
        <FlatList
          contentContainerStyle={styles.billList}
          data={bill}
          renderItem={({item, separators}) => (
            <ItemBill
              item={item}
              onDeleteItem={onDeleteItem}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
            />
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => <EmptyList onNavigate={onNavigate} />}
          ListFooterComponent={() =>
            bill.length === 0 ? <View /> : <EmptyList onNavigate={onNavigate} />
          }
        />
        {bill.length === 0 ? (
          <View />
        ) : data.hasOwnProperty('Created') ? (
          <View style={{flexDirection: 'row'}}>
            <TextButton
              text="Cập Nhập"
              onPress={() => console.log('update')}
              style={styles.btncreateBill}
            />
            <TextButton
              text="Chuyển Bàn"
              onPress={() => console.log('change table')}
              style={styles.btncreateBill}
            />
          </View>
        ) : (
          <TextButton
            text="Tạo Đơn Hàng"
            onPress={() => onCreateBill()}
            style={styles.btncreateBill}
          />
        )}
      </View>
    </View>
  );
}

export default Detail;
