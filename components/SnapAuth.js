import * as AuthSession from 'expo-auth-session';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSnapchat } from '@fortawesome/free-brands-svg-icons';
import {SNAP_CLIENT_ID} from '@env';


// Usage in component
export default SnapAuth = () => {
  // const [userInfo, setUserInfo] = useState(null);
  
  // Configure auth request
  const discovery = {
    authorizationEndpoint: 'https://accounts.snapchat.com/login/oauth2/authorize',
    tokenEndpoint: 'https://accounts.snapchat.com/login/oauth2/access_token',
  };

  const config = {
    clientId: SNAP_CLIENT_ID,
    redirectUri: 'crystalclash://snap-kit/oauth2',
    scopes: ['user.display_name', 'user.bitmoji.avatar']
  };

  const signIn = async () => {
    try {
      const authRequest = new AuthSession.AuthRequest({
        clientId: config.clientId,
        scopes: config.scopes,
        redirectUri: config.redirectUri,
      });

      const result = await authRequest.promptAsync(discovery);

      if (result.type === 'success') {
        // Exchange code for token
        const tokenResponse = await fetch(discovery.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            code: result.params.code,
            client_id: config.clientId,
            redirect_uri: config.redirectUri,
            grant_type: 'authorization_code',
          }),
        });

        const tokenData = await tokenResponse.json();

        // Get user profile
        const userResponse = await fetch('https://kit.snapchat.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        });

        const userData = await userResponse.json();
        console.log('Snapchat user data:', userData);
        // setUserInfo(userData);
        return userData;
      }
    } catch (error) {
      console.error('Snapchat auth error:', error);
      throw error;
    }
  };

  return (
    <Pressable onPress={signIn} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, height: hp(7), width: wp(80), backgroundColor: 'black', borderRadius: 5, justifyContent: 'center', overflow: 'hidden', alignItems: 'center', alignSelf: 'center', marginTop: hp(3)})}>
        <LinearGradient colors={['#2E3031', 'black']} style={{width: '100%', height: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '11%'}}>
            <FontAwesomeIcon icon={faSnapchat} size={30} color='white' /><Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>Continue with Snapchat</Text>
        </LinearGradient>
    </Pressable>
  );
};