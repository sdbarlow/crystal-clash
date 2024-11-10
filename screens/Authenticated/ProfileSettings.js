import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../../app/context/AuthContext';

function ProfileSettings({ navigation }) {
    const { logout } = useAuth();

    const handleSignOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'Failed to sign out. Please try again.');
        }
    };
  return (
    <View style={{height: hp(100), width: wp(100), backgroundColor: 'black'}}>
        <View style={{height: 80, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row'}}>
            <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, zIndex: 30, marginLeft: '6%', height: 40, width: 40, backgroundColor: '#413F42', borderRadius: 100, justifyContent: 'center', alignItems: 'center'})}>
              <FontAwesomeIcon icon={faArrowLeft} size={22} color="white"/>
            </Pressable>
            <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '1%'}}>
                <Text style={{color: 'white', fontSize: 25, fontWeight: 500, marginHorizontal: 'auto'}}>Settings</Text>
            </View>
        </View>
        <View style={{height: 50, width: '100%', backgroundColor: '#413F42', marginTop: '15%', borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>Notification Settings</Text>
            <FontAwesomeIcon icon={faChevronRight} size={22} color="white"/>
        </View>
        <View style={{height: 50, width: '100%', backgroundColor: '#413F42', borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>Advanced Settings</Text>
            <FontAwesomeIcon icon={faChevronRight} size={22} color="white"/>
        </View>
        <Pressable onPress={() => handleSignOut()} style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, height: 50, width: '100%', backgroundColor: '#413F42', marginTop: '15%', borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%'})}>
            <Text style={{color: 'red', fontSize: 20, fontWeight: 500}}>Sign Out</Text>
        </Pressable>
    </View>
  )
}

export default ProfileSettings