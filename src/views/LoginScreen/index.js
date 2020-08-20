import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

import AuthApi from '../../Api/AuthApi';
import {AuthContext} from '../../Contexts/AuthContext';

import Loader from '../../Components/Loader';
import TextButton from '../../Components/TextButton';
import IconButton from '../../Components/IconButton';

import cover from '../../assets/images/cover.jpg';

import color from '../../Utils/Color';
import * as fontSize from '../../Utils/fontSize';
import styles from './Styles/index.css';

export default function LoginScreen() {
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const IMAGE_HEIGHT = 0.5 * SCREEN_HEIGHT;
  const IMAGE_HEIGHT_SMALL = 0.5 * IMAGE_HEIGHT;

  const [imageHeight, setImageHeight] = useState(
    new Animated.Value(IMAGE_HEIGHT),
  );
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [textError, setTextError] = useState('');

  const context = useContext(AuthContext);

  const keyboardWillShow = () => {
    setKeyboardShow(true);
    Animated.timing(imageHeight, {
      duration: 500,
      toValue: IMAGE_HEIGHT_SMALL,
      useNativeDriver: false,
    }).start();
  };

  const keyboardWillHide = () => {
    setKeyboardShow(false);
    Animated.timing(imageHeight, {
      duration: 500,
      toValue: IMAGE_HEIGHT,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    SplashScreen.hide();
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogin = async (userAccount) => {
    // console.log(userAccount)
    setTextError('');
    setLoading(true);
    try {
      const response = await AuthApi.login(userAccount);
      setLoading(false);
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      context.setLogin(true);
    } catch (error) {
      setLoading(false);
      console.log('Login Error: ', error);
      setTextError('Đăng Nhập Thất Bại Vui Lòng Thử Lại');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.Container} keyboardVerticalOffset={10} behavior>
      <ScrollView contentContainerStyle={styles.Container}>
        <SafeAreaView style={styles.LogoWrapper}>
          <Animated.Image source={cover} style={{height: imageHeight}} />
        </SafeAreaView>
        <Formik
          initialValues={{username: '', password: ''}}
          onSubmit={(values) => onLogin(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.formContainer}>
              <View
                style={{
                  flex: 0.8,
                  justifyContent: keyboardShow ? 'flex-start' : 'space-evenly',
                }}>
                <View
                  style={[
                    styles.inputWrapper,
                    {flex: keyboardShow ? 0.2 : 0.3},
                  ]}>
                  {/* Username Input */}
                  <TextInput
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    placeholder="Tên Đăng Nhập"
                    selectionColor={color.primary}
                    placeholderTextColor={color.primary}
                    value={values.username}
                    style={[styles.input]}
                  />
                </View>
                {/* Password Input */}
                <View
                  style={[
                    styles.inputWrapper,
                    {flex: keyboardShow ? 0.2 : 0.3},
                  ]}>
                  <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="Mật Khẩu"
                    selectionColor={color.primary}
                    placeholderTextColor={color.primary}
                    value={values.password}
                    secureTextEntry={showPassword}
                    style={[styles.input]}
                  />
                  <IconButton
                    iconName={showPassword ? 'eye' : 'eye-slash'}
                    iconColor="white"
                    iconSize={fontSize.large}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </View>
                {/* Error Text */}
                <View style={styles.errorWrapper}>
                  <Text style={styles.txtError}>{textError}</Text>
                </View>
                <TextButton
                  onPress={handleSubmit}
                  text="Đăng Nhập"
                  textStyle={styles.txtBtnLogin}
                  style={styles.btnLogin}
                />
              </View>
            </View>
          )}
        </Formik>
        {isLoading ? <Loader /> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
