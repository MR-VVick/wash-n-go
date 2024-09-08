import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Storage from '../utils/storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../utils/navigation';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await Storage.get('user');
        if (userData) {
          const userObj = JSON.parse(userData);
          setUser(userObj.name);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await Storage.clear('user');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        })
      );
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.greetings}>Welcome {user}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  logoContainer: {
    position: 'absolute',
    top: '5%'
  },
  logo: {
    width: 175,
    height: 128,
  },
  greetings: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: 'black',
    textTransform: 'capitalize'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
    backgroundColor: '#A3CFFF',
    borderRadius: 25,
    width: 280,
    height: 46,
  },
  buttonText: {
    color: '#092A4D',
    fontSize: 18,
      fontFamily: 'Inter-Bold'
  },
});

export default HomeScreen;
