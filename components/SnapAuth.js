import React, { useState, useEffect } from 'react';
import { Linking, Alert, Pressable, Text, Platform, DeviceEventEmitter, NativeEventEmitter, NativeModules } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSnapchat } from '@fortawesome/free-brands-svg-icons';
import { LoginKit } from '@snapchat/snap-kit-react-native';
import { LoginState } from '@snapchat/snap-kit-react-native';

// Verify LoginKit is loaded
console.log('LoginKit methods:', Object.keys(LoginKit));

export default function SnapAuth() {
  const [lastLoginState, setLastLoginState] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onLoginStateChange = (state) => {
      console.log('Login state changed:', state);
      setLastLoginState(state);
      checkLoginStatus();
      fetchUserData();
    };

    const EventEmitter = Platform.select({
      ios: new NativeEventEmitter(NativeModules.LoginKit),
      android: DeviceEventEmitter,
    });

    // Add event listeners
    EventEmitter?.addListener(LoginState.LOGIN_KIT_LOGIN_STARTED, () =>
      onLoginStateChange(LoginState.LOGIN_KIT_LOGIN_STARTED),
    );
    EventEmitter?.addListener(LoginState.LOGIN_KIT_LOGIN_SUCCEEDED, () =>
      onLoginStateChange(LoginState.LOGIN_KIT_LOGIN_SUCCEEDED),
    );
    EventEmitter?.addListener(LoginState.LOGIN_KIT_LOGIN_FAILED, () =>
      onLoginStateChange(LoginState.LOGIN_KIT_LOGIN_FAILED),
    );
    EventEmitter?.addListener(LoginState.LOGIN_KIT_LOGOUT, () =>
      onLoginStateChange(LoginState.LOGIN_KIT_LOGOUT),
    );

    // Initial check
    checkLoginStatus();

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loggedIn = await LoginKit.isUserLoggedIn();
      console.log('Is logged in:', loggedIn);
      setIsLoggedIn(loggedIn);
      setIsLoading(false);

      if (loggedIn) {
        await LoginKit.refreshAccessToken();
        await fetchUserData();
      }
    } catch (error) {
      console.error('Login status check error:', error);
      setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const query = '{me{bitmoji{avatar},displayName}}';
      const data = await LoginKit.fetchUserData(query, null);
      console.log('User data fetched:', data);
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signIn = async () => {
    try {
      setIsLoading(true);
      await LoginKit.clearToken();
      await LoginKit.login();
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to login with Snapchat');
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await LoginKit.clearToken();
      setUserData(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Pressable 
      onPress={isLoggedIn ? signOut : signIn}
      disabled={isLoading} 
      style={({ pressed }) => ({ 
        opacity: pressed || isLoading ? 0.5 : 1, 
        height: hp(7), 
        width: wp(80), 
        backgroundColor: 'black', 
        borderRadius: 5, 
        justifyContent: 'center', 
        overflow: 'hidden', 
        alignItems: 'center', 
        alignSelf: 'center', 
        marginTop: hp(3)
      })}
    >
      <LinearGradient 
        colors={['#2E3031', 'black']} 
        style={{
          width: '100%', 
          height: '100%', 
          justifyContent: 'center', 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          paddingHorizontal: '11%'
        }}
      >
        <FontAwesomeIcon icon={faSnapchat} size={30} color='white' />
        <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>
          {isLoading ? 'Loading...' : isLoggedIn ? 'Sign Out' : 'Continue with Snapchat'}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}