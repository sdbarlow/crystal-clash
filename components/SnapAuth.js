import { Pressable, Text, Alert, NativeModules, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSnapchat } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { LoginKit } from '@snapchat/snap-kit-react-native';
import { SNAP_CLIENT_ID } from '@env';

export default function SnapAuth() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const initializeSnapKit = async () => {
      try {
        await LoginKit.isUserLoggedIn();
      } catch (error) {
        console.error('SnapKit initialization error:', error);
      }
    };

    initializeSnapKit();
  }, []);

  const signIn = async () => {
    try {
      if (!LoginKit) {
        throw new Error('LoginKit not initialized');
      }
      await LoginKit.login();
      if (data) {
        Alert.alert('Success', 'Logged in with Snapchat!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login with Snapchat');
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      LoginKit.clearToken();
      setUserData(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
    <Pressable 
      onPress={signIn} 
      style={({ pressed }) => ({ 
        opacity: pressed ? 0.5 : 1, 
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
          Continue with Snapchat
        </Text>
      </LinearGradient>
    </Pressable>
    <Pressable 
      onPress={logout} 
      style={({ pressed }) => ({ 
        opacity: pressed ? 0.5 : 1, 
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
          Continue with Snapchat
        </Text>
      </LinearGradient>
    </Pressable>
    </>
  );
}