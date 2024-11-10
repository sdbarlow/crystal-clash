import * as AuthSession from 'expo-auth-session';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSnapchat } from '@fortawesome/free-brands-svg-icons';
import {SNAP_CLIENT_ID} from '@env';

const useSnapAuth = () => {
  const [authError, setAuthError] = useState(null);

  // Log redirect URI for debugging
  const REDIRECT_URI = AuthSession.makeRedirectUri({
    scheme: 'crystal-clash',
    preferLocalhost: true
  });
  console.log('🔍 Redirect URI:', REDIRECT_URI);
  console.log('🔑 Client ID:', SNAP_CLIENT_ID); // Check if it's defined

  const discovery = {
    authorizationEndpoint: 'https://accounts.snapchat.com/login/oauth2/authorize',
    tokenEndpoint: 'https://accounts.snapchat.com/login/oauth2/access_token'
  };

  // Log full auth configuration
  const authConfig = {
    clientId: SNAP_CLIENT_ID,
    scopes: [
      'https://auth.snapchat.com/oauth2/api/user.display_name',
      'https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar'
    ],
    redirectUri: REDIRECT_URI,
    responseType: 'code',
  };
  console.log('📝 Auth Configuration:', authConfig);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    authConfig,
    discovery
  );

  // Debug request object
  useEffect(() => {
    if (request) {
      console.log('✅ Request object created:', {
        url: request.url,
        state: request.state,
        scopes: request.scopes,
      });
    } else {
      console.log('❌ Request object is null');
    }
  }, [request]);

  // Debug response
  useEffect(() => {
    if (response) {
      console.log('📫 Auth Response:', {
        type: response.type,
        params: response.params,
        error: response.error,
        errorCode: response?.error?.code,
        errorDescription: response?.error?.description,
        url: response.url
      });

      if (response.type === 'error') {
        setAuthError(response.error);
        Alert.alert(
          'Auth Error',
          `Type: ${response.error}\nDetails: ${JSON.stringify(response.params)}`
        );
      }
    }
  }, [response]);

  // Wrapped promptAsync with error handling
  const handleAuth = async () => {
    try {
      console.log('🚀 Starting auth flow...');
      const result = await promptAsync();
      console.log('🏁 Auth result:', result);
      return result;
    } catch (error) {
      console.error('💥 Auth error:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      setAuthError(error);
      Alert.alert('Auth Error', error.message);
      return null;
    }
  };

  return {
    request,
    response,
    promptAsync: handleAuth,
    error: authError,
    REDIRECT_URI, // Expose for debugging
  };
};

// Usage in component
export default SnapAuth = () => {
  const { request, promptAsync, error, REDIRECT_URI } = useSnapAuth();

  // Log important info when component mounts
  useEffect(() => {
    console.log('🔧 Component mounted with:', {
      hasRequest: !!request,
      redirectUri: REDIRECT_URI,
      error: error
    });
  }, []);

  const handleLogin = async () => {
    console.log('👆 Login button pressed');
    const result = await promptAsync();
    console.log('🎯 Login result:', result);
  };

  if (error) {
    console.error('🚨 Auth error state:', error);
  }

  return (
    <Pressable onPress={handleLogin} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, height: hp(7), width: wp(80), backgroundColor: 'black', borderRadius: 5, justifyContent: 'center', overflow: 'hidden', alignItems: 'center', alignSelf: 'center', marginTop: hp(3)})}>
        <LinearGradient colors={['#2E3031', 'black']} style={{width: '100%', height: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '11%'}}>
            <FontAwesomeIcon icon={faSnapchat} size={30} color='white' /><Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>Continue with Snapchat</Text>
        </LinearGradient>
    </Pressable>
  );
};