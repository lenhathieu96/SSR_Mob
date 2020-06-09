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
import Loader from '../../Components/Loader';

function Detail({route, navigation: {goBack, navigate}}) {
  const {data} = route.params;

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(
    Object.keys(data).length > 1 ? data.Orders : [],
  );

  const handleGoBack = () => goBack();

  const onNavigate = () => {
    navigate('Menu', {handleMenuBack});
  };

  //after choose a food in menu
  const handleMenuBack = (item) => {
    let tempData = [...orders];
    const index = tempData.findIndex((order) => order._id === item._id);
    if (index > -1) {
      tempData[index].quantity += item.quantity;
      tempData[index].totalPrice =
        tempData[index].quantity * tempData[index].price;
    } else {
      tempData.push(item);
    }
    setOrders(tempData);
  };

  const onDeleteItem = (itemID) => {
    let tempData = [...orders];
    const filterBill = tempData.filter((item) => item._id !== itemID);
    setOrders(filterBill);
  };

  const onCreateBill = () => {
    setLoading(true);
    let newBill = {
      Orders: orders,
      Table: data.Table,
      TotalPrice: orders.reduce(
        (price, order) => (price += order.totalPrice),
        0,
      ),
    };
    socket.emit('createBill', newBill);
    socket.on('createBillResult', (result) => {
      setLoading(false);
      if (result) {
        navigate('tables');
      }
    });
  };

  const onUpdateBill = () => {
    setLoading(true);
    socket.emit('updateBill', data.ID, orders);
    socket.on('updateordersResult', (result) => {
      setLoading(false);
      if (result) {
        navigate('tables');
      }
    });
  };

  const onChangeTable = () => {
    navigate('tables', {bill_id: data.ID});
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <ActionBar index={data.Table} handleGoBack={handleGoBack} />
        {orders.length === 0 ? <EmptyHeader /> : <Header orders={orders} />}
      </SafeAreaView>

      <View style={styles.bodyContainer}>
        <FlatList
          contentContainerStyle={styles.billList}
          data={orders}
          renderItem={({item}) => (
            <ItemBill
              item={item}
              onDeleteItem={onDeleteItem}
              created={data.hasOwnProperty('Created') ? true : false}
            />
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => <EmptyList onNavigate={onNavigate} />}
          ListFooterComponent={() =>
            orders.length === 0 ? (
              <View />
            ) : (
              <EmptyList onNavigate={onNavigate} />
            )
          }
        />
        {orders.length === 0 ? (
          <View />
        ) : data.hasOwnProperty('Created') ? (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TextButton
              text="Cập Nhập"
              onPress={() => onUpdateBill()}
              style={styles.btnUpdateBill}
            />
            <TextButton
              text="Chuyển Bàn"
              onPress={() => onChangeTable()}
              style={styles.btnChangeTable}
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
      {loading ? <Loader /> : null}
    </View>
  );
}

export default Detail;
