import React from 'react'
import { GoogleSignin, GoogleSigninButton, statusCodes, isErrorWithCode, isSuccessResponse } from '@react-native-google-signin/google-signin'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

GoogleSignin.configure({
    iosClientId: "45390714949-5hadkcesd37cki74b6lv9p674rdiipj9.apps.googleusercontent.com"
});

function GoogleAuth() {

    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const response = await GoogleSignin.signIn();
          if (isSuccessResponse(response)) {
            console.log('Google sign in response:', response);
          } else {
            // sign in was cancelled by user
          }
        } catch (error) {
            console.log('Google sign in error:', error);
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
    <View style={styles.container}>
        <GoogleSigninButton style={styles.button} onPress={signIn}>

        </GoogleSigninButton>
    </View>
  )
}

export default GoogleAuth

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
