import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Platform, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { useSignup } from '../api/queries/auth.queries';
import Storage from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { SignUpScreenNavigationProp } from '../utils/navigation';

const SignUpScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const signup = useSignup();
  const nameShakeAnim = useRef(new Animated.Value(0)).current;
  const phoneShakeAnim = useRef(new Animated.Value(0)).current;
  const passwordShakeAnim = useRef(new Animated.Value(0)).current;
  const checkboxShakeAnim = useRef(new Animated.Value(0)).current;

  const handleSignUp = () => {
    setIsSubmitted(true);
    if (!name || !phone || !password || !isChecked) {
      if (!name) shakeField(nameShakeAnim);
      if (!phone) shakeField(phoneShakeAnim);
      if (!password) shakeField(passwordShakeAnim);
      if (!isChecked) shakeField(checkboxShakeAnim);
      return;
    }

    signup.mutate(
      { name: name, phone: phone, password: password },
      {
        onSuccess: async (res) => {
          navigation.navigate('SignIn')
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
      source={require('../assets/images/signup.png')}
      style={styles.background}
      imageStyle={{
        position: 'absolute',
        top: undefined,
        left: undefined,
        width: 200,
        height: 150,
        resizeMode: 'cover',
        alignSelf: "flex-start"
      }}
    >
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />

        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Fill in the below form and add life to your car!</Text>

        <View>
          <Text style={styles.inputTitle}>Name</Text>
          <Animated.View
            style={[
              styles.inputContainer,
              { borderColor: isSubmitted && !name ? 'red' : '#E0E0E0' },,
              { transform: [{ translateX: phoneShakeAnim }] },
            ]}
          >           
            <Icon name="person-outline" size={20} color="#707070" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#707070"
              value={name}
              onChangeText={setName}
            />
          </Animated.View>
        </View>

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
              { borderColor: isSubmitted && !phone ? 'red' : '#E0E0E0' },,
              { transform: [{ translateX: phoneShakeAnim }] },
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
              <Icon
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#707070"
              style={styles.icon}
            />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.checkboxContainer}>
          <Animated.View
            style={{
              transform: [{ translateX: checkboxShakeAnim }],
            }}
          >
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              tintColors={{ true: '#A3CFFF', false: '#707070' }}
            />
          </Animated.View>
          <Text style={styles.checkboxText}>
            Agree with <Text style={styles.termsText}>Terms & Conditions</Text>
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text style={styles.signInLink} onPress={() => navigation.navigate('SignIn')}>Sign In</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsAndPolicyText}>
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
    width: 216,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxText: {
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  termsText: {
    color: '#0000007D',
    fontFamily: 'Poppins-Medium',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A3CFFF',
    borderRadius: 25,
    width: 285,
    height: 46,
  },
  signUpButtonText: {
    color: '#092A4D',
    fontSize: 18,
    fontFamily: 'Inter-Bold'
  },
  signInText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    marginVertical: 10,
  },
  signInLink: {
    color: '#000000',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Bold',
  },
  termsAndPolicyText: {
    textAlign: 'center',
    color: '#808080',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
  },
});

export default SignUpScreen;
