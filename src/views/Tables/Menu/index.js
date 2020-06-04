import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlastList,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import Item from './Item';
import serverURL from '../../../Connect/ServerURL';
import styles from './index.css';

function Menu(props) {
  const URL = serverURL + 'food';
  const [menu, setMenu] = useState([]);
  const [sourceMenu, setSourceMenu] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    axios.get(URL).then((res) => {
      if (res.status === 200) {
        setMenu(res.data);
        setLoading(false);
        setSourceMenu(res.data);
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
    console.log(itemID);
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
      </View>
    </SafeAreaView>
  );
}

export default Menu;
