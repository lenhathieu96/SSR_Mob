import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import foodApi from '../../Api/FoodApi';

import Text from '../../Components/Text';
import TextButton from '../../Components/TextButton';

import Item from './Item';
import BSOrderConfig from '../../Components/Bottomsheet/BSOrderConfig';

import styles from './styles/index.css';

function Menu({route, navigation: {goBack, navigate}}) {
  const BSOrdeConfigRef = useRef();

  const [filterMenu, setFilterMenu] = useState([]);
  const [sourceMenu, setSourceMenu] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentFood, setCurrentFood] = useState({});
  const [orders, setOrders] = useState([]);

  //get all food in menu
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

  //search food
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
  const onAddNewFood = (note) => {
    const food = {...currentFood};
    food.note = note;
    BSOrdeConfigRef.current.snapTo(1);

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

  //Send the chosen food back to Detail Screen
  const ConfirmOrder = () => {
    goBack();
    route.params.handleMenuScreenBack(orders);
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
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.menuContainer}>
        <TextInput
          placeholder="Nhập Món Cần Tìm"
          onChangeText={(text) => search(text)}
          style={styles.searchInput}
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
            textStyle={{color:'white'}}
            onPress={() => ConfirmOrder()}
          />
        ) : null}
      </SafeAreaView>
      <BSOrderConfig
        ref={BSOrdeConfigRef}
        food={currentFood}
        onIncreaseFood={onIncreaseFood}
        onDecreaseFood={onDecreaseFood}
        onAddNewFood={onAddNewFood}
        isUpdate={false}
      />
    </View>
  );
}

export default Menu;
