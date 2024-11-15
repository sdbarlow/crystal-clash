import React from 'react'
import { GoogleSignin, GoogleSigninButton, statusCodes, isErrorWithCode, isSuccessResponse } from '@react-native-google-signin/google-signin'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '../app/context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

GoogleSignin.configure({
    iosClientId: "45390714949-5hadkcesd37cki74b6lv9p674rdiipj9.apps.googleusercontent.com",
    webClientId: "45390714949-o85gfooc0e9q6c0fnk28arkb1ggca988.apps.googleusercontent.com",
    offlineAccess: true
});

function GoogleAuth() {
  const navigation = useNavigation();
  const { login } = useAuth();

    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const credential = await GoogleSignin.signIn();
          if (isSuccessResponse(credential)) {
            console.log('Google sign in response:', credential);

            const userData = {
              identityToken: credential.data.idToken,
              email: credential.data.user.email,
              provider: 'google'
            };

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
          } else {
            // sign in was cancelled by user
          }
        } catch (error) {
            console.log('Google sign in error:', error.code, error.message);
          if (isErrorWithCode(error)) {
            switch (error.code) {
              case statusCodes.IN_PROGRESS:
                // operation (eg. sign in) already in progress
                break;
              case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                // Android only, play services not available or outdated
                break;
              default:
              // some other error happened
            }
          } else {
            // an error that's not related to google sign in occurred
          }
        }
    }      

  return (
    <Pressable onPress={signIn} style={styles.container}>
      <FontAwesomeIcon icon={faGoogle} size={30} color='#4384F7'/>
      <Text style={{fontSize: 20, fontWeight: 500}}>Sign in with Google</Text>
    </Pressable>
  )
}

export default GoogleAuth

const styles = StyleSheet.create({
    container: {
      height: hp(7), 
      width: wp(80), 
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: '13.5%',
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
