import React, {useContext, useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';

import Loader from '../../Components/Modal/Loader';
import TextButton from '../../Components/TextButton';
import BSOrderConfig from '../../Components/Bottomsheet/BSOrderConfig';
import BSEmptyTables from '../../Components/Bottomsheet/BSEmptyTables';

import {socket} from '../../Connect';

import {CurrentTableContext} from '../../Contexts/CurrentTableContext';

import ActionBar from './ActionBar';
import EmptyList from './BillDetail/EmptyList';
import ItemBill from './BillDetail/ItemBill';
import Header from './Header';
import EmptyHeader from './Header/EmptyHeader';
import styles from './styles/index.css';

function Detail({route, navigation: {goBack, navigate}}) {
  const {tableDetail} = route.params;

  const currentTable = useContext(CurrentTableContext);

  const BSEmptyTablesRef = useRef();
  const BSOrdeConfigRef = useRef();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(
    Object.keys(tableDetail).length > 1 ? tableDetail.Orders : [],
  );
  const [currentFood, setCurrentFood] = useState({});

  useEffect(() => {
    // check have currentTable
    if (
      Object.keys(currentTable).length > 0 &&
      Object.keys(tableDetail).length === 1
    ) {
      if (tableDetail.Table === currentTable.data.Table) {
        setOrders(currentTable.data.Orders);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    let newBill = {
      Orders: orders,
      Table: tableDetail.Table,
    };
    currentTable.setData(newBill);
    goBack();
  };

  const onNavigate = () => {
    navigate('Menu', {handleMenuScreenBack});
  };
  //after choose a food in menu screen update Current Orders list
  const handleMenuScreenBack = (ordersData) => {
    let tempOrders = [...orders];
    ordersData.forEach((item) => {
      const index = tempOrders.findIndex((order) => order._id === item._id);
      index > -1
        ? (tempOrders[index].quantity += item.quantity)
        : tempOrders.push(item);
    });
    setOrders(tempOrders);
  };

  //Delete Order
  const onDeleteItem = (itemID) => {
    let tempData = [...orders];
    const filterBill = tempData.filter((item) => item._id !== itemID);
    setOrders(filterBill);
  };

  const onCreateBill = () => {
    setLoading(true);
    let newBill = {
      Orders: orders,
      Table: tableDetail.Table,
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
        currentTable.setData({});
      }
    });
  };
  const onUpdateBill = () => {
    setLoading(true);
    socket.emit('updateBill', tableDetail.ID, orders);
    socket.on('updateBillResult', (result) => {
      setLoading(false);
      if (result) {
        navigate('tables');
      }
    });
  };

  const onChangeTable = () => {
    BSEmptyTablesRef.current.snapTo(0);
  };

  const chooseSwitchTable = (tableNumber) => {
    setLoading(true);
    socket.emit('switchTable', tableDetail.ID, tableNumber);
    socket.on('switchTableResult', (result) => {
      setLoading(false);
      if (result) {
        navigate('tables');
      }
      BSEmptyTablesRef.current.snapTo(1);
    });
  };

  //BSOrder Config functions
  const selectFood = (foodID) => {
    const food = orders.find((order) => order._id === foodID);
    setCurrentFood(food);
    BSOrdeConfigRef.current.snapTo(0);
  };
  const onIncreaseFood = () => {
    const food = {...currentFood};
    food.quantity++;
    food.totalPrice = food.price * food.quantity;
    setCurrentFood(food);
  };
  const onDecreaseFood = () => {
    const food = {...currentFood};
    food.quantity--;
    food.totalPrice = food.price * food.quantity;
    setCurrentFood(food);
  };
  const updateFood = (note) => {
    const food = {...currentFood};
    food.note = note;
    BSOrdeConfigRef.current.snapTo(1);
    const tempOrders = [...orders];
    const index = tempOrders.findIndex((item) => item._id === food._id);
    if (index > -1) {
      tempOrders[index] = {...food};
    }
    setOrders(tempOrders);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <ActionBar index={tableDetail.Table} handleGoBack={handleGoBack} />
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
              created={tableDetail.hasOwnProperty('Created') ? true : false}
              selectFood={selectFood}
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

        {/* Show btn update and change table if have order */}
        {orders.length === 0 ? (
          <View />
        ) : tableDetail.hasOwnProperty('Created') ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <TextButton
              text="Cập Nhật"
              textStyle={{color: 'white'}}
              onPress={() => onUpdateBill()}
              style={styles.btnUpdateBill}
            />
            <TextButton
              text="Chuyển Bàn"
              textStyle={{color: 'white'}}
              onPress={() => onChangeTable()}
              style={styles.btnChangeTable}
            />
          </View>
        ) : (
          <TextButton
            text="Tạo Đơn Hàng"
            textStyle={{color: 'white'}}
            onPress={() => onCreateBill()}
            style={styles.btncreateBill}
          />
        )}
      </View>

      <BSOrderConfig
        ref={BSOrdeConfigRef}
        food={currentFood}
        onIncreaseFood={onIncreaseFood}
        onDecreaseFood={onDecreaseFood}
        onAddNewFood={updateFood}
        isUpdate={true}
      />
      <BSEmptyTables
        ref={BSEmptyTablesRef}
        chooseSwitchTable={chooseSwitchTable}
      />

      {loading ? <Loader /> : null}
    </View>
  );
}

export default Detail;
