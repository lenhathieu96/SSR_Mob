import React, {useState} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';

import ActionBar from './ActionBar';
import HeaderDetail from './Header';
import ItemBill from './Bill/ItemBill';
import EmptyList from './Bill/EmptyList';

import styles from './styles/index.css';

function Detail({route, navigation: {goBack, navigate}}) {
  const {tableIndex} = route.params;

  const [menu, setMenu] = useState([]);

  const handleGoBack = () => goBack();
  const onNavigate = () => {
    navigate('Menu', {handleMenuBack});
  };
  const handleMenuBack = (item) => {
    item.done = 0;
    item.quantity = 1;
    item.served = 0;
    item.totalPrice = item.price;
    let tempData = [...menu];
    tempData.push(item);
    setMenu(tempData);
    // console.log(tempData);
    console.log(menu);
  };

  const onIncrease = (itemID) => {
    console.log(itemID);
  };

  const onDecrease = (itemID) => {
    console.log(itemID);
  };

  const onDelete = (itemID) => {
    console.log(itemID);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <ActionBar index={tableIndex} handleGoBack={handleGoBack} />
        {/*<View>
           <Text
            style={{
              fontFamily: 'MavenPro-SemiBold',
              color: 'white',
              fontSize: 22,
            }}>
            Bàn Trống !
          </Text>
        </View> */}
        <HeaderDetail />
      </SafeAreaView>
      <View style={styles.bodyContainer}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={menu}
          renderItem={({item, separators}) => (
            <ItemBill
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onDelete={onDelete}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
            />
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => <EmptyList onNavigate={onNavigate} />}
          // ListFooterComponent={() => (
          //   <View>
          //     <Text>this is footer of flastlist</Text>
          //   </View>
          // )}
        />
      </View>
    </View>
  );
}

export default Detail;
