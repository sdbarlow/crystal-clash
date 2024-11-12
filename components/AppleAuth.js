import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../app/context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function AppleAuth({setIsLoading}) {
  const navigation = useNavigation();
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

      const userData = {
        identityToken: credential.identityToken,
        email: credential.email,
        fullName: credential.fullName
      };

      // Let the backend handle the user verification
      const response = await axios.post('http://127.0.0.1:5000/login', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.isNewUser) {
        // New user - navigate to username selection
        navigation.navigate('UsernameScreen', { 
          userData,
          temporaryToken: response.data.temporaryToken // You'll need this to complete the signup
        });
      } else {
        // Existing user
        if (response.data.token) {
          await login(response.data.token);
        }
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
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={handleAppleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(7), 
    width: wp(80), 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center', 
    marginTop: hp(3), 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  button: {
    width: '100%',
    height: '100%',
  },
});