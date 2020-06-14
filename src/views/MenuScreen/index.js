import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import Text from '../../Components/Text';
import IconButton from '../../Components/IconButton';

import BottomSheetBody from './BSMenuBody';
import Item from './Item';
import {URL} from '../../Connect';

import * as fontSize from '../../utils/fontSize';
import styles from './styles/index.css';

function Menu({route, navigation: {goBack, navigate}}) {
  const bottomsheetRef = useRef();
  const height = 0.7 * Dimensions.get('window').height;

  const [filterMenu, setFilterMenu] = useState([]);
  const [sourceMenu, setSourceMenu] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentFood, setCurrentFood] = useState({});

  const API_URL = URL + '/food';

  const fetchData = async () => {
    setLoading(true);
    try {
      const menu = await AsyncStorage.getItem('menu');

      if (menu !== null) {
        setLoading(false);
        setSourceMenu(JSON.parse(menu));
        setFilterMenu(JSON.parse(menu));
      } else {
        axios.get(API_URL).then(async (res) => {
          if (res.status === 200) {
            setFilterMenu(res.data);
            setLoading(false);
            setSourceMenu(res.data);
            try {
              await AsyncStorage.setItem('menu', JSON.stringify(res.data));
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
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

  const selectItem = (itemID) => {
    const food = sourceMenu.find((item) => itemID === item._id);
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
    goBack();
    route.params.handleMenuBack(food);
  };

  useEffect(() => {
    fetchData();
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
                <Item data={item} selectItem={selectItem} />
              )}
              refreshing={isLoading}
              onRefresh={() => fetchData()}
            />
          )}
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
              />
            )}
            initialSnap={1}
            enabledInnerScrolling={false}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default Menu;
