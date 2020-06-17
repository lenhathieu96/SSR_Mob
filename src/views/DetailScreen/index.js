import React, {useState, useRef, useContext, useEffect} from 'react';
import {View, SafeAreaView, FlatList, Dimensions} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import {TablesContext} from '../../Contexts/TablesContext';
import {CurrentTableContext} from '../../Contexts/CurrentTableContext';

import {BoldText} from '../../Components/Text';
import TextButton from '../../Components/TextButton';
import IconButton from '../../Components/IconButton';

import ActionBar from './ActionBar';
import Header from './Header';
import ItemBill from './BillDetail/ItemBill';
import EmptyList from './BillDetail/EmptyList';

import {socket} from '../../Connect';

import EmptyHeader from './Header/EmptyHeader';
import Loader from '../../Components/Loader';
import Body from './BottomSheet/BSEmptyTables/Body';
import BottomSheetBody from '../MenuScreen/BSMenuBody';

import * as fontSize from '../../utils/fontSize';
import styles from './styles/index.css';

function Detail({route, navigation: {goBack, navigate}}) {
  const {tableDetail} = route.params;

  const tablesContext = useContext(TablesContext);
  const currentTable = useContext(CurrentTableContext);

  const bottomSheetRef = useRef();
  const BSmenuRef = useRef();

  const height = Dimensions.get('window').height;
  const BSFoodHeight = 0.7 * Dimensions.get('window').height;

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(
    Object.keys(tableDetail).length > 1 ? tableDetail.Orders : [],
  );
  const [currentFood, setCurrentFood] = useState({});

  useEffect(() => {
    // check have currentTable

    if (
      Object.keys(currentTable).length > 0 && Object.keys(currentTable).length === 1
    ) {
      if (tableDetail.Table === currentTable.data.Table) {
        setOrders(currentTable.data.Orders);
      }
    }
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
    navigate('Menu', {handleMenuBack});
  };

  //after choose a food in menu
  const handleMenuBack = async (ordersData) => {
    let tempOrders = [...orders];
    ordersData.forEach((item) => {
      const index = tempOrders.findIndex((order) => order._id === item._id);
      index > -1
        ? (tempOrders[index].quantity += item.quantity)
        : tempOrders.push(item);
    });
    setOrders(tempOrders);
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
    bottomSheetRef.current.snapTo(0);
  };

  const chooseSwitchTable = (tableNumber) => {
    setLoading(true);
    socket.emit('switchTable', tableDetail.ID, tableNumber);
    socket.on('switchTableResult', (result) => {
      setLoading(false);
      if (result) {
        navigate('tables');
      }
      bottomSheetRef.current.snapTo(1);
    });
  };

  const selectFood = (foodID) => {
    const food = orders.find((order) => order._id === foodID);
    setCurrentFood(food);
    BSmenuRef.current.snapTo(0);
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
    BSmenuRef.current.snapTo(1);

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
        {orders.length === 0 ? (
          <View />
        ) : tableDetail.hasOwnProperty('Created') ? (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TextButton
              text="Cập Nhật"
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
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[height, 0]}
        initialSnap={1}
        renderHeader={() => (
          <SafeAreaView style={styles.BSDetail__Header}>
            <IconButton
              iconSize={fontSize.huge}
              iconName="grip-lines"
              onPress={() => bottomSheetRef.current.snapTo(1)}
            />
            <BoldText
              text="Danh Sách Bàn Còn Trống"
              style={styles.BSDetail__Title}
            />
          </SafeAreaView>
        )}
        renderContent={() => (
          <Body
            tables={tablesContext.tables}
            chooseSwitchTable={chooseSwitchTable}
          />
        )}
      />

      <BottomSheet
        ref={BSmenuRef}
        snapPoints={[BSFoodHeight, 0]}
        renderHeader={() => (
          <View style={styles.BSMenu__Header}>
            <IconButton
              iconSize={fontSize.huge}
              iconName="grip-lines"
              onPress={() => BSmenuRef.current.snapTo(1)}
            />
          </View>
        )}
        renderContent={() => (
          <BottomSheetBody
            food={currentFood}
            onIncreaseFood={onIncreaseFood}
            onDecreaseFood={onDecreaseFood}
            onAddNewFood={updateFood}
            isUpdate={true}
          />
        )}
        initialSnap={1}
        enabledInnerScrolling={false}
      />

      {loading ? <Loader /> : null}
    </View>
  );
}

export default Detail;
