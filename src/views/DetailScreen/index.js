import React, {useState, useRef, useContext} from 'react';
import {View, SafeAreaView, FlatList, Dimensions} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import {TablesContext} from '../../Contexts/TablesContext';

import TextButton from '../../Components/TextButton';
import IconButton from '../../Components/IconButton';

import ActionBar from './ActionBar';
import Header from './Header';
import ItemBill from './BillDetail/ItemBill';
import EmptyList from './BillDetail/EmptyList';

import {socket} from '../../Connect';

import EmptyHeader from './Header/EmptyHeader';
import Loader from '../../Components/Loader';
import BottomShetBody from './BSDetailBody';

import * as fontSize from '../../utils/fontSize';
import styles from './styles/index.css';
import {BoldText} from '../../Components/Text';

function Detail({route, navigation: {goBack, navigate}}) {
  const context = useContext(TablesContext);
  const {data} = route.params;

  const bottomSheetRef = useRef();
  const height = Dimensions.get('window').height;

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
    socket.emit('switchTable', data.ID, tableNumber);
    socket.on('switchTableResult', (result) => {
      setLoading(false);
      if (result) {
        navigate('tables');
      }
      bottomSheetRef.current.snapTo(1);
    });
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
          <BottomShetBody
            tables={context.tables}
            chooseSwitchTable={chooseSwitchTable}
          />
        )}
      />
      {loading ? <Loader /> : null}
    </View>
  );
}

export default Detail;
