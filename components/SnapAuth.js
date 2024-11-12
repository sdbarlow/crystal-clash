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

  return (
    <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, height: hp(7), width: wp(80), backgroundColor: 'black', borderRadius: 5, justifyContent: 'center', overflow: 'hidden', alignItems: 'center', alignSelf: 'center', marginTop: hp(3)})}>
        <LinearGradient colors={['#2E3031', 'black']} style={{width: '100%', height: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '11%'}}>
            <FontAwesomeIcon icon={faSnapchat} size={30} color='white' /><Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>Continue with Snapchat</Text>
        </LinearGradient>
    </Pressable>
  );
};