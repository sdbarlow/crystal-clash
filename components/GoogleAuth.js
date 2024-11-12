import React from 'react'
import { GoogleSignin, GoogleSigninButton, statusCodes, isErrorWithCode, isSuccessResponse } from '@react-native-google-signin/google-signin'
import { Pressable, StyleSheet, Text } from 'react-native';

GoogleSignin.configure({
    iosClientId: "45390714949-5hadkcesd37cki74b6lv9p674rdiipj9.apps.googleusercontent.com"
});

function GoogleAuth() {

    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const response = await GoogleSignin.signIn();
          if (isSuccessResponse(response)) {
            setState({ userInfo: response.data });
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
    <GoogleSigninButton onPress={signIn}>

    </GoogleSigninButton>
  )
}

export default GoogleAuth
