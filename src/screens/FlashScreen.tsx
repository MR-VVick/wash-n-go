import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashScreenNavigationProp } from '../utils/navigation';
import Storage from '../utils/storage';

const FlashScreen: React.FC = () => {
    const navigation = useNavigation<FlashScreenNavigationProp>();
    const logoPosition = useRef(new Animated.Value(0)).current;
    const contentOpacity = useRef(new Animated.Value(0)).current;
    const flashImageOpacity = useRef(new Animated.Value(1)).current;
    const startImageOpacity = useRef(new Animated.Value(0)).current;
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      const checkUserData = async () => {
        try {
          const userData = await Storage.get('user');
          if (userData) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            );
          } else {
            startAnimations();
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          startAnimations();
        }
      };

    const startAnimations = () => {
      const delayTimeout = setTimeout(() => {
        Animated.timing(logoPosition, {
          toValue: -50,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          setShowContent(true);

          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();

          Animated.parallel([
            Animated.timing(flashImageOpacity, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(startImageOpacity, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]).start();
        });
      }, 1500);

      return () => clearTimeout(delayTimeout);
    };

      checkUserData();
  }, [logoPosition, contentOpacity, flashImageOpacity, startImageOpacity, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.backgroundImage, { opacity: flashImageOpacity }]}>
                <Image source={require('../assets/images/flash.png')} style={styles.backgroundFirst} />
            </Animated.View>
            <Animated.View style={[styles.backgroundImage, { opacity: startImageOpacity }]}>
                <Image source={require('../assets/images/start.png')} style={styles.backgroundSecond} />
            </Animated.View>
            <Animated.View style={[styles.logoContainer, { transform: [{ translateY: logoPosition }] }]}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            </Animated.View>

            {showContent && (
                <Animated.View style={[styles.contentContainer, { opacity: contentOpacity }]}>
                <Text style={styles.tagline}>
                    Sparkle & Shine Transform Your Drive with Every Wash!
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}>Let's Start</Text>
                </TouchableOpacity>
                <Text style={styles.signInText}>
                    Already have an account?{' '}
                    <Text style={styles.signInLink} onPress={() => navigation.navigate('SignIn')}>
                    Sign In
                    </Text>
                </Text>
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundFirst: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backgroundSecond: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0
  },
  logoContainer: {
    position: 'absolute',
    top: '34%',
  },
  logo: {
    width: 316,
    height: 232,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 18,
    width: 260,
    textAlign: 'center',
    marginVertical: 10,
    color: '#707070',
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A3CFFF',
    borderRadius: 25,
    marginTop: 20,
    width: 280,
    height: 46,
  },
  buttonText: {
    color: '#092A4D',
    fontSize: 18,
    fontFamily: 'Inter-Bold'
  },
  signInText: {
    marginTop: 20,
    fontSize: 10.5,
    color: '#707070',
    fontFamily: 'Poppins-Regular'
  },
  signInLink: {
    color: '#000000',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Bold',
  },
});

export default FlashScreen;
