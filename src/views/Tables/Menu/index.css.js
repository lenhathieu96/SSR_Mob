import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  //menu style
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  //search bar
  input: {
    padding: 10,
    fontSize: 18,
    fontFamily: 'MavenPro-Regular',
    borderColor: 'rgba(0, 0, 1, 0.151)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuBody: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: 'MavenPro-Regular',
    fontSize: 18,
    marginTop: 10,
  },
  //=============================================================================================
  //menu item styles
  menuItemContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 1, 0.151)',
  },
  desc: {
    fontSize: 18,
    fontFamily: 'MavenPro-Regular',
  },
});
export default styles;
