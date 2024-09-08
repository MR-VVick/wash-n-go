import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SignInScreenNavigationProp } from '../utils/navigation';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useSignin } from '../api/queries/auth.queries';
import Storage from '../utils/storage';

const SignInScreen: React.FC = () => {
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const signin = useSignin();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const phoneShakeAnim = useRef(new Animated.Value(0)).current;
  const passwordShakeAnim = useRef(new Animated.Value(0)).current;

  const handleSignIn = () => {
    setIsSubmitted(true);
    if (!phone || !password) {
      if (!phone) shakeField(phoneShakeAnim);
      if (!password) shakeField(passwordShakeAnim);
      return;
    }

    signin.mutate(
      { phone: phone, password: password },
      {
        onSuccess: async (res) => {
          await Storage.save('user', JSON.stringify(res));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );
        },
      }
    );
  };

  const shakeField = (shakeAnim: Animated.Value) => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ImageBackground
      source={require('../assets/images/signin.png')}
      style={styles.background}
      imageStyle={{
        position: 'absolute',
        top: undefined,
        width: 200,
        height: 150,
        resizeMode: 'cover',
         alignSelf: "flex-end"
      }}
    >
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />

        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Hi! Welcome back, you have been missed</Text>

        <View>
          <Text style={styles.inputTitle}>Phone</Text>
          <Animated.View
            style={[
              styles.inputContainer,
              { borderColor: isSubmitted && !phone ? 'red' : '#E0E0E0' },,
              { transform: [{ translateX: phoneShakeAnim }] },
            ]}
          >
            <Icon name="call-outline" size={20} color="#707070" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="9876543210"
              placeholderTextColor="#707070"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setphone}
            />
          </Animated.View>
        </View>

        <View>
          <Text style={styles.inputTitle}>Password</Text>
          <Animated.View
            style={[
              styles.inputContainer,
              { borderColor: isSubmitted && !password ? 'red' : '#E0E0E0' },,
              { transform: [{ translateX: passwordShakeAnim }] },
            ]}
          >
            <Icon name="lock-closed-outline" size={20} color="#707070" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor="#707070"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Icon name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} size={20} color="#707070" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialIconsContainer}>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="logo-google" size={15} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="logo-apple" size={15} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.signUpText}>
            Don’t have an account?{' '}
            <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By login or sign up, you agree to our terms of use and privacy policy
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 175,
    height: 128,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputTitle: {
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#707070',
    marginTop: 5,
    marginBottom: 15,
    width: 143,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#808080',
    fontFamily: 'Inter-Italic'
  },
  forgotPassword: {
    textAlign: 'right',
    fontSize: 11,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  signInButton: {
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A3CFFF',
    borderRadius: 25,
    width: 285,
    height: 46,
  },
  signInButtonText: {
    color: '#092A4D',
    fontSize: 18,
    fontFamily: 'Inter-Bold'
  },
  orContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    width: 90,
    height: 1,
    backgroundColor: '#A3CFFF',
  },
  orText: {
    marginHorizontal: 10,
    color: '#707070',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  socialIcon: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#A3CFFF',
    borderRadius: 50,
    marginHorizontal: 10,
  },
  signUpText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    marginVertical: 10,
  },
  signUpLink: {
    color: '#000000',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Bold',
  },
  termsText: {
    textAlign: 'center',
    color: '#808080',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
  },
});

export default SignInScreen;
