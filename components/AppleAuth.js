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

      console.log('credential:', credential);

      const userData = {
        identityToken: credential.identityToken,
        email: credential.email,
        fullName: credential.fullName
      };

      console.log('userData:', userData);
    
      const response = await axios.post('https://crystal-clash-backend.onrender.com/login', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.token) {
        await login(response.data.token);
      }

    } catch (error) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        console.log('Sign-in was canceled');
      } else {
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
    width: '100%',
    height: '100%',  // Fill container
  }
});