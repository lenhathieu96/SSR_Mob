import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

import AuthApi from '../../Api/AuthApi';
import {AuthContext} from '../../Contexts/AuthContext';

import Loader from '../../Components/Modal/Loader';
import TextButton from '../../Components/TextButton';
import IconButton from '../../Components/IconButton';

import cover from '../../Assets/images/logo.png';

import color from '../../Utils/Color';
import * as fontSize from '../../Utils/fontSize';
import styles from './Styles/index.css';

export default function LoginScreen() {
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const IMAGE_HEIGHT = 0.3 * SCREEN_HEIGHT;
  const IMAGE_HEIGHT_SMALL = 0.5 * IMAGE_HEIGHT;

  const [imageHeight, setImageHeight] = useState(
    new Animated.Value(IMAGE_HEIGHT),
  );
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [textError, setTextError] = useState('');

  const context = useContext(AuthContext);

  const keyboardWillShow = () => {
    Animated.timing(imageHeight, {
      duration: 500,
      toValue: IMAGE_HEIGHT_SMALL,
      useNativeDriver: false,
    }).start();
  };

  const keyboardWillHide = () => {
    Animated.timing(imageHeight, {
      duration: 500,
      toValue: IMAGE_HEIGHT,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    SplashScreen.hide();
    Keyboard.addListener('keyboardDidShow', keyboardWillShow);
    Keyboard.addListener('keyboardDidHide', keyboardWillHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardWillShow);
      Keyboard.removeListener('keyboardDidHide', keyboardWillHide);
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.Container}>
        <View style={styles.LogoWrapper}>
          <Animated.Image
            source={cover}
            style={{height: imageHeight, width: imageHeight}}
          />
        </View>
        <Formik
          initialValues={{username: '', password: ''}}
          onSubmit={(values) => onLogin(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <KeyboardAvoidingView
              style={styles.formContainer}
              behavior="padding">
              <View style={[styles.inputWrapper]}>
                {/* Username Input */}
                <TextInput
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  keyboardType="default"
                  placeholder="Tên Đăng Nhập"
                  selectionColor={color.primary}
                  placeholderTextColor={color.primary}
                  value={values.username}
                  style={[styles.input]}
                />
              </View>
              {/* Password Input */}
              <View style={[styles.inputWrapper]}>
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
                  iconColor={color.primary}
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
            </KeyboardAvoidingView>
          )}
        </Formik>
        {isLoading ? <Loader /> : null}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
