import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import AsyncStorage from '@react-native-community/async-storage';

import foodApi from '../../Api/FoodApi';

import Text from '../../Components/Text';
import TextButton from '../../Components/TextButton';
import IconButton from '../../Components/IconButton';

import BottomSheetBody from './BSMenuBody';
import Item from './Item';
import {URL} from '../../Connect';

import * as fontSize from '../../Utils/fontSize';
import styles from './styles/index.css';

function Menu({route, navigation: {goBack, navigate}}) {
  const bottomsheetRef = useRef();

  const height = 0.7 * Dimensions.get('window').height;

  const [filterMenu, setFilterMenu] = useState([]);
  const [sourceMenu, setSourceMenu] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentFood, setCurrentFood] = useState({});
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const allFood = await foodApi.getAllFood().then((res) => {
      if (res.data) {
        return res.data;
      }
      return res;
    });
    setFilterMenu(allFood);
    setSourceMenu(allFood);
    await AsyncStorage.setItem('menu', JSON.stringify(allFood));
    setLoading(false);
  };

  const search = (text) => {
    if (text !== '') {
      const newData = sourceMenu.filter((item) => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterMenu(newData);
    } else {
      setFilterMenu(sourceMenu);
    }
  };

  const selectFood = (foodID) => {
    const food = sourceMenu.find((food) => foodID === food._id);
    food.done = 0;
    food.quantity = 1;
    food.served = 0;
    food.totalPrice = food.price;
    food.note = '';
    setCurrentFood(food);
    bottomsheetRef.current.snapTo(0);
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

  const onAddNewFood = (note) => {
    const food = {...currentFood};
    food.note = note;
    bottomsheetRef.current.snapTo(1);

    let tempData = [...orders];
    const index = tempData.findIndex((order) => order._id === food._id);
    if (index > -1) {
      tempData[index].quantity += food.quantity;
      tempData[index].totalPrice =
        tempData[index].quantity * tempData[index].price;
    } else {
      tempData.push(food);
    }
    setOrders(tempData);
    ToastAndroid.show('Thêm Thành Công', ToastAndroid.SHORT);
  };

  const ConfirmOrder = () => {
    goBack();
    route.params.handleMenuBack(orders);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const menu = await AsyncStorage.getItem('menu');
        if (menu !== null) {
          setLoading(false);
          setSourceMenu(JSON.parse(menu));
          setFilterMenu(JSON.parse(menu));
        } else {
          fetchData();
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <SafeAreaView style={styles.menuContainer}>
        <TextInput
          placeholder="Nhập Món Cần Tìm"
          onChangeText={(text) => search(text)}
          style={styles.input}
        />
        <View style={styles.menuBody}>
          {isLoading ? (
            <View style={{alignSelf: 'center'}}>
              <ActivityIndicator animating={true} />
              <Text style={styles.loadingText}>Đang Tải Dữ Liệu</Text>
            </View>
          ) : (
            <FlatList
              data={filterMenu}
              keyExtractor={(item) => item._id}
              renderItem={({item}) => (
                <Item data={item} selectFood={selectFood} />
              )}
              refreshing={isLoading}
              onRefresh={() => fetchData()}
            />
          )}
        </View>
        {orders.length > 0 ? (
          <TextButton
            text="Hoàn Tất Đặt Món"
            style={styles.btnConfirm}
            onPress={() => ConfirmOrder()}
          />
        ) : null}
      </SafeAreaView>

      <BottomSheet
        ref={bottomsheetRef}
        snapPoints={[height, 0]}
        renderHeader={() => (
          <View style={styles.BSMenu__Header}>
            <IconButton
              iconSize={fontSize.huge}
              iconName="grip-lines"
              onPress={() => bottomsheetRef.current.snapTo(1)}
            />
          </View>
        )}
        renderContent={() => (
          <BottomSheetBody
            food={currentFood}
            onIncreaseFood={onIncreaseFood}
            onDecreaseFood={onDecreaseFood}
            onAddNewFood={onAddNewFood}
            isUpdate={false}
          />
        )}
        initialSnap={1}
        enabledInnerScrolling={false}
      />
    </KeyboardAvoidingView>
  );
}

export default Menu;
