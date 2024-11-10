import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../app/context/AuthContext';

export default function AppleAuth({setIsLoading}) {
  const { login } = useAuth();

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Format the Apple credential data before sending
      const userData = {
        email: 'sethdbarlow@gmail.com',
        fullName: {
          givenName: 'Seth',
          familyName: 'Barlow'
        },
      };
    
      const response = await axios.post('http://127.0.0.1:5000/login', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.token) {
        await login(response.data.token);
      }

    } catch (error) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
        console.log('Sign-in was canceled');
      } else {
        // handle other errors
        console.error('Login error:', error.response?.data || error.message);
        Alert.alert('Error', 'Failed to login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={styles.button}
      onPress={handleAppleLogin}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: hp(7), 
    width: wp(80), 
    borderWidth: 2, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center', 
    marginTop: hp(3), 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: '15%'
  },
});