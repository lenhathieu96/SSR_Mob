import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  FlastList,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BottomSheet from 'reanimated-bottom-sheet';
// import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import Text from '../../Components/Text';
import BottomSheetBody from './BottomSheetBody';
import Item from './Item';
import serverURL from '../../Connect/ServerURL';
import styles from './styles/index.css';

function Menu({route, navigation: {goBack, navigate}}) {
  const bottomsheetRef = useRef();
  const [menu, setMenu] = useState([]);
  const [sourceMenu, setSourceMenu] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentFood, setCurrentFood] = useState({});

  const URL = serverURL + 'food';
  const height = (3 * Dimensions.get('window').height) / 4;

  const fetchData = () => {
    setLoading(true);
    axios.get(URL).then(async (res) => {
      if (res.status === 200) {
        setMenu(res.data);
        setLoading(false);
        setSourceMenu(res.data);
        // try {
        //   await AsyncStorage.setItem('menu', res.data);
        // } catch (e) {
        //   console.log(e);
        // }
      }
    });
  };

  const search = (text) => {
    if (text !== '') {
      const newData = sourceMenu.filter((item) => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setMenu(newData);
    } else {
      setMenu(sourceMenu);
    }
  };

  const selectItem = (itemID) => {
    const food = sourceMenu.find((item) => itemID === item._id);
    food.done = 0;
    food.quantity = 1;
    food.served = 0;
    food.totalPrice = food.price;
    setCurrentFood(food);
    bottomsheetRef.current.snapTo(0);
    // goBack();
    // route.params.handleMenuBack(food);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
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
            data={menu}
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
          snapPoints={[height, 250, 0]}
          renderHeader={() => (
            <TouchableOpacity
              style={styles.bottomSheetHeader}
              onPress={() => bottomsheetRef.current.snapTo(2)}>
              <Icon name="times" size={28} />
            </TouchableOpacity>
          )}
          renderContent={() => <BottomSheetBody food={currentFood} />}
          initialSnap={1}
          enabledInnerScrolling={false}
        />
      </View>
    </SafeAreaView>
  );
}

export default Menu;
