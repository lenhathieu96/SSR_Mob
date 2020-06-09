import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../utils/fontSize';
import color from '../../../utils/Color';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: color.primary,
  },
  headerContainer: {
    height: 0.38 * windowHeight,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  //Action Bar=======================================================================================
  actionBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    height: 50,
  },
  actionBarTitle: {
    fontSize: 22,
    flex: 0.9,
    color: 'white',
    textAlign: 'center',
  },
  actionBarBtn: {
    flex: 0.1,
    marginLeft: 10,
  },
  //header=======================================================================================
  headerEmptyContainer: {
    flex: 0.9,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerDetailContainer: {
    flex: 0.9,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  desc: {
    color: 'white',
    fontSize: fontSize.larger,
  },
  moneyContainer: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  money: {
    fontWeight: 'bold',
    color: color.secondary,
    fontSize: fontSize.bigger,
    padding: 5,
  },
  progressContainer: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  progressDetailContainer: {
    flexDirection: 'column',
    flex: 0.9,
  },
  progressTitle: {
    flex: 0.8,
    fontSize: fontSize.huge,
    color: 'white',
  },
  progressDetail: {
    color: color.secondary,
    fontSize: fontSize.large,
    marginRight: 10,
  },
  // progressTitle: {
  //   fontSize: fontSize.huge,
  //   color: 'white',
  // },
  // progressDetail: {
  //   color: color.secondary,
  //   fontSize: fontSize.larger,
  //   marginRight: 10,
  // },

  //=============================================================================================
  billList: {
    flexGrow: 1,
  },
  emptyListContainer: {
    padding: 10,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyListTitle: {
    color: color.primary,
    fontSize: fontSize.huge,
  },
  //=============================================================================================
  itemBillContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemBillDesc: {
    fontSize: fontSize.larger,
    flex: 0.5,
    color: '#1445A6',
  },
  itemBillDesc__done: {
    fontSize: fontSize.larger,
    flex: 0.5,
    color: color.add,
  },
  itemBillQuantity: {
    fontSize: fontSize.larger,
    flex: 0.2,
  },
  itemBillPrice: {
    fontWeight: 'bold',
    fontSize: fontSize.larger,
    color: color.secondary,
    flex: 0.3,
  },
  itemBillNote: {
    fontStyle: 'italic',
    fontSize: fontSize.normal,
    marginTop: 10,
  },
  btnDelete: {
    alignItems: 'flex-end',
  },
  btncreateBill: {
    backgroundColor: color.primary,
    marginBottom: 10,
  },
  btnUpdateBill: {
    backgroundColor: color.secondary,
    flex: 0.4,
  },
  btnChangeTable: {
    backgroundColor: color.add,
    flex: 0.4,
  },
});
export default styles;
